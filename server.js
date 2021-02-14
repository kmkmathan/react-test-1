// Server

const express = require("express");
const app = express();
const port = 5000;
const router = express.Router();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use("/api/v1/", router);

require("./routes/index")(router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
