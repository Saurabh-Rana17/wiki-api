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
  // tartgetting all articles -----------------------------------------------
  app
    .route("/articles")
    .get(async function (req, res) {
      let newData = await article.find();
      res.send(newData);
    })
    .post(async function (req, res) {
      const newArticle = article.create({
        title: req.body.title,
        data: req.body.data,
      });
      res.send("added successfully");
    })
    .delete(async function (req, res) {
      await article.deleteMany();
      res.send("deleted successfully");
    });
  // tartgetting a specific article-----------------------------------------------------------
  app
    .route("/articles/:articleTitle")
    .get(async function (req, res) {
      let recvedArticle = await article.findOne({
        title: req.params.articleTitle,
      });
      res.send(recvedArticle);
    })
    .put(async function (req, res) {
      await article.updateOne(
        {
          title: req.params.articleTitle,
        },
        {
          //   title: req.body.title,
          data: req.body.data,
        }
      );
      res.send("changed value");
    })
    .patch(async function (req, res) {
      await article.updateOne(
        {
          title: req.params.articleTitle,
        },
        {
          $set: req.body,
        }
      );
      res.send("successfully patched");
    })
    .delete(async function (req, res) {
      await article.deleteOne({
        title: req.params.articleTitle,
      });
      res.send("deleted");
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
