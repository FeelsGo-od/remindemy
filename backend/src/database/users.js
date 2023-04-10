const { ObjectId } = require('mongodb')
const db = require('./db')

const getAllUsers = async () => {
    return await db.users.find().toArray();
}

const getUserById = async (id) => {
    return await db.users.findOne({ _id: new ObjectId(id) });
}

const createUser = async (user) => {
    const result = await db.users.insertOne(user)
    return { ...user, _id: result.insertedId }
}

const getUserByEmail = async (email) => {
    return await db.users.findOne({email: email})
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    getUserByEmail,
}