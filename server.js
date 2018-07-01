const express = require("express");
const app = express();
const parser = require("body-parser");

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

    app.get("/api/users", (req, res, next) => {
      const routesCollection = db.collection("users");
      routesCollection.find().toArray((err, users) => {
        if (err) next(err);
        res.json(users);
      });
    });

    app.post("/api/routes", (req, res, next) => {
      const routesCollection = db.collection("routes");
      console.log(req.body);
      const newRoute = req.body;
      routesCollection.insert(newRoute, (err, result) => {
        if (err) next(err);
        res.status(201);
        res.json(result.ops[0]);
      });
    });

    app.listen(port, () => {
      console.log("App listening on port", port);
    });
  }
);
