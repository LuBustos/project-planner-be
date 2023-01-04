const express = require("express");
const router = require("./server/routes");
const app = express();
const cors = require("cors");

const dotenv = require("dotenv")
dotenv.config()

    
const corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// middleware to read body, parse it and place results in req.body
app.use(express.json());             // for application/json
app.use(express.urlencoded());       // for application/x-www-form-urlencoded

//#### ROOT ####//
app.get("/", (req, res) => {
  res.json({ message: "Hello Project planner!" });
});

app.use("/api", router);

module.exports = app;
