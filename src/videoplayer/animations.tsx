import React from 'react'
import './animation.css'

const Animations = ({ paused }: { paused: boolean }): React.ReactElement => {
  return <div className={`container ${paused ? 'paused' : ''}`}>
  <div className="animations">
    <i className="animations-fourth-bar"></i>
    <i className="animations-third-bar"></i>
    <i className="animations-second-bar"></i>
    <i className="animations-first-bar"></i>
  </div>
  <div className="animations2">
    <i className="animations-first-bar"></i>
    <i className="animations-second-bar"></i>
    <i className="animations-third-bar"></i>
    <i className="animations-fourth-bar"></i>
  </div>
</div>
}

export default Animations
