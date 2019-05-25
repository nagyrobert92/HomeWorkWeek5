const { Pool } = require("pg");
const express = require("express");
const app = express();
const name = "James";
const port = process.env.PORT || 3000;
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres:secret@localhost:5432/postgres"
});
pool.connect().then(() => {
  console.log("Connection to Postgres established!");
});
pool.on("error", err => {
  console.error("error event on pool", err);
});
pool
  .query(
    `CREATE TABLE IF NOT EXISTS person (id serial, first_name varchar(255), last_name varchar(255), eye_color varchar(255))`
  )
  .then(() => console.log("Tables created successfully"))
  .catch(err => {
    console.error("Unable to create tables, shutting down...", err);
    process.exit(1);
  })
  .then(() =>
    pool.query(
      "INSERT INTO person (first_name, last_name, eye_color) VALUES ($1,$2,$3)",
      ["James", "Smith", "brown eyes"]
    )
  )
  .then(() => console.log("Person created successfully"))
  .catch(err => console.error(err))
  .then(() =>
    pool.query(
      "INSERT INTO person (first_name, last_name, eye_color) VALUES ($1,$2,$3)",
      ["Frank", "Jones", "brown eyes"]
    )
  )
  .then(() => console.log("Person created successfully"))
  .catch(err => console.error(err))
  .then(() =>
    pool.query(
      "INSERT INTO person (first_name, last_name, eye_color) VALUES ($1,$2,$3)",
      ["Rebecca", "Andrews", "blue eyes"]
    )
  )
  .then(() => console.log("Person created successfully"))
  .catch(err => console.error(err))
  .then(() =>
    pool.query(
      "UPDATE person SET eye_color='blue eyes' WHERE eye_color='brown eyes'"
    )
  )
  .then(() => console.log("Eye colors updated successfully"))
  .catch(err => console.error(err))

  .then(() =>
    pool.query("SELECT * FROM person WHERE first_name = ($1)", [name])
  )
  .then(res => {
    console.log("parameterized query for James", res);
  })
  .then(() => console.log("The end"))
  .catch(err => console.error(err));
app.listen(port, () => console.log("listening on port " + port));
