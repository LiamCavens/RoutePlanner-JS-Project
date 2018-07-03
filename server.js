const express = require("express");
const app = express();
const parser = require("body-parser");
const ObjectId = require('mongodb').ObjectId

var cors = require('cors')


app.options('*', cors())
app.use(cors())

const port = 3001;

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

const MongoClient = require("mongodb").MongoClient;

MongoClient.connect(
  "mongodb://localhost:27017",
  (err, client) => {
    if (err) next(err);
    const db = client.db("routesDB");
    console.log("Connected to db...Yaldi!!!");

    app.get("/api/routes", (req, res, next) => {
      const routesCollection = db.collection("routes");
      routesCollection.find().toArray((err, routes) => {
        if (err) next(err);
        res.json(routes);
      });
    });

    app.post("/api/routes", (req, res, next) => {
      const routesCollection = db.collection("routes");
      const newRoute = req.body;
      routesCollection.insert(newRoute, (err, result) => {
        if (err) next(err);
        res.status(201);
        res.json(result.ops[0]);
      });
    });

    app.get("/api/users", (req, res, next) => {
      const routesCollection = db.collection("users");
      routesCollection.find().toArray((err, users) => {
        if (err) next(err);
        res.json(users);
      });
    });

      app.post("/api/users", (req, res, next) => {
      const userCollection = db.collection("users");
      const newUser = req.body;
      userCollection.insert(newUser, (err, result) => {
      if (err) next(err);
      res.status(201);
      res.json(result.ops[0]);
      });
    });



    app.put("/api/users", function(req, res){
        const userCollection = db.collection('users')
        const objectId = ObjectId(req.body._id);
        userCollection.update({_id: objectId},{name: req.body.name,routes:req.body.routes},  function(err, result){
        if(err) console.log("error" + err);
        res.status(201);
        res.json(result);

        });
      })





    app.listen(port, () => {
      console.log("App listening on port", port);
    });
  }
);
