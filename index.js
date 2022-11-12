const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    const addReview = client.db("reviewDb").collection("review");
    const user = { name: "test", email: "testrafi@gmail.com" };
    // const result = await addService.insertOne(user);

    // get home page service
    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = addService.find(query);
      const services = await cursor.limit(3).toArray();
      res.send(services);
    });

    // get all service to service route
    app.get("/service", async (req, res) => {
      const query = {};
      const cursor = addService.find(query);
      const allservices = await cursor.toArray();
      res.send(allservices);
    });

    // get specific service and specific serice review list
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const serviceDetails = await addService.findOne(query);

      const queryOne = { userId: id };
      const cursor = addReview.find(queryOne);
      const allReview = await cursor.toArray();
      const allarray = [serviceDetails, allReview];
      res.send(allarray);
      console.log(id);
    });

    // add service
    app.post("/addservice", async (req, res) => {
      const service = req.body;
      const result = await addService.insertOne(service);
      res.send(result);
    });

    // my review get
    app.get("/myreview", async (req, res) => {
      console.log(req.query);
      let query = {};
      if (req.query.email) {
        query = {
          email: req.query.email,
        };
      }
      const cursor = addReview.find(query);
      const allReview = await cursor.toArray();
      res.send(allReview);
    });

    // my review delete
    app.delete("/myreview/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await addReview.deleteOne(query);
      res.send(result);
    });

    // my review add
    app.post("/reviews", async (req, res) => {
      const review = req.body;
      const result = await addReview.insertOne(review);
      res.send(result);
    });
  } catch {}
}

run().catch((err) => console.log(err));

// const services = [
//   {
//     id: 4,
//     img_url:
//       "https://www.soothing.dental/wp-content/uploads/2022/06/dentalExam-1024x719-1.png",
//     service_title: "Dental Exam",
//     description:
//       "You need a regular dental exam to find little problems before they become big. More importantly, your dental exam must be thorough and conducted by an experienced",
//     price: 400,
//   },
// ];

app.get("/", (req, res) => {
  res.send("Server is running correctly");
});

app.listen(port, () => {
  console.log(`server is runing on ${port}`);
});
