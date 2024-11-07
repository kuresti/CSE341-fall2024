/* *************************************
 * Required assets
 * *************************************/
const { MongoClient } = require('mongodb');
require("dotenv").config()

let client

async function connection() {
    if (!client) {
        const uri = process.env.DATABASE_URL
        client = new MongoClient(uri, {
            
            ssl: process.env.NODE_ENV === "development" ? true: undefined,
        })

        try {
            await client.connect();
            console.log("Connected to MongoDB");

          await listDatabases(client)
        } catch (error) {
            console.error("MongoDB connect error:", error);
            throw error;
        }
    }
    return client.db("Cluster0");
}

async function listDatabases(client) {
    let databaseList = await client.db().admin().listDatabases();
    console.log("Databases: ");
    databaseList.databases.forEach(db => console.log(` - ${db.name}`));
}

connection().catch(console.error)

module.exports = { connection };

// async function connectToDB() {
//     const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true});

//     try {
//         await client.connect();
//         console.log("Connected successfully");
//         const db = client.db("Cluster0");
//         return db;
//     } catch (error) {
//         console.error("MongoDB connection error:", error);
//     }
// }


