import React, { useEffect, useState } from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Audio.css';
import spotifyMusic from '../assets/spotifyMusic.png';

const Audio = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="container-fluid spotify d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="loader">
        {loading ? (
          <ScaleLoader color={'#3AC417'} loading={loading} size={30} />
        ) : (
          <div className="text-center">
            <h1 className='spotify-wrapper mb-3'>Spotify App</h1>
            <img src={spotifyMusic} alt="Spotify Music" className="img-fluid" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Audio;
