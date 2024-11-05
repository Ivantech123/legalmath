import React, { Suspense } from 'react';
import { Scale } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { RoleProvider } from './context/RoleContext';
import { OnboardingProvider } from './components/onboarding/OnboardingProvider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Feed from './components/Feed';
import LoadingScreen from './components/LoadingScreen';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import LandingPage from './components/landing/LandingPage';
import ProfileCompletion from './components/profile/ProfileCompletion';

const App = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  // If no user, show landing page
  if (!user) {
    return <LandingPage />;
  }

  // If user hasn't completed their profile, show profile completion
  if (!user.profileCompleted) {
    return <ProfileCompletion />;
  }

  return (
    <Router>
      <OnboardingProvider>
        <div className="min-h-screen bg-gray-900">
          <ErrorBoundary>
            <Navbar />
          </ErrorBoundary>
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/feed" element={<Feed />} />
            </Routes>
          </main>
        </div>
      </OnboardingProvider>
    </Router>
  );
};

const AppWrapper = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <RoleProvider>
              <App />
            </RoleProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default AppWrapper;