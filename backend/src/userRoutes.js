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

console.log(process.env.JWT_SECRET);

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
                res.send("Wrong username or password.")
            }
        } else {
            res.send("Wrong username or password.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error Occured");
    }
})

router.get('/secure-resource', (req, res) => {
    return res.status(401).json({ message: 'You need to be logged in to access this resource'})
})

module.exports = router;

// *** source: https://holycoders.com/node-js-bcrypt-authentication/ ***