const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.use(express.json());

app.all("/api/*", async (req, res) => {
  const url = `http://hisashiburidanaapi-dev.eba-p3qmbpgu.eu-west-2.elasticbeanstalk.com${req.originalUrl}`;

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: req.headers,
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = app;
