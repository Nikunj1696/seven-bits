var express = require("express");
var bodyParser = require("body-parser");
const mainHandler = require("./handlers/errorHandlers");
var app = express();
const dotenv = require("dotenv").config();
const connectDB = require("./db/connect");
var cors = require("cors");
const Web3 = require('web3');

const port = dotenv.parsed.PORT || 5000;

try {
  // Establish a database connection for node's process
  connectDB();
  console.log("MongoDB Connected...");
} catch (error) {
  console.log("DB error", error);
}

// It shows the real origin IP in the heroku or Cloudwatch logs
app.enable("trust proxy");

// Enable Cross Origin Resource Sharing to all origins by default
app.use(
  cors({
    origin: "*",
  })
);

const web3 = new Web3('ws://localhost:8546');


app.get("/", function (req, res) {
  res.send("Hello Seven Bits 🙋🏻‍♂️!");
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

require("./routes/auth")(app);
require("./routes/user")(app);
require("./routes/product")(app);

app.use(mainHandler.celebrateErrors);
app.use(mainHandler.notFound);

app.listen(port, () => {
  console.log(`The web server has started on port ${port}`);
});
