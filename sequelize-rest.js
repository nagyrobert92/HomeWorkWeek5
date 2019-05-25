const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "postgres://postgres:secret@localhost:5432/postgres",
  { define: { timestamps: false } }
);
app.use(bodyParser.json());

const Movie = sequelize.define(
  "movies",
  {
    title: Sequelize.TEXT,
    yearOfRelease: Sequelize.INTEGER,
    synopsis: Sequelize.TEXT
  },
  {
    tableName: "movies"
  }
);
Movie.sync();
app.get("/movies", (req, res, next) => {
  Movie.findAll()
    .then(movie => {
      res.json({ movie });
    })
    .catch(err => {
      res.status(500).json({
        message: "Something went wrong",
        error: err
      });
    });
});
app.get("/movies/:id", (req, res, next) => {
  const id = req.params.id;
  Movie.findByPk(id)
    .then(movie => res.json({ movie }))
    .catch(err => {
      res.status(500).json({
        message: "Something went wrong",
        error: err
      });
    });
});
app.post("/movies", function(req, res) {
  Movie.create(req.body)
    .then(movie => res.status(201).json(movie))
    .catch(err => {
      res.status(500).json({
        message: "Something went wrong",
        error: err
      });
    });
});
app.put("/movies/:id", (req, res) => {
  const id = req.params.id;
  Movie.findByPk(id)
    .then(movie =>
      movie.update({
        title: "Batman"
      })
    )
    .then(movie => res.status(200).send({ movie }))
    .catch(err => {
      res.status(500).json({
        message: "Something went wrong",
        error: err
      });
    });
});
app.delete("/movies/:id", (req, res) => {
  const id = req.params.id;
  Movie.findByPk(id)
    .then(movie => movie.destroy())
    .then(res.status(200).send(`Deleted movie with id:${id}`))
    .catch(err => {
      res.status(500).json({
        message: "Something went wrong",
        error: err
      });
    });
});
app.listen(port, () => `Listening on port ${port}`);
