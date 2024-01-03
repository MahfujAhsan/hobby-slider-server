const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

// middlewares
app.use(cors())
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mediaplayer.xoearkt.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const urlCollection = client.db("hobby-slider").collection("site-url");

        app.get("/site-url", async (req, res) => {
            const query = {};
            const data = await urlCollection.find(query).toArray();
            res.send(data);
        })

        app.post("/site-url", async (req, res) => {
            const url = req.body;
            const result = await urlCollection.insertOne(url);
            res.send(result);
        })
    } finally {
        
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Slider Server!')
});

app.listen(port, () => {
    console.log(`Server Running on port ${port}`);
});