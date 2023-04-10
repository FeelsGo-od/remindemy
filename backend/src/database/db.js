const { MongoClient } = require("mongodb");

// Replace the following with values for your environment.
const username = encodeURIComponent('Admin')
const password = encodeURIComponent('LoraGaf998')
const clusterUrl = 'remindemycluster.zwcs7hc.mongodb.net'

// Replace the uri string with your connection string.
const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

async function run() {
    const database = client.db('remindemy');
    const users = database.collection('users');

    module.exports = {
      users,
    }
  }
run().catch(console.dir);