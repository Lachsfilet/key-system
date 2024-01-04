const express = require("express");
const fs = require("fs");

const config = require("./config.json");
const theKey = require("./apikey.json");

const app = express();

function renewApiKey() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const keyLength = 32;
  let apiKey = "";

  for (let i = 0; i < keyLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    apiKey += characters.charAt(randomIndex);
  }

  // Write the apiKey to apikey.json
  fs.writeFile("apikey.json", JSON.stringify({ apiKey }), (err) => {
    if (err) {
      console.error('Error writing apiKey file:', err);
    } else {
      console.log('apiKey file updated successfully.');
    }
  });
}

function generateProductKey() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const keyLength = 16; // You can adjust the length of the key
  let productKey = "";

  for (let i = 0; i < keyLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    productKey += characters.charAt(randomIndex);
  }

  const formattedKey = productKey.replace(/(.{4})/g, "$1-").slice(0, -1);
  return formattedKey;
}

app.use(express.json()); // Middleware to parse JSON in the request body

app.post('/create-key', (req, res) => {
  const { apiKey } = req.body;

  if (!apiKey) {
    return res.status(400).json({ error: 'API key is required in the request body' });
  }

  if (apiKey === theKey.apiKey) {
    return res.status(200).json({ productKey: generateProductKey() });
  } else {
    return res.status(400).json({ error: 'API key is invalid' });
  }
});

app.listen(config.port, () => {
  console.log(`Server is listening on port ${config.url}:${config.port}`);
});
