const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;

  // sub-services posts 
  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  // sub-services comments
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message);
  });
 // sub-services query
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});