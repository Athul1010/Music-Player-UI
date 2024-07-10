import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logo from '../assets/Logo.png';
import profile from '../assets/Profile.png';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { GiHamburgerMenu } from "react-icons/gi";
import Audio from './Audio';
import Sidebar from './Sidebar';


const Home = () => {
  const [songs, setSongs] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    axios.get('https://cms.samespace.com/items/songs')
      .then(res => {
        setSongs(res.data.data);
        console.log('Fetched data:', res.data.data);
      })
      .catch(error => console.error('Fetching error:', error));
  }, []);

  const handleSidebarOpen = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className='music-app-section'>
      <div className="container-fluid">
        <div className="row">
          {/* Left Side */}
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
            <div className="image-container">
              <div className='menu-items'>
                <img src={Logo} alt="Logo" className="img-fluid logo" />
                <span className='menu' onClick={handleSidebarOpen}><GiHamburgerMenu /></span>
              </div>
             
              <img src={profile} alt="Profile" className="img-fluid my-3 profile" />
              
            </div>
          </div>

          {/* Center */}
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
            <div className='song-wrapper'>
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

          {/* Right Side */}
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
            <div>
              {/* <h1 className="text-center">hellooo</h1>
              <img src="" alt="" className="img-fluid my-3" /> */}
              <Audio />
            </div>
          </div>
        </div>
      </div>
      {/* <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} /> */}
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose}/>
    </div>
  );
}

export default Home;
