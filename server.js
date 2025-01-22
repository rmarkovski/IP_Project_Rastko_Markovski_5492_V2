const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');

app.use(cors());

// Treba da se menuva API_KEY na sekoi 24h
const API_KEY = 'RGAPI-f562458e-2e41-40e4-ab11-d2937adb103a';

app.get('/api/champion-rotations', async (req, res) => {
  try {
    const response = await axios.get(
      `https://eun1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${API_KEY}`,
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Riot API:', error.message);
    res.status(500).send('Error fetching data from Riot API');
  }
});

app.get('/api/champion-mastery/98', async (req, res) => {
  try {
    const response = await axios.get(
      `https://eun1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/afejawO0bgrb0kNSPeyzzDhOXGbBiZe-bYzfrV9RBY2IaHg48Ae1viCpY28IaBnzqYYjArv2UVbTFQ/by-champion/98?api_key=${API_KEY}`,
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching champion mastery:', error.message);
    console.error('Full error:', error.response?.data || error);
    res.status(500).json({
      error: 'Failed to fetch champion mastery',
      details: error.response?.data || error.message
    });
  }
}); 

app.get('/api/champions/shen', (req, res) => {
  const filePath = path.join(__dirname,'shen.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading file from disk:', err);
          return res.status(500).send('Unable to load champion data');
      }
      try {
          const jsonData = JSON.parse(data);
          res.setHeader('Content-Type', 'application/json');
          res.json(jsonData);
      } catch (err) {
          console.error('Error parsing JSON:', err);
          res.status(500).send('Error parsing champion data');
      }
  });
});


app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});