import React, { useState, useEffect, useRef, useCallback } from 'react';

import backgroundUrl from '../assets/img/floor.png';
import basketballUrl from '../assets/img/basketball1.webp';
import footballUrl from '../assets/img/football.png';
import volleyballUrl from '../assets/img/volleyball1.webp';
import humanUrl from '../assets/img/me.jpg';
import cartoonUrl from '../assets/img/cartoon.png';
import logoUrl from '../assets/img/logo.png';


const BOX_WIDTH = 600; 
const BOX_HEIGHT = 300; 
const CIRCLE_SIZE = 60; 

const imageMap = {
  basketball: basketballUrl,
  football: footballUrl,
  volleyball: volleyballUrl,
  human: humanUrl,
  cartoon: cartoonUrl,
  logo: logoUrl,
};

const buttonTypes = ['none', 'basketball', 'football', 'volleyball', 'human', 'cartoon', 'logo'];

const Animation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [activeType, setActiveType] = useState('basketball');

  const animationFrameId = useRef(null);
  const position = useRef({
    x: (BOX_WIDTH - CIRCLE_SIZE) / 2,
    y: (BOX_HEIGHT - CIRCLE_SIZE) / 2,
    rotation: 0,
  });
  const speed = useRef({
    x: 5,
    y: 5,
    rotation: 3,
  });
  const circleRef = useRef(null); 

  const updateCirclePosition = useCallback(() => {
    if (circleRef.current) {
      const { x, y, rotation } = position.current;
      circleRef.current.style.left = `${x}px`;
      circleRef.current.style.bottom = `${y}px`;
      circleRef.current.style.transform = `rotate(${rotation}deg)`;
    }
  }, []);

  const animate = useCallback(() => {
    let { x, y, rotation } = position.current;
    let { x: xSpeed, y: ySpeed, rotation: rotationSpeed } = speed.current;

    x += xSpeed;
    y += ySpeed;
    rotation = (rotation + rotationSpeed) % 360;
    
    const maxX = BOX_WIDTH - CIRCLE_SIZE;
    const maxY = BOX_HEIGHT - CIRCLE_SIZE;

    let scope = false;
    if (x <= 0) { x = 0; xSpeed = Math.abs(xSpeed); scope = true; }
    else if (x >= maxX) { x = maxX; xSpeed = -Math.abs(xSpeed); scope = true; }

    if (y <= 0) { y = 0; ySpeed = Math.abs(ySpeed); scope = true; }
    else if (y >= maxY) { y = maxY; ySpeed = -Math.abs(ySpeed); scope = true; }

    if (scope) {
      if (Math.random() > 0.5) { [xSpeed, ySpeed] = [ySpeed, xSpeed]; }
      rotationSpeed = -rotationSpeed * 1.2;
    }

    if (Math.abs(rotationSpeed) > 3) { rotationSpeed *= 0.95; }

    position.current = { x, y, rotation };
    speed.current = { x: xSpeed, y: ySpeed, rotation: rotationSpeed };

    updateCirclePosition();
    animationFrameId.current = requestAnimationFrame(animate);
  }, [updateCirclePosition]);

  const handleRunPause = () => setIsRunning(prev => !prev);

  const handleStop = () => {
    setIsRunning(false);
    position.current = {
      x: (BOX_WIDTH - CIRCLE_SIZE) / 2,
      y: (BOX_HEIGHT - CIRCLE_SIZE) / 2,
      rotation: 0,
    };
    speed.current = { x: 5, y: 5, rotation: 3 };
    updateCirclePosition();
  };
  
  const handleChangeType = (type) => {
    setActiveType(type);
    if (type === 'none') setIsRunning(false);
  };

  useEffect(() => {
    if (isRunning) {
      animationFrameId.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationFrameId.current);
    }
    return () => cancelAnimationFrame(animationFrameId.current);
  }, [isRunning, animate]);
  
  useEffect(() => {
    updateCirclePosition();
  }, [updateCirclePosition]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') { e.preventDefault(); handleRunPause(); }
      if (e.key === 's' || e.key === 'S') { handleStop(); }
      if (e.key >= '0' && e.key <= '6') { handleChangeType(buttonTypes[parseInt(e.key)]); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []); 


  return (
    <div className="container my-4 mt-5">
      <div className="border border-2 border-dark rounded p-1 mx-auto" style={{ width: "625px" }}>
        <div
          className="border border-dark rounded position-relative"
          style={{ 
            width: "600px", 
            height: "300px", 
            backgroundImage: `url(${backgroundUrl})`,
            backgroundSize: 'contain', 
            backgroundRepeat: 'no-repeat', 
            backgroundPosition: 'center'
          }}
        >
          <div
            ref={circleRef}
            className="rounded-circle border border-dark position-absolute bg-cover bg-center"
            style={{
              width: `${CIRCLE_SIZE}px`,
              height: `${CIRCLE_SIZE}px`,
              backgroundImage: activeType !== 'none' ? `url(${imageMap[activeType]})` : 'none',
              backgroundColor: activeType === 'none' ? '#bbb' : 'transparent',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
        </div>
        <div className="d-flex flex-wrap justify-content-center gap-2 mt-2 p-1">
          <button onClick={handleRunPause} className={`btn btn-sm text-white ${isRunning ? 'btn-warning' : 'btn-success'}`}>
            <i className={`bi ${isRunning ? 'bi-pause-circle' : 'bi-play-circle'} me-1`}></i>
            {isRunning ? 'PAUSE' : 'RUN'}
          </button>
          <button onClick={handleStop} className="btn btn-sm btn-secondary">
            STOP
          </button>
          {buttonTypes.map(type => (
             <button
                key={type}
                onClick={() => handleChangeType(type)}
                className={`btn btn-sm text-uppercase ${activeType === type ? 'btn-primary' : (type === 'none' ? 'btn-outline-secondary' : 'btn-outline-primary')}`}
             >
                {type}
             </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Animation;