const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");
  const articleSchema = new mongoose.Schema({
    title: String,
    data: String,
  });
  let article = new mongoose.model("article", articleSchema);
  app.get("/articles", async function (req, res) {
    let newData = await article.find();
    res.send(newData);
  });
}

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.send("home page");
});

app.listen("3000", function () {
  console.log("connected");
});
