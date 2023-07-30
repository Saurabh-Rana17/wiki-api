const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { log } = require("console");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");
  const articleSchema = new mongoose.Schema({
    title: String,
    data: String,
  });
  let article = new mongoose.model("article", articleSchema);

  app
    .route("/articles")
    .get(async function (req, res) {
      let newData = await article.find();
      res.send(newData);
    })
    .post(async function (req, res) {
      const newArticle = article.create({
        tile: req.body.title,
        data: req.body.data,
      });
      res.send("added successfully");
    })
    .delete(async function (req, res) {
      await article.deleteMany();
      res.send("deleted successfully");
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
