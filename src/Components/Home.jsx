import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CiSearch } from "react-icons/ci";
import Logo from '../assets/Logo.png'

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import '../Styles/Home.css'


const Home = () => {
  let [value, setValue] = useState([])
  useEffect(() => {
    axios.get('https://cms.samespace.com/items/songs')
      .then(res => {
        setValue(res.data.data);
        console.log('Fetched data:', res.data.data);
      })
      .catch(error => console.error('Fetching error:', error));
  }, []);
  return (
    <div>

      <div>
        <img src={Logo} alt="" />
        <h4>For You</h4>
        <h4>Top Tracks</h4>
      </div>
      <div>

      <div className='search'>
        <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
  
          >
              <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search Google Maps"
  
              />
              <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
              </IconButton>
          </Paper>
      </div>
      </div>

      <div>
        {value.map((datas) => (
          <div className='contents'>
            <div className='images' key={datas.id}>
              <img src={`https://cms.samespace.com/assets/${datas.cover}`} alt="" />
            </div>
            <div>
              <p>{datas.name}</p>
              <p>{datas.artist}</p> 
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home


