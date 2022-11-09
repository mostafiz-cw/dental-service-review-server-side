const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// mongodb user info
// a-11-user
// BM7XTIWKlLwZvyix

const uri =
  "mongodb+srv://a-11-user:BM7XTIWKlLwZvyix@cluster0.gk5zoez.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const addService = client.db("addservices").collection("services");
    const user = { name: "test", email: "testrafi@gmail.com" };
    // const result = await addService.insertOne(user);
    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = addService.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });
  } catch {}
}

run().catch((err) => console.log(err));

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// app.get("/", (req, res) => {
//   res.send("the server is runing on 5000 port");
// });

const services = [
  {
    id: 4,
    img_url:
      "https://www.soothing.dental/wp-content/uploads/2022/06/dentalExam-1024x719-1.png",
    service_title: "Dental Exam",
    description:
      "You need a regular dental exam to find little problems before they become big. More importantly, your dental exam must be thorough and conducted by an experienced",
      price: 400
  }
];

app.get("/", (req, res) => {
  res.send(services);
});

app.listen(port, () => {
  console.log(`server is runing on ${port}`);
});
