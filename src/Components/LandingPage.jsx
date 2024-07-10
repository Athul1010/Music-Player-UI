import React, { useEffect, useState, useRef } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import Logo from '../assets/Logo.png';
import profile from '../assets/Profile.png';
import Sidebar from './Sidebar';
import { GiHamburgerMenu } from "react-icons/gi";
import { faBackward, faForward, faPauseCircle, faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaVolumeUp } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import '../Styles/LandingPage.css'

const SearchBar = () => (
    <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', backgroundColor: '#333' }}
    >
        <InputBase
            sx={{ ml: 1, flex: 1, color: 'rgb(178 177 177)' }}
            placeholder="Search Songs"
        />
        <IconButton type="submit" sx={{ p: '10px', color: 'rgb(178 177 177)' }} aria-label="search">
            <SearchIcon />
        </IconButton>
    </Paper>
);

const MusicPlayer = ({ song, isAudioPlaying, togglePlay, handleNext, handlePrev, backgroundColor }) => {
    const audioRef = useRef(null);
    const progressBarRef = useRef(null);
    const [volume, setVolume] = useState(1); // State to manage volume
    const [isVolumeSliderVisible, setIsVolumeSliderVisible] = useState(false); // State to toggle volume slider

    useEffect(() => {
        if (audioRef.current) {
            if (isAudioPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isAudioPlaying, song]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume; // Update audio volume
        }
    }, [volume]);

    const handleProgressChange = (e) => {
        const currentTime = (e.target.value / 100) * audioRef.current.duration;
        audioRef.current.currentTime = currentTime;
    };

    const toggleVolumeSlider = () => {
        setIsVolumeSliderVisible(!isVolumeSliderVisible); // Toggle volume slider visibility
    };

    const handleVolumeChange = (e) => {
        setVolume(e.target.value); // Update volume state
    };

    return (
        <div style={{ backgroundColor }}>
            <div className='music-text-head'>
                <p className='music-Head-Name'>{song.name}</p>
                <p className='music-Artist-Name'>{song.artist}</p>
            </div>
            <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} id='songAvatar' />
            <div className="musicTimerDiv">
                {/* <p className='musicCurrentTime'>{formatTime(audioRef.current ? audioRef.current.currentTime : 0)}</p>
                <p className='musicTotalLength'>{formatTime(audioRef.current ? audioRef.current.duration : 0)}</p> */}
            </div>
            <input
                type="range"
                name="musicProgressBar"
                className='musicProgressBar'
                ref={progressBarRef}
                onChange={handleProgressChange}
                value={(audioRef.current ? audioRef.current.currentTime / audioRef.current.duration * 100 : 0)}
            />
            <div className="musicControllers">
                <div>
                    <span className='option-set'><SlOptions /></span>
                </div>
                <div className="mainControllers">
                    <FontAwesomeIcon icon={faBackward} className='fa-solid musicController' onClick={handlePrev} />
                    <FontAwesomeIcon icon={isAudioPlaying ? faPauseCircle : faCirclePlay} className={`fa-solid ${isAudioPlaying ? 'fa-pause-circle' : 'fa-circle-play'} playBtn`} onClick={togglePlay} />
                    <FontAwesomeIcon icon={faForward} className='fa-solid musicController' onClick={handleNext} />
                </div>
                <div>
                    <span className='volume-set' onClick={toggleVolumeSlider}><FaVolumeUp /></span>
                    {isVolumeSliderVisible && (
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="volumeSlider"
                        />
                    )}
                </div>
            </div>
            <audio ref={audioRef} src={song.url} onTimeUpdate={() => {
                if (progressBarRef.current) {
                    progressBarRef.current.value = (audioRef.current.currentTime / audioRef.current.duration) * 100;
                }
            }} />
        </div>
    );
};

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default function LandingPage() {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState('#0D0D0D'); // Default background color

    const handleSidebarOpen = () => setIsSidebarOpen(true);
    const handleSidebarClose = () => setIsSidebarOpen(false);
    const togglePlay = () => setIsAudioPlaying(!isAudioPlaying);

    const handleSelectSong = (song) => {
        setCurrentSong(song);
        setCurrentIndex(songs.indexOf(song));
        setIsAudioPlaying(true);
    };

    const handleNext = () => {
        if (currentIndex < songs.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setCurrentSong(songs[currentIndex + 1]);
            setIsAudioPlaying(true);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setCurrentSong(songs[currentIndex - 1]);
            setIsAudioPlaying(true);
        }
    };

    useEffect(() => {
        axios.get('https://cms.samespace.com/items/songs')
            .then(res => setSongs(res.data.data))
            .catch(error => console.error('Fetching error:', error));
    }, []);

    useEffect(() => {
        if (currentSong) {
            setBackgroundColor(currentSong.accent);
        }
    }, [currentSong]);

    return (
        <div className='landing-container container-fluid' style={{ backgroundColor }}>
            <div className='d-flex row'>
                <div className='d-flex justify-content-between p-4 d-md-none' style={{  }}>
                    <img src={profile} alt="profile" className="img-fluid" style={{ height: "50px" }} />
                    <img src={Logo} alt="Logo" className="img-fluid logo" />
                    <span className='menu' onClick={handleSidebarOpen}><GiHamburgerMenu /></span>
                </div>
                <div className='col-6 d-none d-md-block d-flex justify-content-center align-items-center'>
                    <div className="h-100 d-flex w-100 justify-content-between py-5 px-3">
                        <div className='h-100 d-flex flex-column align-items-start' style={{  }}>
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
                            {songs.map(song => (
                                <div 
                                    className={`${currentSong && currentSong.id === song.id ? 'selected-song' : ''} contents cursor-pointer p-2`} 
                                    key={song.id} 
                                    onClick={() => handleSelectSong(song)}
                                >
                                    <div className='images'>
                                        <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} className="img-fluid" />
                                    </div>
                                    <div className='names'>
                                        <p className='song-name'>{song.name}</p>
                                        <p className='artist' style={{color:"rgb(178 177 177)"}}>{song.artist}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='col-12 col-md-6 d-flex justify-content-center align-items-center'>
                    {currentSong && (
                        <MusicPlayer
                            song={currentSong}
                            isAudioPlaying={isAudioPlaying}
                            togglePlay={togglePlay}
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                            backgroundColor={backgroundColor}
                        />
                    )}
                </div>
            </div>
            <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
        </div>
    );
}
