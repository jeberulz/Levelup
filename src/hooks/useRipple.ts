import { useCallback, useRef } from 'react';

interface RippleOptions {
  color?: string;
  duration?: number;
}

export function useRipple(options: RippleOptions = {}) {
  const { color = 'rgba(255, 255, 255, 0.5)', duration = 400 } = options;
  const rippleRef = useRef<HTMLSpanElement | null>(null);

  const createRipple = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    // Remove existing ripple if any
    const existingRipple = button.querySelector('.ripple-effect');
    if (existingRipple) {
      existingRipple.remove();
    }

    // Create ripple element
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${color};
      left: ${x}px;
      top: ${y}px;
      transform: scale(0);
      animation: ripple-animation ${duration}ms ease-out;
      pointer-events: none;
    `;

    // Add animation keyframes if not already added
    if (!document.getElementById('ripple-keyframes')) {
      const style = document.createElement('style');
      style.id = 'ripple-keyframes';
      style.textContent = `
        @keyframes ripple-animation {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ripple-effect {
            animation: none !important;
            opacity: 0 !important;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Ensure button has relative positioning
    const buttonPosition = window.getComputedStyle(button).position;
    if (buttonPosition === 'static') {
      button.style.position = 'relative';
    }
    button.style.overflow = 'hidden';

    button.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, duration);
  }, [color, duration]);

  return createRipple;
}

