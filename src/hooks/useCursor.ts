import { useState, useEffect } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

interface UseCursorReturn {
  position: CursorPosition;
  isVisible: boolean;
  isClicking: boolean;
}

export const useCursor = (): UseCursorReturn => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Only add cursor tracking on desktop
    const isDesktop = window.innerWidth > 768;
    
    if (isDesktop) {
      document.addEventListener('mousemove', updateCursorPosition);
      document.addEventListener('mouseenter', handleMouseEnter);
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      if (isDesktop) {
        document.removeEventListener('mousemove', updateCursorPosition);
        document.removeEventListener('mouseenter', handleMouseEnter);
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, []);

  return { position, isVisible: isVisible && window.innerWidth > 768, isClicking };
};