const { ObjectId } = require('mongodb')
const { users, log_events } = require('./db')

let cloudinary = require('cloudinary').v2;

const getAllUsers = async () => {
    return await users.find().toArray();
}

const getUserById = async (id) => {
    return await users.findOne({ _id: ObjectId(id) });
}

const createUser = async (user) => {
    const result = await users.insertOne(user)
    return { ...user, _id: result.insertedId }
}

const getUserByEmail = async (mail) => {
    return await users.findOne({email: mail})
}

const getUserByName = async (username) => {
    return await users.findOne({name: username})
}

const deleteCloudinaryImgById = async (data) => {
    cloudinary.config({ 
        cloud_name: data.cloud_name, 
        api_key: data.api_key, 
        api_secret: data.api_secret,
    });

    cloudinary.uploader.destroy(data.id, function(result) { console.log('photo was deleted') });
}

const addUsersTopic = async (data) => {
    const filter = {'_id': new ObjectId(`${data.id}`)}
    const updateDocument = {
        $push: {
            "topics": {topicId: data.topicId, text: data.text, link: data.link, imageURLs: [...data.imageURLs], date: data.date}
        }
    }
    return await users.updateOne(filter, updateDocument)
}

const addUsersRestoreLink = async (restoreLink) => {
    return await log_events.insertOne( {
        "createdAt": new Date(),
        "logEvent": 2,
        "restoreLink": restoreLink
     } )
}

const getSessionByLink = async (link) => {
    return await log_events.findOne({"restoreLink": link})
}

const clearSessions = async () => {
    return await log_events.deleteMany({})
}

const resetUsersPassword = async (email, hashedPwd) => {
    const filter = { 'email': email }
    const updateDocument = {
        $set: {
            "password": hashedPwd
        }
    }
    return await users.updateOne(filter, updateDocument)
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    getUserByEmail,
    getUserByName,
    addUsersTopic,
    deleteCloudinaryImgById,
    addUsersRestoreLink,
    getSessionByLink,
    clearSessions,
    resetUsersPassword
}