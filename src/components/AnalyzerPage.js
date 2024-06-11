import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Analyzer.css';

export default function AnalyzerPage() {

  const [token, setToken] = useState('');
  const [artistName, setArtistName] = useState('');
  const [artistId, setArtistId] = useState('');
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [albumAnalysis, setAlbumAnalysis] = useState([]);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [viewedAlbums, setViewedAlbums] = useState({
    'Hozier': false,
    'Wasteland, Baby!': false,
    'Unreal Unearth': false
  });
  const [message, setMessage] = useState('Token not acquired');
  const hozierId = '2FXC3k01G6Gw61bmprjgqS'; // Hozier's actual artist ID for demonstration

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    try {
      const response = await axios.get('/get-token');
      setToken(response.data.accessToken);
      setMessage('We have a token! Please search for an artist.');
    } catch (error) {
      console.error('Error fetching token:', error);
      setMessage('Failed to acquire token');
    }
  };

  const searchArtist = async () => {
    if (!token) {
      setMessage('Please acquire token first');
      return;
    }
    try {
      const response = await axios.get(`/search-artist?name=${encodeURIComponent(artistName)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.length > 0) {
        setArtistId(response.data[0].id);
        fetchAlbumsByArtistId(response.data[0].id);
      } else {
        setMessage('Artist not found!');
      }
    } catch (error) {
      console.error('Error searching for artist:', error);
      setMessage('Failed to search for artist');
    }
  };

  const fetchAlbumsByArtistId = async (artistId) => {
    try {
      const response = await axios.get(`/artist-albums/${artistId}`);
      if (artistId === hozierId) {
        // Specific handling for Hozier
        setAlbums([
          { name: 'Hozier', release_date: '2014' },
          { name: 'Wasteland, Baby!', release_date: '2019' },
          { name: 'Unreal Unearth', release_date: '2023' }
        ]);
        setMessage('Hozier albums displayed.');
      } else {
        // General handling for other artists
        setAlbums(response.data.items.slice(0, 4)); // Assuming the response directly contains the albums array
        console.log(response.data.items);
        setMessage(`Albums fetched for artist: ${artistName}`);
      }
    } catch (error) {
      console.error('Error fetching albums:', error);
      setMessage('Failed to fetch albums');
    }
  };

  const fetchAnalysis = async (albumName) => {
    try {
      if (['Hozier', 'Wasteland, Baby!', 'Unreal Unearth'].includes(albumName)) {
        const response = await axios.get(`/api/albums/analysis/${albumName}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAlbumAnalysis(response.data);
        setSelectedAlbum(albumName);
        setMessage(`Analysis for ${albumName}`);
        setViewedAlbums(prev => ({ ...prev, [albumName]: true }));
      }
    } catch (error) {
      console.error('Error fetching album analysis:', error);
      setMessage('Failed to fetch analysis');
    }
  };

  const allViewed = Object.values(viewedAlbums).every(Boolean);

  const handleBackToAlbums = () => {
    setSelectedAlbum('');  // Just return to album view
  };
  
  const spotifyPlaylist = (
    <iframe className="spotify-iframe" 
    src="https://open.spotify.com/embed/playlist/3roCeMtOk5JC6QQcRCoYS0?utm_source=generator" 
    allowFullScreen
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy">
  </iframe>
  );
  
  const clearAll = () => {
    setAlbums([]);
    setArtistId('');
    setArtistName('');
    setAlbumAnalysis([]);
    setSelectedAlbum('');
    setViewedAlbums({
      'Hozier': false,
      'Wasteland, Baby!': false,
      'Unreal Unearth': false
    });
    setShowPlaylist(false);  // Ensure playlist is not shown after clearing
    setMessage('Token acquired! Search for an artist.');
  };
  

  return (
      <div className="analyzer">
        <header className="headerAnalyze">
        <input className="artistInputText"
            type="text"
            placeholder="Enter artist name"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
          <br></br>
          <p>{message}</p>
          <br></br>
          <button className="searchArtistButton" onClick={searchArtist}>Search Artist</button>
          <button className="clearAllButton" onClick={clearAll} style={{ marginLeft: '10px' }}>Clear All</button>
          {albums.length > 0 && (
            <div className="table-container">
  <table className="centered-table">
    <thead>
      <tr>
        <th className="albumName">Album Name</th>
        <th className="releaseYear">Release Year</th>
        {artistId === hozierId && <th className="Action">Action</th>} {/* Conditionally render the <th> */}
      </tr>
    </thead>
    <tbody>
      {albums.map((album, index) => (
        <tr key={index}>
          <td>{album.name}</td>
          <td>{album.release_date.slice(0, 4)}</td>
          {artistId === hozierId && (
            <td> {/* Conditionally render the <td> */}
              {['Hozier', 'Wasteland, Baby!', 'Unreal Unearth'].includes(album.name) ? (
                <button className="viewAnalysisButton" onClick={() => fetchAnalysis(album.name)}>View Analysis</button>
              ) : null}
              {viewedAlbums[album.name] && album.name === 'Hozier' && <span>🖤</span>}
              {viewedAlbums[album.name] && album.name === 'Wasteland, Baby!' && <span>💙</span>}
              {viewedAlbums[album.name] && album.name === 'Unreal Unearth' && <span>❤️</span>}
            </td>
          )}
        </tr>
      ))}
    </tbody>
  </table>
</div>
          )}
          {selectedAlbum && albumAnalysis.length > 0 && (
            <div>
              <h3>Analysis for {selectedAlbum}</h3>
              <table className="analysis-table">
                <thead>
                  <tr>
                    <th>Song Name</th>
                    <th>Analysis</th>
                    <th>Themes</th>
                    <th> Similar Songs</th>
                  </tr>
                </thead>
                <tbody>
              {albumAnalysis.map((analysis, index) => (
                <tr key={index}>
                  <td>{analysis.song_name}</td>
                  <td>{analysis.song_analysis}</td>
                  <td>{analysis.song_themes}</td>
                  <td>{analysis.similar_music}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="backToAlbumsButton" onClick={() => setSelectedAlbum('')}>Back to Albums</button>
          <br></br>
          <br></br>
        </div>
      )}
      {!selectedAlbum && allViewed && <div className="spotify-playlist">{spotifyPlaylist}</div>} 
      </header>
      <footer className='footer_roo_analyzer'>
      <a className="portfolioLink" href="https://ruf99.github.io"> © Rufaida's Portfolio 🩵| 2020-2024   </a>
      </footer>
      </div>
  );
}
