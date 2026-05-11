import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import EyeBall from './EyeBall';
import Pupil from './Pupil';

const AnimatedCharacters = ({
  isTyping = false,
  showPassword = false,
  passwordLength = 0,
  loginFailed = false,
  loginSuccess = false
}) => {
  const purpleRef = useRef(null);
  const blackRef = useRef(null);
  const orangeRef = useRef(null);
  const yellowRef = useRef(null);

  const [hasEntered, setHasEntered] = useState(false);
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
  const [isBlackBlinking, setIsBlackBlinking] = useState(false);
  const [isOrangeBlinking, setIsOrangeBlinking] = useState(false);
  const [isYellowBlinking, setIsYellowBlinking] = useState(false);
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);
  const [isPurplePeeking, setIsPurplePeeking] = useState(false);

  const [purplePos, setPurplePos] = useState({ faceX: 0, faceY: 0, bodySkew: 0 });
  const [blackPos, setBlackPos] = useState({ faceX: 0, faceY: 0, bodySkew: 0 });
  const [orangePos, setOrangePos] = useState({ faceX: 0, faceY: 0, bodySkew: 0 });
  const [yellowPos, setYellowPos] = useState({ faceX: 0, faceY: 0, bodySkew: 0 });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiStyles, setConfettiStyles] = useState([]);
  const [successLookY, setSuccessLookY] = useState(-5);

  const isHidingPassword = useMemo(() => passwordLength > 0 && !showPassword, [passwordLength, showPassword]);

  // Confetti logic
  const generateConfetti = useCallback(() => {
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A78BFA', '#FF9B6B', '#6BCB77', '#4D96FF'];
    const styles = Array.from({ length: 180 }, (_, i) => {
      const color = colors[i % colors.length];
      return {
        left: `${Math.random() * 100}%`,
        top: `-${10 + Math.random() * 30}%`,
        backgroundColor: color,
        width: `${4 + Math.random() * 6}px`,
        height: `${8 + Math.random() * 12}px`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${4.5 + Math.random() * 2}s`,
        transform: `rotate(${Math.random() * 360}deg)`,
      };
    });
    requestAnimationFrame(() => {
      setConfettiStyles(styles);
      setShowConfetti(true);
    });
  }, []);

  // Success animation
  useEffect(() => {
    let raf;
    let confettiTimer;

    if (loginSuccess) {
      requestAnimationFrame(() => {
        generateConfetti();
        setSuccessLookY(-5);

        confettiTimer = setTimeout(() => {
          setShowConfetti(false);
          setConfettiStyles([]);
        }, 8000);

        let startTime = performance.now();
        const duration = 5500;
        const startY = -5;
        const endY = 4;

        const step = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

          setSuccessLookY(startY + (endY - startY) * eased);
          if (progress < 1) {
            raf = requestAnimationFrame(step);
          }
        };
        raf = requestAnimationFrame(step);
      });
    } else {
      setTimeout(() => {
        setSuccessLookY(-5);
        setShowConfetti(false);
        setConfettiStyles([]);
      }, 0);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (confettiTimer) clearTimeout(confettiTimer);
    };
  }, [loginSuccess, generateConfetti]);
  // Mouse tracking logic
  const characterCenters = useRef({
    purple: { x: 0, y: 0 },
    black: { x: 0, y: 0 },
    orange: { x: 0, y: 0 },
    yellow: { x: 0, y: 0 }
  });

  const updateCharacterCenters = useCallback(() => {
    if (purpleRef.current) {
      const rect = purpleRef.current.getBoundingClientRect();
      characterCenters.current.purple = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 3 };
    }
    if (blackRef.current) {
      const rect = blackRef.current.getBoundingClientRect();
      characterCenters.current.black = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 3 };
    }
    if (orangeRef.current) {
      const rect = orangeRef.current.getBoundingClientRect();
      characterCenters.current.orange = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 3 };
    }
    if (yellowRef.current) {
      const rect = yellowRef.current.getBoundingClientRect();
      characterCenters.current.yellow = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 3 };
    }
  }, []);

  const calculatePosition = (centerX, centerY, mx, my, rangeX = 15, rangeY = 10, minX = null, maxX = null, minY = null, maxY = null) => {
    const rMinX = minX !== null ? minX : -rangeX;
    const rMaxX = maxX !== null ? maxX : rangeX;
    const rMinY = minY !== null ? minY : -rangeY;
    const rMaxY = maxY !== null ? maxY : rangeY;

    const deltaX = mx - centerX;
    const deltaY = my - centerY;

    const scaleX = Math.max(Math.abs(rMinX), Math.abs(rMaxX));
    const scaleY = Math.max(Math.abs(rMinY), Math.abs(rMaxY));
    const faceX = Math.max(rMinX, Math.min(rMaxX, deltaX / (300 / scaleX)));
    const faceY = Math.max(rMinY, Math.min(rMaxY, deltaY / (300 / scaleY)));
    const bodySkew = Math.max(-6, Math.min(6, -deltaX / 120));

    return { faceX, faceY, bodySkew };
  };

  useEffect(() => {
    let rafId;
    let pendingMouseX = 0;
    let pendingMouseY = 0;
    let needsUpdate = false;

    const handleMouseMove = (e) => {
      pendingMouseX = e.clientX;
      pendingMouseY = e.clientY;
      needsUpdate = true;
    };

    const updatePositions = () => {
      if (needsUpdate && hasEntered) {
        needsUpdate = false;
        setMousePos({ x: pendingMouseX, y: pendingMouseY });
        const { purple, black, orange, yellow } = characterCenters.current;
        setPurplePos(calculatePosition(purple.x, purple.y, pendingMouseX, pendingMouseY, 30, 20));
        setBlackPos(calculatePosition(black.x, black.y, pendingMouseX, pendingMouseY));
        setOrangePos(calculatePosition(orange.x, orange.y, pendingMouseX, pendingMouseY, 0, 0, -46, 20, -18, 20));
        setYellowPos(calculatePosition(yellow.x, yellow.y, pendingMouseX, pendingMouseY));
      }
      rafId = requestAnimationFrame(updatePositions);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', updateCharacterCenters, { passive: true });
    rafId = requestAnimationFrame(updatePositions);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateCharacterCenters);
      cancelAnimationFrame(rafId);
    };
  }, [hasEntered, updateCharacterCenters]);

  // Entrance animation timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
      updateCharacterCenters();
    }, 1400);
    return () => clearTimeout(timer);
  }, [updateCharacterCenters]);

  // Blinking effects
  useEffect(() => {
    const scheduleBlink = (setter) => {
      const interval = Math.random() * 4000 + 3000;
      const timeout = setTimeout(() => {
        setter(true);
        setTimeout(() => {
          setter(false);
          scheduleBlink(setter);
        }, 150);
      }, interval);
      return timeout;
    };

    const purpleT = scheduleBlink(setIsPurpleBlinking);
    const blackT = scheduleBlink(setIsBlackBlinking);
    const orangeT = scheduleBlink(setIsOrangeBlinking);
    const yellowT = scheduleBlink(setIsYellowBlinking);

    return () => {
      clearTimeout(purpleT);
      clearTimeout(blackT);
      clearTimeout(orangeT);
      clearTimeout(yellowT);
    };
  }, []);

  // Interaction logic
  useEffect(() => {
    if (isTyping) {
      setTimeout(() => setIsLookingAtEachOther(true), 0);
      const timer = setTimeout(() => setIsLookingAtEachOther(false), 800);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setIsLookingAtEachOther(false), 0);
    }
  }, [isTyping]);

  useEffect(() => {
    let peekTimeout;
    if (passwordLength > 0 && showPassword && !isPurplePeeking) {
      const interval = Math.random() * 3000 + 2000;
      peekTimeout = setTimeout(() => {
        setIsPurplePeeking(true);
        setTimeout(() => setIsPurplePeeking(false), 800);
      }, interval);
    } else if ((passwordLength === 0 || !showPassword) && isPurplePeeking) {
      setTimeout(() => setIsPurplePeeking(false), 0);
    }
    return () => clearTimeout(peekTimeout);
  }, [passwordLength, showPassword, isPurplePeeking]);

  return (
    <div className="animated-characters-container">
      {/* Confetti */}
      {showConfetti && (
        <div className="confetti-container">
          {confettiStyles.map((style, i) => (
            <div key={i} className="confetti-piece" style={style} />
          ))}
        </div>
      )}

      {/* Purple tall rectangle character */}
      <div
        ref={purpleRef}
        className={`character purple-character ${hasEntered ? 'entrance-complete' : ''}`}
        style={{
          left: '70px',
          width: '180px',
          height: (isTyping || isHidingPassword) ? '440px' : '400px',
          backgroundColor: '#6C3FF5',
          borderRadius: '0',
          zIndex: 1,
          transform: hasEntered
            ? ((passwordLength > 0 && showPassword)
              ? 'skewX(0deg)'
              : (isTyping || isHidingPassword)
                ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(40px)`
                : `skewX(${purplePos.bodySkew || 0}deg)`)
            : undefined,
        }}
      >
        <div
          className="eyes"
          style={{
            left: (passwordLength > 0 && showPassword) ? '50px' : isLookingAtEachOther ? '85px' : `${75 + purplePos.faceX}px`,
            top: (passwordLength > 0 && showPassword) ? '20px' : isLookingAtEachOther ? '50px' : `${25 + purplePos.faceY}px`,
            gap: '32px'
          }}
        >
          <EyeBall
            size={18}
            pupilSize={7}
            maxDistance={5}
            eyeColor="white"
            pupilColor="#2D2D2D"
            isBlinking={isPurpleBlinking}
            mousePos={mousePos}
            forceLookX={loginSuccess ? 0 : (passwordLength > 0 && showPassword) ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
            forceLookY={loginSuccess ? successLookY : (passwordLength > 0 && showPassword) ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined}
          />
          <EyeBall
            size={18}
            pupilSize={7}
            maxDistance={5}
            eyeColor="white"
            pupilColor="#2D2D2D"
            isBlinking={isPurpleBlinking}
            mousePos={mousePos}
            forceLookX={loginSuccess ? 0 : (passwordLength > 0 && showPassword) ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
            forceLookY={loginSuccess ? successLookY : (passwordLength > 0 && showPassword) ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined}
          />
        </div>
        <div
          className={`purple-mouth-shape ${(isTyping || isHidingPassword) && !loginFailed && !loginSuccess ? 'purple-mouth-shape--typing' :
              loginFailed ? 'purple-mouth-shape--sad' :
                loginSuccess ? 'purple-mouth-shape--happy' : ''
            }`}
          style={{
            left: (passwordLength > 0 && showPassword) ? '72px' : isLookingAtEachOther ? '106px' : `${97 + purplePos.faceX}px`,
            top: (passwordLength > 0 && showPassword) ? '57px' : isLookingAtEachOther ? '82px' : `${57 + purplePos.faceY}px`,
            '--counter-skew': (isTyping || isHidingPassword)
              ? `skewX(${-((purplePos.bodySkew || 0) - 12)}deg)`
              : 'skewX(0deg)',
          }}
        />
      </div>

      {/* Black tall rectangle character */}
      <div
        ref={blackRef}
        className={`character black-character ${hasEntered ? 'entrance-complete' : ''}`}
        style={{
          left: '240px',
          width: '120px',
          height: '310px',
          backgroundColor: '#2D2D2D',
          borderRadius: '0',
          zIndex: 2,
          transform: hasEntered
            ? ((passwordLength > 0 && showPassword)
              ? 'skewX(0deg)'
              : isLookingAtEachOther
                ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
                : (isTyping || isHidingPassword)
                  ? `skewX(${(blackPos.bodySkew || 0) * 1.5}deg)`
                  : `skewX(${blackPos.bodySkew || 0}deg)`)
            : undefined,
        }}
      >
        <div
          className="eyes"
          style={{
            left: (passwordLength > 0 && showPassword) ? '10px' : isLookingAtEachOther ? '32px' : `${26 + blackPos.faceX}px`,
            top: (passwordLength > 0 && showPassword) ? '28px' : isLookingAtEachOther ? '12px' : `${32 + blackPos.faceY}px`,
            gap: '24px'
          }}
        >
          <EyeBall
            size={16}
            pupilSize={6}
            maxDistance={4}
            eyeColor="white"
            pupilColor="#2D2D2D"
            isBlinking={isBlackBlinking}
            isSad={loginFailed}
            sadRotate={-20}
            mousePos={mousePos}
            forceLookX={loginSuccess ? 0 : (passwordLength > 0 && showPassword) ? -4 : isLookingAtEachOther ? 0 : undefined}
            forceLookY={loginSuccess ? successLookY : (passwordLength > 0 && showPassword) ? -4 : isLookingAtEachOther ? -4 : undefined}
          />
          <EyeBall
            size={16}
            pupilSize={6}
            maxDistance={4}
            eyeColor="white"
            pupilColor="#2D2D2D"
            isBlinking={isBlackBlinking}
            isSad={loginFailed}
            sadRotate={20}
            mousePos={mousePos}
            forceLookX={loginSuccess ? 0 : (passwordLength > 0 && showPassword) ? -4 : isLookingAtEachOther ? 0 : undefined}
            forceLookY={loginSuccess ? successLookY : (passwordLength > 0 && showPassword) ? -4 : isLookingAtEachOther ? -4 : undefined}
          />
        </div>
      </div>

      {/* Orange semi-circle character */}
      <div
        ref={orangeRef}
        className={`character orange-character ${hasEntered ? 'entrance-complete' : ''}`}
        style={{
          left: '0px',
          width: '240px',
          height: '150px',
          zIndex: 3,
          backgroundColor: '#FF9B6B',
          borderRadius: '120px 120px 0 0',
          transform: hasEntered
            ? ((passwordLength > 0 && showPassword) ? 'skewX(0deg)' : `skewX(${orangePos.bodySkew || 0}deg)`)
            : undefined,
        }}
      >
        <div
          className="eyes"
          style={{
            left: (passwordLength > 0 && showPassword) ? '80px' : `${112 + orangePos.faceX}px`,
            top: (passwordLength > 0 && showPassword) ? '55px' : `${60 + orangePos.faceY}px`,
            gap: '32px'
          }}
        >
          <Pupil
            size={12}
            maxDistance={5}
            pupilColor="#2D2D2D"
            isBlinking={isOrangeBlinking}
            mousePos={mousePos}
            forceLookX={loginSuccess ? 0 : (passwordLength > 0 && showPassword) ? -5 : undefined}
            forceLookY={loginSuccess ? successLookY : (passwordLength > 0 && showPassword) ? -4 : undefined}
          />
          <Pupil
            size={12}
            maxDistance={5}
            pupilColor="#2D2D2D"
            isBlinking={isOrangeBlinking}
            mousePos={mousePos}
            forceLookX={loginSuccess ? 0 : (passwordLength > 0 && showPassword) ? -5 : undefined}
            forceLookY={loginSuccess ? successLookY : (passwordLength > 0 && showPassword) ? -4 : undefined}
          />
        </div>
        <div
          className={`orange-mouth-shape ${(isTyping || isHidingPassword) && !loginFailed && !loginSuccess ? 'orange-mouth-shape--typing' :
              loginFailed ? 'orange-mouth-shape--sad' :
                loginSuccess ? 'orange-mouth-shape--happy' : ''
            }`}
          style={{
            left: (passwordLength > 0 && showPassword) ? '94px' : `${126 + orangePos.faceX}px`,
            top: (passwordLength > 0 && showPassword) ? '87px' : `${92 + orangePos.faceY}px`,
          }}
        />
      </div>

      {/* Yellow tall rectangle character */}
      <div
        ref={yellowRef}
        className={`character yellow-character ${hasEntered ? 'entrance-complete' : ''}`}
        style={{
          left: '310px',
          width: '140px',
          height: '230px',
          backgroundColor: '#E8D754',
          borderRadius: '70px 70px 0 0',
          zIndex: 4,
          transform: hasEntered
            ? ((passwordLength > 0 && showPassword) ? 'skewX(0deg)' : `skewX(${yellowPos.bodySkew || 0}deg)`)
            : undefined,
        }}
      >
        <div
          className="eyes"
          style={{
            left: (passwordLength > 0 && showPassword) ? '20px' : `${52 + yellowPos.faceX}px`,
            top: (passwordLength > 0 && showPassword) ? '35px' : `${40 + yellowPos.faceY}px`,
            gap: '24px'
          }}
        >
          <Pupil
            size={12}
            maxDistance={5}
            pupilColor="#2D2D2D"
            isBlinking={isYellowBlinking}
            mousePos={mousePos}
            forceLookX={loginSuccess ? 0 : (passwordLength > 0 && showPassword) ? -5 : undefined}
            forceLookY={loginSuccess ? successLookY : (passwordLength > 0 && showPassword) ? -4 : undefined}
          />
          <Pupil
            size={12}
            maxDistance={5}
            pupilColor="#2D2D2D"
            isBlinking={isYellowBlinking}
            mousePos={mousePos}
            forceLookX={loginSuccess ? 0 : (passwordLength > 0 && showPassword) ? -5 : undefined}
            forceLookY={loginSuccess ? successLookY : (passwordLength > 0 && showPassword) ? -4 : undefined}
          />
        </div>
        <div
          className="yellow-mouth-wrapper"
          style={{
            left: (passwordLength > 0 && showPassword) ? '10px' : `${40 + yellowPos.faceX}px`,
            top: (passwordLength > 0 && showPassword) ? '88px' : `${88 + yellowPos.faceY}px`,
          }}
        >
          <svg width="80" height="20" viewBox="0 0 80 20">
            <path
              className={`yellow-mouth-path ${loginFailed ? 'yellow-mouth-path--wavy' : loginSuccess ? 'yellow-mouth-path--happy' : ''}`}
              stroke="#2D2D2D"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCharacters;
