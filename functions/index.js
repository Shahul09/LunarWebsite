const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51Q4fOp2KUu8HzieKbWWbaz6l3B4j6jZ"+
  "cp2OEgI7TcI43NA4LBRU52LvbbsPfc0NEpsavDaYb3OA7Etqx7WL"+
  "4sFBJ00rMg8o8vR");

// api

// api config
const app = express();

// middleware
app.use(cors({origin: true}));
app.use(express.json());

// api routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Received!!! for this amount>>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });
  // ok-created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});


// listner command
exports.api = functions.https.onRequest(app);

// example api
// http://127.0.0.1:5001/lunar-tech-b2800/us-central1/api

