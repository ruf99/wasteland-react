const express = require('express');
const cors = require('cors');
const axios = require('axios');
const qs = require('querystring');
const app = express();
const { Pool } = require('pg');
const pool = new Pool ({
  user: 'postgres',
  host: 'localhost',
  database: 'spotify_data',
  password: 'rufaida',
  port: 5432,
});

app.use(cors({
  origin: 'http://localhost:3000'
}));

const clientId = '24664315c9bb4590979e265ab199cc44';
const clientSecret = '836ef7170f754fa0842d968f2b290206';
const port = 3001;

let accessToken = '';
app.get('/get-token', async (req, res) => {
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
  };
  const data = qs.stringify({ grant_type: 'client_credentials' });

  try {
    const response = await axios.post(tokenUrl, data, { headers });
    accessToken = response.data.access_token;  // Update token
    res.send({ accessToken: response.data.access_token });
  } catch (error) {
    console.error('Failed to retrieve access token:', error.response ? error.response.data : error);
    res.status(500).send('Failed to retrieve access token');
  }
});


async function searchArtistByName(artistName, accessToken) {
  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data.artists.items; 
  } catch (error) {
    console.error('Error searching for artist:', error);
    return [];
  }
}

app.get('/search-artist', async (req, res) => {
  if (!accessToken) {
    res.status(401).send('No access token available. Please authenticate first.');
    return;
  }
  const artistName = req.query.name;
  const artists = await searchArtistByName(artistName, accessToken);
  res.json(artists);
});

async function getArtistAlbums(artistId, accessToken) {
  const url = `https://api.spotify.com/v1/artists/${artistId}/albums`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data; 
  } catch (error) {
    console.error('Error searching for albums:', error);
    return [];
  }
}

app.get('/artist-albums/:artistId', async (req, res) => {
  const artistId = req.params.artistId;
  if (!accessToken) {
    res.status(401).send('No access token available. Please authenticate first.');
    return;
}
  const albums = await getArtistAlbums(artistId, accessToken);
  res.json(albums);
});

app.get('/api/albums/analysis/:albumName', async (req, res) => {
  const { albumName } = req.params;
  console.log(`Fetching analysis for album: ${albumName}`);
  try {
    const queryResult = await pool.query('SELECT * FROM tunes WHERE album_name = $1', [albumName]);
    console.log(`Query results: ${queryResult.rows.length} rows found`);
    if (queryResult.rows.length > 0) {
      res.json(queryResult.rows);
      console.log('Query Resulted in this: ', queryResult.rows);
    } else {
      res.status(404).send('Analysis not found');
    }
  } catch (error) {
    console.error('Error fetching analysis:', error);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

