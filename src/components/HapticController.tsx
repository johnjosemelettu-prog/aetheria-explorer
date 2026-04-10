
import { useEffect } from 'react';

// Mock haptic feedback function
const triggerHaptic = (pattern: 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning') => {
  if (window.navigator.vibrate) {
    console.log(`Triggering haptic feedback: ${pattern}`);
    switch (pattern) {
      case 'light':
        window.navigator.vibrate(50);
        break;
      case 'medium':
        window.navigator.vibrate(100);
        break;
      case 'heavy':
        window.navigator.vibrate(200);
        break;
      case 'success':
        window.navigator.vibrate([50, 50, 50]);
        break;
      case 'error':
        window.navigator.vibrate([100, 50, 100]);
        break;
      case 'warning':
        window.navigator.vibrate([50, 50, 100]);
        break;
      default:
        break;
    }
  } else {
    console.log("Haptic feedback not supported.");
  }
};

const HapticController = () => {
  useEffect(() => {
    const handleHapticEvent = (event: CustomEvent) => {
      triggerHaptic(event.detail.pattern);
    };

    window.addEventListener('haptic', handleHapticEvent as EventListener);

    return () => {
      window.removeEventListener('haptic', handleHapticEvent as EventListener);
    };
  }, []);

  return null; // This component does not render anything
};

export const emitHapticEvent = (pattern: 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning') => {
    const event = new CustomEvent('haptic', { detail: { pattern } });
    window.dispatchEvent(event);
}

export default HapticController;
