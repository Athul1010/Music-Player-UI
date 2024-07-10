import React, { useEffect, useState } from 'react';
import Audio from './Audio';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import Logo from '../assets/Logo.png';
import profile from '../assets/Profile.png';
import Sidebar from './Sidebar';
import { GiHamburgerMenu } from "react-icons/gi";

const SearchBar = () => (
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
);

const SongList = ({ songs }) => (
    songs.map(song => (
        <div className='contents' key={song.id}>
            <div className='images'>
                <img src={https://cms.samespace.com/assets/${song.cover}} alt={song.name} className="img-fluid" />
            </div>
            <div className='names'>
                <p className='song-name'>{song.name}</p>
                <p className='artist'>{song.artist}</p>
            </div>
        </div>
    ))
);

const MusicPlayer = ({ isAudioPlaying, togglePlay }) => (
    <div>
        <div className='music-text-head'>
            <p className='music-Head-Name'>songName</p>
            <p className='music-Artist-Name'>songArtist</p>
        </div>
        <img src="https://static1.anpoimages.com/wordpress/wp-content/uploads/2024/04/spotify-feature-image.jpg" alt="song-avatar" id='songAvatar' />
        <div className="musicTimerDiv">
            <p className='musicCurrentTime'>00:00</p>
            <p className='musicTotalLength'>00:00</p>
        </div>
        <input type="range" name="musicProgressBar" className='musicProgressBar' />
        <div className="musicControllers">
            <i className='fa-solid fa-backward musicController' onClick={() => { }}></i>
            <i className={fa-solid ${isAudioPlaying ? 'fa-pause-circle' : 'fa-circle-play'} playBtn} onClick={togglePlay}></i>
            <i className='fa-solid fa-forward musicController' onClick={() => { }}></i>
        </div>
    </div>
);

export default function LandingPage() {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [songs, setSongs] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSidebarOpen = () => setIsSidebarOpen(true);
    const handleSidebarClose = () => setIsSidebarOpen(false);
    const togglePlay = () => setIsAudioPlaying(!isAudioPlaying);

    useEffect(() => {
        axios.get('https://cms.samespace.com/items/songs')
            .then(res => setSongs(res.data.data))
            .catch(error => console.error('Fetching error:', error));
    }, []);

    return (
        <div className='landing-container container-fluid' style={{ backgroundColor: "#000" }}>
            <div className='d-flex row'>
                <div className='d-flex justify-content-between p-4 d-md-none' style={{ background: "#000" }}>
                    <img src={profile} alt="profile" className="img-fluid" style={{ height: "50px" }} />
                    <img src={Logo} alt="Logo" className="img-fluid logo" />
                    <span className='menu' onClick={handleSidebarOpen}><GiHamburgerMenu /></span>
                </div>
                <div className='col-6 d-none d-md-block d-flex justify-content-center align-items-center'>
                    <div className="h-100 d-flex w-100 justify-content-between py-5 px-3">
                        <div className='h-100 d-flex flex-column align-items-start' style={{ background: "#000" }}>
                            <img src={Logo} alt="Logo" className="img-fluid logo mb-auto" />
                            <img src={profile} alt="profile" className="img-fluid" />
                        </div>
                        <div className='song-wrapper'>
                            <div className='tracks text-center'>
                                <h4 className='for-you'>For You</h4>
                                <h4 className='top-track'>Top Tracks</h4>
                            </div>
                            <div className='search my-3'>
                                <SearchBar />
                            </div>
                            <SongList songs={songs} />
                        </div>
                    </div>
                </div>
                <div className='col-12 col-md-6 d-flex justify-content-center align-items-center'>
                    <MusicPlayer isAudioPlaying={isAudioPlaying} togglePlay={togglePlay} />
                </div>
            </div>
            <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
        </div>
    );
}