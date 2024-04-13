
//const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
// Needed to access process.env
require('dotenv').config();

const uri = process.env.URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

})
.then(() => console.log('Connected to mongodb'))
.catch((err) => console.log(err));

const Schema = mongoose.Schema;

// sets a schema for the 'login' collection
const loginSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// creates a model for the 'login' collection 
const Login = mongoose.model('login', loginSchema);

// exports all the models in an object to be used in the controller
module.exports = {
  Login,
};

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
