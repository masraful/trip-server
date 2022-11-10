const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


require('dotenv').config();




const app = express()
const port = process.env.PORT || 5000;


// middle wares

app.use(cors())
app.use(express.json())


// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.juycps9.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const serviceCollection = client.db('tripdb').collection('services');
        const addNewService = client.db('tripdb').collection('addNewService');
        const reviewAdd = client.db('tripdb').collection('addReview');
        const allreview = client.db('tripdb').collection('allreview')

        app.get('/services', async (req, res) => {
            const query = {}
            const cursur = serviceCollection.find(query)
            const services = await cursur.limit(3).toArray()
            res.send(services)
        })
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const service = await serviceCollection.findOne(query)
            res.send(service)

        })

        app.get('/items', async (req, res) => {
            const query = {}
            const cursur = serviceCollection.find(query)
            const services = await cursur.toArray()
            res.send(services)
        })
        app.get('/items/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const service = await serviceCollection.findOne(query)
            res.send(service)

        })


        app.post('/newservice', async (req, res) => {
            const service = req.body;
            const result = await addNewService.insertOne(service);
            res.send(result)
        })

        app.get('/newservice', async (req, res) => {
            const query = {}
            const cursur = addNewService.find(query)
            const result = await cursur.toArray();
            res.send(result)
        })
        app.post('/review', async (req, res) => {
            const query = req.body;
            const result = await reviewAdd.insertOne(query);
            res.send(result)
        })
        app.get('/review', async (req, res) => {
            const query = {}
            const cursur = reviewAdd.find(query)
            const result = await cursur.toArray();
            res.send(result)
        })
        app.post('/allreview', async (req, res) => {
            const query = req.body;
            const result = await allreview.insertOne(query);
            res.send(result)
        })
        app.get('/allreview', async (req, res) => {
            const query = {}
            const cursur = allreview.find(query)
            const result = await cursur.toArray();
            res.send(result)
        })
    }
    finally {

    }
}
run().catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('Take a Trip server is Running')
})

app.listen(port, () => {
    console.log(`Take A Trip Running on ${port}`)
})
