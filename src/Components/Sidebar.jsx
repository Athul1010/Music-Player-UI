import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import '../Styles/Sidebar.css';

const Sidebar = ({isOpen, onClose }) => {

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios.get('https://cms.samespace.com/items/songs')
      .then(res => {
        setSongs(res.data.data);
        console.log('Fetched data:', res.data.data);
      })
      .catch(error => console.error('Fetching error:', error));
  }, []);

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>×</button>
      <div className="sidebar-content">
        {/* Add your sidebar content here */}
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
          <div className='songSet-wrapper'>
            <div className='tracks text-center'>
              <h4 className='for-you'>For You</h4>
              <h4 className='top-track'>Top Tracks</h4>

            </div>
            <div className='search my-3'>
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search Songs"
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Paper>
            </div>

            <div>
              {songs.map(song => (
                <div className='contents' key={song.id}>
                  <div className='images'>
                    <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} className="img-fluid" />
                  </div>
                  <div className='names'>
                    <p className='song-name'>{song.name}</p>
                    <p className='artist'>{song.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
