'use client';

import { useEffect, useState } from 'react';
import { LocalStorage } from './lib/storage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Registrar service worker para PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
    }

    // Splash screen
    const timer = setTimeout(() => {
      const loggedIn = LocalStorage.isLoggedIn();
      setIsLoggedIn(loggedIn);
      setShowSplash(false);
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center fade-in">
          <h1 className="text-5xl font-bold text-electric-purple purple-glow mb-4">
            NΞXOR FINANCE
          </h1>
          <p className="text-light-gray text-lg">
            Disciplina. Estratégia. Longo Prazo.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="min-h-screen bg-background" />;
  }

  return isLoggedIn ? (
    <Dashboard onLogout={() => setIsLoggedIn(false)} />
  ) : (
    <Login onLogin={() => setIsLoggedIn(true)} />
  );
}
