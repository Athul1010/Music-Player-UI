import React, { useEffect, useState, useRef } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import Logo from '../assets/Logo.png';
import profile from '../assets/Profile.png';
import { GiHamburgerMenu } from "react-icons/gi";
import { faBackward, faForward, faPauseCircle, faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaVolumeUp } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import ScaleLoader from "react-spinners/ScaleLoader";
import '../Styles/LandingPage.css';
import { Link } from 'react-router-dom';

const SearchBar = ({ searchTerm, handleSearchChange }) => (
    <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', backgroundColor: '#333' }}
    >
        <InputBase
            sx={{ ml: 1, flex: 1, color: 'rgb(178 177 177)' }}
            placeholder="Search Songs by Name"
            value={searchTerm}
            onChange={handleSearchChange}
        />
        <IconButton type="submit" sx={{ p: '10px', color: 'rgb(178 177 177)' }} aria-label="search">
            <SearchIcon />
        </IconButton>
    </Paper>
);

const MusicPlayer = ({ song, isAudioPlaying, togglePlay, handleNext, handlePrev, backgroundColor }) => {
    const audioRef = useRef(null);
    const progressBarRef = useRef(null);
    const [volume, setVolume] = useState(1);
    const [isVolumeSliderVisible, setIsVolumeSliderVisible] = useState(false);

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
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const handleProgressChange = (e) => {
        const currentTime = (e.target.value / 100) * audioRef.current.duration;
        audioRef.current.currentTime = currentTime;
    };

    const toggleVolumeSlider = () => {
        setIsVolumeSliderVisible(!isVolumeSliderVisible);
    };

    const handleVolumeChange = (e) => {
        setVolume(e.target.value);
    };

    return (
        <div style={{ backgroundColor }}>
            <div className='music-text-head'>
                <p className='music-Head-Name'>{song.name}</p>
                <p className='music-Artist-Name'>{song.artist}</p>
            </div>
            <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} id='songAvatar' />
            <div className="musicTimerDiv"></div>
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

const LandingPage = () => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [songs, setSongs] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState('#0D0D0D');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const loadingDuration = 3000; 

    const handleSidebarOpen = () => setIsSidebarOpen(true);
    const handleSidebarClose = () => setIsSidebarOpen(false);
    const togglePlay = () => setIsAudioPlaying(!isAudioPlaying);

    const handleSelectSong = (song) => {
        setCurrentSong(song);
        setCurrentIndex(songs.indexOf(song));
        setIsAudioPlaying(true);
        handleSidebarClose()
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

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);

        const filteredData = songs.filter((song) =>
            song.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSongs(filteredData);
    };

    useEffect(() => {
        setTimeout(() => {
            axios.get('https://cms.samespace.com/items/songs')
                .then(res => {
                    setSongs(res.data.data);
                    setFilteredSongs(res.data.data);
                    setCurrentSong(res.data.data[0]); 
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Fetching error:', error);
                    setLoading(false);
                });
        }, loadingDuration);
    }, [loadingDuration]);

    useEffect(() => {
        if (currentSong) {
            setBackgroundColor(currentSong.accent);
        }
    }, [currentSong]);

    const MobileSideBar = () => {
        return (
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={handleSidebarClose}>×</button>
                <div className="sidebar-content">
                    <div className='song-wrapper w-100'>
                        <div className='tracks text-center'>
                            <h4 className='for-you'><Link to={'/audio'} target="_blank">For You</Link></h4>
                            <h4 className='top-track'>Top Tracks</h4>
                        </div>
                        <div className='search my-3'>
                            <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
                        </div>
                        {filteredSongs.map(song => (
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
                                    <p className='artist' style={{ color: "rgb(178 177 177)" }}>{song.artist}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className='landing-container container-fluid' style={{ backgroundColor }}>
            {loading ? (
                <div className="loader">
                    <ScaleLoader color={'#3AC417'} loading={loading} size={150} />
                </div>
            ) : (
                <div className='d-flex row'>
                    <div className='d-flex justify-content-between p-4 d-md-none'>
                        <img src={profile} alt="profile" className="img-fluid" style={{ height: "50px" }} />
                        <img src={Logo} alt="Logo" className="img-fluid logo" />
                        <span className='menu' onClick={handleSidebarOpen}><GiHamburgerMenu /></span>
                    </div>
                    <div className='col-6 d-none d-md-block d-flex justify-content-center align-items-center'>
                        <div className="h-100 d-flex w-100 justify-content-between py-5 px-3">
                            <div className='h-100 d-flex flex-column align-items-start'>
                                <img src={Logo} alt="Logo" className="img-fluid logo mb-auto" />
                                <img src={profile} alt="profile" className="img-fluid" />
                            </div>
                            <div className='song-wrapper'>
                                <div className='tracks text-center'>
                                    <h4 className='for-you'><Link to={'/audio'} target="_blank">For You</Link></h4>
                                    <h4 className='top-track'>Top Tracks</h4>
                                </div>
                                <div className='search my-3'>
                                    <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
                                </div>
                                {filteredSongs.map(song => (
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
                                            <p className='artist' style={{ color: "rgb(178 177 177)" }}>{song.artist}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 music_player d-flex justify-content-center align-items-center'>
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
            )}
            {MobileSideBar()}
        </div>
    );
};

export default LandingPage;
