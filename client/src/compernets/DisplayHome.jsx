import React, { useContext } from 'react'
import Navbar from './Navbar'
import AlbumItem from './AlbumItem'
import SongItem from './SongItem'
import { PlayerContext } from '../context/PlayerContext'

const DisplayHome = () => {
  const {songsData,albumsData} = useContext(PlayerContext)
  return (
    <div>
        <Navbar/>
        <div className='mb-4'>
            <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
            <div className='flex overflow-auto'>
                  {albumsData.map((items, index) => (<AlbumItem key={index} name={items.name} desc={items.desc} id={items._id} image={items.image} />))}
            </div>
        </div>
          <div className='mb-4'>
              <h1 className='my-5 font-bold text-2xl'>Today's biggest hits</h1>
              <div className='flex overflow-auto'>
                  {songsData.map((items, index) => (<SongItem key={index} name={items.name} desc={items.desc} id={items._id} image={items.image} />))}
              </div>
          </div>
    </div>
  )
}

export default DisplayHome