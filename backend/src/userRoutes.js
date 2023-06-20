const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { getAllUsers, getUserById, createUser, getUserByEmail, getUserByName, 
    addUsersTopic, deleteCloudinaryImgById, addUsersRestoreLink, resetUsersPassword, getSessionByLink, clearSessions } 
= require('./database/users');
const { sendEmailWithTopic } = require('./email');
const { generateGoogleAuth, retrieveGoogleToken } = require('./oauth2');

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
    sendEmailWithTopic({
        receiver: req.body.email,
        subject: `Remindemy Registration`,
        text: `Thanks for checking out my project. Have a great day!;)`,
        // html: `<a href=${req.body.link}">link</a> `,
        nodemailerPassword: process.env.NODEMAILER_PASS,
    })

    if(await getUserByEmail(req.body.email) !== null) {
        res.status(409).send({ message: 'Current email is already in use' })
    } else {
        try {
            const hashedPwd = await bcrypt.hash(req.body.password, saltRounds)
            const userData = {...req.body, password: hashedPwd}
            const newUser = await createUser(userData);
            res.status(201).send({ status: 'OK', data: newUser })
        } catch (error) {
            console.log(error)
            res.status(500).send('Internal Server error Occured')
        }
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await getUserByEmail(req.body.email)

        if(user) {
            const cmp = await bcrypt.compare(req.body.password, user.password);
            if(cmp) {
                return res.json({
                    token: jwt.sign({user: user}, process.env.JWT_SECRET)
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
            message: `Congrats ${user.name}! You can now accesss your profile`,
            currentUser: await getUserByEmail(user.email)
        })
    } catch (error) {
        return res.status(401).json({ error: 'Not Authorized '})
    }
})

router.post('/addTopic', async (req, res) => {
    // sendEmailWithTopic({
    //     receiver: req.body.email,
    //     subject: `Remindemy Registration`,
    //     text: `Thanks for checking out my project. Have a great day!;)`,
    //     // html: `<a href=${req.body.link}">link</a> `,
    //     nodemailerPassword: process.env.NODEMAILER_PASS,
    //     date: req.body.date,
    // })

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

router.post('/sendRestoreEmail', async (req, res) => {
    const userEmail = await getUserByEmail(req.body.email)

    if(userEmail !== null) {
        let otp = Math.random().toString(5)
        const restoreLink = otp

        const addRestoreLink = await addUsersRestoreLink(restoreLink)

        sendEmailWithTopic({
            receiver: req.body.email,
            subject: `Reset password`,
            html: `You can restore password here: <a href="${`https://remindemy-react.vercel.app/restorePassword/${req.body.email}/${restoreLink}`}">Reset password</a> `,
            nodemailerPassword: process.env.NODEMAILER_PASS,
        })

        res.send({ status: 'OK' })
    } else {
        res.status(404).send({ status: 'FAILED', error: 'There is no account with that email.' })
    }
});

router.post('/checkRestoreLink', async (req, res) => {
    const checkSession = await getSessionByLink(req.body.restoreLink)

    if(checkSession) {
        res.status(200).send({ status: 'OK' })
    } else {
        res.status(404).send({ status: 'TIMEOUT', error: 'The link was expired or did not exist' })
    }
});

router.post('/resetPassword', async (req, res) => {
    const hashedPwd = await bcrypt.hash(req.body.password, saltRounds)
    try {
        const addTopic = await resetUsersPassword(req.body.email, hashedPwd)
        const clearAllSessions = await clearSessions()

        res.status(201).send({ status: 'OK', data: addTopic })
    } catch (error) {
        res.status(500).send('Internal Server error Occured')
        console.log(error)
    }
})

router.post('/askGoogleAuthPerm', async (req, res) => {
    try {
        const askPerm = generateGoogleAuth({
            clientID: process.env.CLIENT_ID, clientSECRET: process.env.CLIENT_SECRET, redirectURL: process.env.REDIRECT_URL
        })
        res.status(200).send({ status: 'OK', authLink: askPerm })
    } catch(err) {
        res.status(500).send('Internal Server error Occured')
        console.log(err)
    }
});

router.get('/retrieveGoogleAuthToken/:code', async (req, res) => {
    try {
        const code = req.params.code
        const token = await retrieveGoogleToken(code)
        console.log(token)

        res.status(200).send({ status: 'OK', token: token })
    } catch(err) {
        res.status(500).send('Internal Server error Occured')
        console.log(err)
    }
});

module.exports = router;

// *** source: https://holycoders.com/node-js-bcrypt-authentication/ ***