import React, { useState, useEffect, useRef, useMemo } from 'react';

const Pupil = ({
  size = 12,
  maxDistance = 5,
  pupilColor = 'black',
  forceLookX,
  forceLookY,
  isBlinking = false,
  mousePos = { x: 0, y: 0 }
}) => {
  const pupilRef = useRef(null);
  const [center, setCenter] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCenter = () => {
      if (pupilRef.current) {
        const rect = pupilRef.current.getBoundingClientRect();
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
      ref={pupilRef}
      className="pupil"
      style={{
        width: `${size}px`,
        height: isBlinking ? '2px' : `${size}px`,
        backgroundColor: pupilColor,
        transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
        borderRadius: '50%',
        transition: 'transform 0.1s ease-out, height 0.15s ease-out',
        willChange: 'transform, height'
      }}
    />
  );
};

export default Pupil;
