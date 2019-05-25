const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.post("/messages", (req, res) => {
  if (!req.body.text) {
    res.status(400).end();
    console.log("(400)Bad request");
  } else {
    console.log(req.body);
    res.json({
      text: "We received your request body!"
    });
  }
});
app.listen(port, () => console.log("listening on port " + port));
