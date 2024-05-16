import React, { useEffect, useState } from 'react';
import Reels from './components/Reels'; 
import vid1 from "./videos/1.mp4"
import vid2 from "./videos/2.mp4"
import vid3 from "./videos/3.mp4"
import vid4 from "./videos/4.mp4"
import "./App.css"

function App() {
  const videoUrls = [
    vid1,
    vid2,
    vid3,
    vid4,
    "https://videos.pexels.com/video-files/20683835/20683835-sd_540_960_30fps.mp4",
    "https://videos.pexels.com/video-files/20683835/20683835-sd_540_960_30fps.mp4",
    "https://videos.pexels.com/video-files/20683835/20683835-sd_540_960_30fps.mp4",
    "https://videos.pexels.com/video-files/20683835/20683835-sd_540_960_30fps.mp4"
    // Add more video URLs as needed
  ];

  const [observer, setObserver] = useState(null);

  useEffect(() => {
    const callback = (entries) => {
      entries.forEach((entry) => {
        let ele = entry.target.childNodes[0];
        ele.play().then(() => {
          if (!ele.paused && !entry.isIntersecting) {
            ele.pause();
          }
        });
      });
    };

    const newObserver = new IntersectionObserver(callback, { threshold: 0.6 });
    setObserver(newObserver);

    return () => {
      if (newObserver) {
        newObserver.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (observer) {
      const elements = document.querySelectorAll(".video-container > .video-item");
      elements.forEach((element) => {
        observer.observe(element);
      });

      return () => {
        elements.forEach((element) => {
          observer.unobserve(element);
        });
      };
    }
  }, [observer]);

  return (
    <div className="App">
      <h1>Welcome to My App</h1>
      <div className="video-container">
        {videoUrls.map((url, index) => (
          <div className="video-item" key={index}>
            <Reels videoUrl={url} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
