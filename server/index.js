const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const config = require("./config");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 3001;
app.get("/", async (req, res) => {
  try {
    const conn = await mysql.createConnection(config.db);
    const [result] = await conn.execute("select * from task");
    if (!result) result = [];
    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port);
