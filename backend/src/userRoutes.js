const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { getAllUsers, getUserById, createUser, getUserByEmail, getUserByName, 
    addUsersTopic, deleteCloudinaryImgById } 
= require('./database/users');
const { sendEmailWithTopic } = require('./email');

const saltRounds = 10;

router.get('/', async (req, res) => {
    const users = await getAllUsers()
    res.send({ status: 'OK', data: users })
});

router.get('/user/:userId', async (req, res) => {
    const user = await getUserById(req.params.userId)

    if(!user) {
        res.status(404).send({ status: 'FAILED', error: 'User not found' })
        return;
    }

    res.send({ status: 'OK', data: user });
});

router.post('/createUser', async (req, res) => {
    try {
        const hashedPwd = await bcrypt.hash(req.body.password, saltRounds)
        const userData = {...req.body, password: hashedPwd}
        const newUser = await createUser(userData);
        res.status(201).send({ status: 'OK', data: newUser })
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server error Occured')
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await getUserByEmail(req.body.email)

        if(user) {
            const cmp = await bcrypt.compare(req.body.password, user.password);
            if(cmp) {
                return res.json({
                    token: jwt.sign({user: user.name}, process.env.JWT_SECRET)
                })
            } else {
                res.send({message: "Wrong email or password."})
            }
        } else {
            res.send({message: "Wrong email or password."})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error Occured");
    }
})

router.get('/profile', async (req, res) => {
    if(!req.headers.authorization) {
        return res.status(401).json({ error: "Not Authorized" });
    }

    // Bearer <token>>
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1]

    try {
        // Verify the token is valid
        const { user } = jwt.verify(token, process.env.JWT_SECRET)
        return res.status(200).json({
            message: `Congrats ${user}! You can now accesss your profile`,
            currentUser: await getUserByName(user)
        })
    } catch (error) {
        return res.status(401).json({ error: 'Not Authorized '})
    }
})

router.post('/addTopic', async (req, res) => {
    sendEmailWithTopic({
        receiver: req.body.email,
        subject: `Repeat that topic TODAY, and you will remember it: "${req.body.name}"`,
        text: req.body.text,
        // html: `<a href=${req.body.link}">link</a> `,
        nodemailerPassword: process.env.NODEMAILER_PASS,
    })
    
    try {
        const addTopic = await addUsersTopic(req.body)
        res.status(201).send({ status: 'OK', data: addTopic })
    } catch (error) {
        res.status(500).send('Internal Server error Occured')
        console.log(error)
    }
})

router.post('/topics/deleteImgById', async (req, res) => {
    try {
        const deleteImg = await deleteCloudinaryImgById({
            id: req.body.id, 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        })
        res.status(200).send({ status: 'OK', data: deleteImg })
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;

// *** source: https://holycoders.com/node-js-bcrypt-authentication/ ***