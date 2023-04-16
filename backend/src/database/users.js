const { ObjectId } = require('mongodb')
const db = require('./db')

const getAllUsers = async () => {
    return await db.users.find().toArray();
}

const getUserById = async (id) => {
    return await db.users.findOne({ _id: ObjectId(id) });
}

const createUser = async (user) => {
    const result = await db.users.insertOne(user)
    return { ...user, _id: result.insertedId }
}

const getUserByEmail = async (mail) => {
    return await db.users.findOne({email: mail})
}

const getUserByName = async (username) => {
    return await db.users.findOne({name: username})
}

const addUsersTopic = async (data) => {
    const filter = {'_id': new ObjectId(`${data.id}`)}
    const updateDocument = {
        $set: {
            topics: {text: data.text, link: data.link}
        }
    }
    return await db.users.updateOne(filter, updateDocument)
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    getUserByEmail,
    getUserByName,
    addUsersTopic,
}