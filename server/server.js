const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 4997;

// middleware
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(404).json({ message: "hello world" });
});

// 404
app.get("*", (req, res) => {
  res.status(404).json({ message: "404" });
});

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.pug2uxj.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

app.listen(port, () => console.log(`Server started on port ${port}`));
