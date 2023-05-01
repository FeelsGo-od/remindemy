const { ObjectId } = require('mongodb')
const db = require('./db')

let cloudinary = require('cloudinary').v2;

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
        $push: {
            "topics": {topicId: data.topicId, text: data.text, link: data.link, imagesUrls: {...data.imagesUrls}, date: data.date}
        }
    }
    return await db.users.updateOne(filter, updateDocument)
}

const deleteCloudinaryImgById = async (data) => {
    cloudinary.config({ 
        cloud_name: data.cloud_name, 
        api_key: data.api_key, 
        api_secret: data.api_secret,
    });

    cloudinary.uploader.destroy(data.id, function(result) { console.log('photo was deleted') });
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    getUserByEmail,
    getUserByName,
    addUsersTopic,
    deleteCloudinaryImgById
}