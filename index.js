const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// mongodb user info
// a-11-user
// BM7XTIWKlLwZvyix

const uri = "mongodb+srv://a-11-user:BM7XTIWKlLwZvyix@cluster0.gk5zoez.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        const addService = client.db('addservices').collection('services');
        const user = {name: "test", email: "testrafi@gmail.com"};
        const result = await  addService.insertOne(user);
        console.log(result);

    }
    catch{

    }
}

run().catch(err => console.log(err));


// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
app.get('/', (req,res)=> {
    res.send("the server is runing on 5000 port")
});











app.listen(port, ()=> {
    console.log(`server is runing on ${port}`);
})