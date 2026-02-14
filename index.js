// import express from 'express'   
// import cors from 'cors'
// import { MongoClient, ServerApiVersion } from 'mongodb'
// import authRoutes from "./routes/auth.routes.js";
// import 'dotenv/config'
// const app = express()
// const port = 3000

// // Middleware
// app.use(cors())
// app.use(express.json())
// app.use("/api/auth", authRoutes);
// // 


// const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.grroqbl.mongodb.net/ownMed`;

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
//     // await client.close();
//   }
// }
// run().catch(console.dir);

// //




// app.get('/', (req, res) => {
//   res.send('Hello this is the ownMed server!')
// })

// app.listen(port, () => {
//   console.log(`ownMed server running on port ${port}`)
// })

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import testRoutes from "./routes/test.routes.js";
import "dotenv/config";

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);

console.log("DB_USER:", "hspmawjjnqghojoi");
console.log("EMAIL_USER:", "zmahmud26@gmail.com");


// MongoDB URI
const dbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.grroqbl.mongodb.net/ownMed?retryWrites=true&w=majority`;

// Connect Mongoose (Mongoose 7+ doesn't need extra options)
mongoose
  .connect(dbUri)
  .then(() => console.log("Mongoose connected to MongoDB"))
  .catch((err) => console.error("Mongoose connection error:", err));

// Root route
app.get("/", (req, res) => {
  res.send("Hello, this is the ownMed server!");
});

// Start server
app.listen(port, () => {
  console.log(`ownMed server running on port ${port}`);
});
