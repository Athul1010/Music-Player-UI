import React, { useEffect, useState } from 'react'
import ScaleLoader from "react-spinners/ScaleLoader";
import '../Styles/Audio.css'
import spotifyMusic from '../assets/spotifyMusic.png'

const Audio = () => {
  const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }, [])
  return (
    <div className='spotify'>
      
      <div className="loader">
            {
                loading ?
                <ScaleLoader color={'#3AC417'} loading={loading} size={30} />
                :
                <div>
                <h1 className='spotify-wrapper'>Spotify App</h1>
                <img src={spotifyMusic} alt="" />
                </div>

            }
        </div>
    </div>
  )
}

export default Audio