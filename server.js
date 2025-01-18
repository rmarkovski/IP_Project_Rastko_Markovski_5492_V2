const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(cors());

// Treba da se menuva API_KEY na sekoi 24h
const API_KEY = 'RGAPI-c357039a-0d95-4b7a-889d-b44cbf623545';

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

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});