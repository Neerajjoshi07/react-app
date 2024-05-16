import React, { useRef, useState } from 'react';
import "./Reels.css"

function Reels(props) {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleClick = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    const handleVideoEnded = () => {
        if (videoRef.current) {
            // Replay the video when it ends
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    };
  return (
      <video ref={videoRef} src={props.videoUrl} onEnded={handleVideoEnded} className="reels-container" onClick={handleClick}/>
    
  );
}

export default Reels;
