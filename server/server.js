const mongodb = require("mongodb");
const express = require("express");

const app = express();

app.get("/", (request, response) => {
  const url = "mongodb://localhost:27017";
  const MongoClient = new mongodb.MongoClient(url);

  MongoClient.connect()
    .then(() => {
      console.log("connected to mongodb"); // så fort du upprättar/startar Docker Imgen får du svaret "connected to mongodb".

      let dataBase = MongoClient.db("testDB");
      let collection = dataBase.collection("test");

      // lägga in data i databasen

      // och hämta ut data från databasen.
      return collection
        .find({ name: "Test product" })
        .toArray()
        .then((results) => {
          console.log("Found: ", results);
          response.json(results);
        });
    })
    .finally(() => {
      MongoClient.close();
    });
});

app.listen(3000);

/*

  */
