import { useRef, useState } from 'react';
import '../Styles/Audio.css'

const Audio = () => {
        
 
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  

  const currentAudio = useRef()  
  return (
    <>
    <div className="container">
      <audio src='./Assets/songs/Chasing - NEFFEX.mp3' ref={currentAudio} onEnded={''} onTimeUpdate={''}></audio>
      <div className="blackScreen"></div>
      <div className="music-Container">
        <p className='musicPlayer'>Music Player</p>
        <p className='music-Head-Name'>songName</p>
        <p className='music-Artist-Name'>songArtist</p>
        <img src="https://static1.anpoimages.com/wordpress/wp-content/uploads/2024/04/spotify-feature-image.jpg" alt="athulraj" id='songAvatar'/>
        <div className="musicTimerDiv">
        <p className='musicCurrentTime'>00:00</p>
        <p className='musicTotalLenght'>00:00</p>
        </div>
        <input type="range" name="musicProgressBar" className='musicProgressBar' />
        <div className="musicControlers">
          <i className='fa-solid fa-backward musicControler' onClick={''}></i>
          <i className={`fa-solid ${isAudioPlaying? 'fa-pause-circle' : 'fa-circle-play'} playBtn`} onClick={''}></i>
          <i className='fa-solid fa-forward musicControler' onClick={''}></i>
        </div>
      </div>
      
    </div>
    </>
  )
}

export default Audio