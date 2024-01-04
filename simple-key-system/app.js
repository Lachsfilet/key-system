const express = require('express')
const config = require('./config.json');

const app = express()

function renewApiKey() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const keyLength = 32;
  let apiKey = '';

  for (let i = 0; i < keyLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    apiKey += characters.charAt(randomIndex);
  }

  return apiKey;
}




function generateProductKey() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const keyLength = 16; // You can adjust the length of the key
  let productKey = '';

  for (let i = 0; i < keyLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    productKey += characters.charAt(randomIndex);
  }

  const formattedKey = productKey.replace(/(.{4})/g, '$1-').slice(0, -1);
  return formattedKey;
}

app.get('/create-key', (request, response) => {
 
})

app.listen(config.port, () => {
    console.log(`Server is Listening on ${config.port}`)
})