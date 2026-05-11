import React, { useState, useEffect, useRef, useMemo } from 'react';

const EyeBall = ({
  size = 48,
  pupilSize = 16,
  maxDistance = 10,
  eyeColor = 'white',
  pupilColor = 'black',
  isBlinking = false,
  forceLookX,
  forceLookY,
  isSad = false,
  sadRotate = 0,
  mousePos = { x: 0, y: 0 }
}) => {
  const eyeRef = useRef(null);
  const [center, setCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCenter = () => {
      if (eyeRef.current) {
        const rect = eyeRef.current.getBoundingClientRect();
        setCenter({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
      }
    };

    updateCenter();
    window.addEventListener('resize', updateCenter);
    window.addEventListener('scroll', updateCenter, true);
    return () => {
      window.removeEventListener('resize', updateCenter);
      window.removeEventListener('scroll', updateCenter, true);
    };
  }, []);

  const pupilPosition = useMemo(() => {
    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }

    const deltaX = mousePos.x - center.x;
    const deltaY = mousePos.y - center.y;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

    const angle = Math.atan2(deltaY, deltaX);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
  }, [mousePos, forceLookX, forceLookY, maxDistance, center]);

  return (
    <div
      ref={eyeRef}
      className={`eyeball ${isSad ? 'eyeball--sad' : ''}`}
      style={{
        width: `${size}px`,
        height: isBlinking ? '2px' : isSad ? `${size * 0.5}px` : `${size}px`,
        backgroundColor: eyeColor,
        borderRadius: isSad ? `0 0 ${size}px ${size}px` : '50%',
        transform: isSad ? `rotate(${sadRotate}deg)` : 'rotate(0deg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        willChange: 'height, border-radius, transform'
      }}
    >
      {!isBlinking && (
        <div
          className="pupil"
          style={{
            width: `${pupilSize}px`,
            height: `${pupilSize}px`,
            backgroundColor: pupilColor,
            transform: `translate(${pupilPosition.x}px, ${isSad ? -1 : pupilPosition.y}px)`,
            borderRadius: '50%',
            transition: 'transform 0.1s ease-out',
            willChange: 'transform'
          }}
        />
      )}
    </div>
  );
};

export default EyeBall;
