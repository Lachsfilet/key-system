const express = require("express");
const fs = require("fs");

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

app.get("/create-key", (request, response) => {
  renewApiKey();
  response.send("API Key created and written to apikey.json");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
