const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { getAllUsers, getUserById, createUser, getUserByEmail } = require('./database/users')

const saltRounds = 10;

router.get('/', async (req, res) => {
    const users = await getAllUsers()
    res.send({ status: 'OK', data: users })
});

router.get('/user/:userId', async (req, res) => {
    const user = await getUserById(req.params.productId)

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

router.get('/profile', (req, res) => {
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
            message: `Congrats ${user}! You can now accesss your profile`
        })
    } catch (error) {
        return res.status(401).json({ error: 'Not Authorized '})
    }
})

module.exports = router;

// *** source: https://holycoders.com/node-js-bcrypt-authentication/ ***