import React, { useContext } from 'react'
import Sidebar from './compernets/Sidebar'
import Player from './compernets/Player'
import Display from './compernets/Display'
import { PlayerContext } from './context/PlayerContext'
import { songsData } from './assets/assets';

const App = () => {

  const {audioRef,track,songsData} = useContext(PlayerContext);

  return (
    <div className='h-screen bg-black'>
      {songsData.lenght !==0 ? <>
        <div className='h-[90%] flex'>
          <Sidebar />
          <Display />
        </div>
        <Player />
      </>
      : null
      }
      
      <audio ref={audioRef} src={track?track.file:""} preload='auto'></audio>
      
    </div>
  )
}

export default App