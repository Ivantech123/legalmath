import React, { createContext, useContext, useState, useEffect } from 'react';
import OnboardingGuide from './OnboardingGuide';
import MobileAppPromo from './MobileAppPromo';
import { useAuth } from '../../context/AuthContext';
import { isMobile } from '../../utils/deviceDetection';

interface OnboardingContextType {
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType>({
  showOnboarding: false,
  setShowOnboarding: () => {},
  completeOnboarding: () => {},
  resetOnboarding: () => {}
});

export const useOnboarding = () => useContext(OnboardingContext);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showMobilePromo, setShowMobilePromo] = useState(false);

  useEffect(() => {
    if (user) {
      const isMobileDevice = isMobile();
      const mobilePromoShown = localStorage.getItem('mobilePromoShown');
      const onboardingCompleted = localStorage.getItem('onboardingCompleted');

      if (isMobileDevice && !mobilePromoShown) {
        setShowMobilePromo(true);
      } else if (!onboardingCompleted) {
        // Небольшая задержка, чтобы дать время для рендеринга UI
        const timer = setTimeout(() => {
          setShowOnboarding(true);
        }, 1000);

        return () => clearTimeout(timer);
      }
    }
  }, [user]);

  const completeOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('onboardingCompleted', 'true');
  };

  const resetOnboarding = () => {
    localStorage.removeItem('onboardingCompleted');
    localStorage.removeItem('mobilePromoShown');
    
    if (isMobile()) {
      setShowMobilePromo(true);
    } else {
      setShowOnboarding(true);
    }
  };

  return (
    <OnboardingContext.Provider 
      value={{ 
        showOnboarding, 
        setShowOnboarding, 
        completeOnboarding,
        resetOnboarding
      }}
    >
      {children}
      {showOnboarding && user && !isMobile() && <OnboardingGuide />}
      {showMobilePromo && user && <MobileAppPromo />}
    </OnboardingContext.Provider>
  );
};

export default OnboardingProvider;