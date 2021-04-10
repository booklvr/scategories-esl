import React, { Fragment, useState, useEffect } from 'react'
import { Howler } from 'howler'
import { Button } from 'react-bootstrap'

import '../assets/styles/_muteButton.scss'

const MuteButton = () => {
  const [mute, setMute] = useState(false)

  const handleVolumeClick = () => {
    setMute(!mute)
  }

  useEffect(() => {
    if (mute) {
      Howler.mute(true)
    } else {
      Howler.mute(false)
    }
  }, [mute])

  return (
    <Fragment>
      {mute === true ? (
        <div className='mute-btn' onClick={() => handleVolumeClick()}>
          <i className='fas fa-volume-mute'></i>
        </div>
      ) : (
        <div className='mute-btn' onClick={() => handleVolumeClick()}>
          <i className='fas fa-volume-up'></i>
        </div>
      )}
    </Fragment>
  )
}

export default MuteButton
