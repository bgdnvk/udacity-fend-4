var path = require("path");

const express = require("express");
const app = express();
//dotenv
require("dotenv").config();

const cors = require("cors");
const bodyParser = require("body-parser");
//aylien sdk
const ailyenAPI = require("aylien_textapi");

const PORT = 8000;

const textProcessingAPI = new ailyenAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});





app.use(express.static("dist"));
app.use(cors());
app.use(bodyParser.json());

//the home is always @ dist folder
//do not start without a dist folder as it's said in the readme
app.get("/", function(req, res) {
  res.sendFile("dist/index.html");
});

app.listen(PORT, function() {
  console.log(`/analyzeSentiment listening on port ${PORT}`);
});

app.post("/analyzeSentiment", function(req, resp) {
  textProcessingAPI.sentiment(
    {
      url: req.body.url
    },
    function(err, res) {
      console.log(res);
      if (!err) resp.send(res);
      else
        resp.send({
          error: "/analyzeSentiment failed :("
        });
    }
  );
});
