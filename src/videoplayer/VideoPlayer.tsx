import React, { useRef, useState, useEffect } from 'react'
import './videoplayer.css'
import play from './play.svg'
import pause from './pause.svg'

const VideoPlayer = (): React.ReactElement => {
  const vidRef = useRef<any>(null)
  const [paused, setPaused] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  let timer: string | number | NodeJS.Timer | undefined

  useEffect(() => {
    if (paused) {
      setCurrentTime(vidRef.current.currentTime)
      clearInterval(timer)
    } else {
      timer = setInterval(() => {
        setCurrentTime((time) => time + 0.1)
      }, 100)
    }
    return () => clearInterval(timer)
  }, [paused])

  const handleControlVideo = (): void => {
    if (vidRef.current.paused) {
      setPaused(false)
      vidRef.current.play()
    } else {
      vidRef.current.pause()
      setPaused(true)
    }
  }

  const onVideoEnd = (): void => {
    setPaused(true)
    clearInterval(timer)
  }

  useEffect(() => {
    if (vidRef.current) {
      vidRef.current.addEventListener('ended', onVideoEnd, false)
    }
  }, [vidRef])

  return (<div className="videoplayer-container">
      <video id="screen" ref={vidRef} width="500" className='video'>
        <source src="https://tractive.com/assets/static/videos/ActivityMonitoring_15s_EN.mp4" type="video/mp4" />
      </video>
      <img className={`controls playpause ${paused ? 'play' : 'pause'}`} src={paused ? play : pause} onClick={handleControlVideo} />
      <div className="controls interval">{currentTime.toFixed(1)} / {vidRef?.current?.duration.toFixed(1) || '-'}</div>
  </div>)
}

export default VideoPlayer
