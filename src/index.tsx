import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './index.css'
import App from './App'
import VideoPlayer from './videoplayer/VideoPlayer'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/videoplayer" />} />
          <Route path="/contactlist" element={<App />} />
          <Route path="/videoplayer" element={<VideoPlayer />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
)
