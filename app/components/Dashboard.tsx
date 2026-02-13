'use client';

import { useState, useEffect } from 'react';
import { LocalStorage } from '../lib/storage';
import DashboardTab from './tabs/DashboardTab';
import AssetsTab from './tabs/AssetsTab';
import PassiveIncomeTab from './tabs/PassiveIncomeTab';
import DisciplineTab from './tabs/DisciplineTab';
import KnowledgeTab from './tabs/KnowledgeTab';
import GoalsTab from './tabs/GoalsTab';

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const loadedUser = LocalStorage.getUser();
    setUser(loadedUser);

    // Check online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleLogout = () => {
    LocalStorage.setLoggedIn(false);
    onLogout();
  };

  const tabs = [
    { name: 'Dashboard', component: DashboardTab },
    { name: 'Ativos', component: AssetsTab },
    { name: 'Renda', component: PassiveIncomeTab },
    { name: 'Disciplina', component: DisciplineTab },
    { name: 'Conhecimento', component: KnowledgeTab },
    { name: 'Metas', component: GoalsTab }
  ];

  const ActiveComponent = tabs[activeTab].component;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card-bg px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-bold text-electric-purple">NΞXOR FINANCE</h1>
        <div className="flex items-center gap-4">
          <span className={`text-xs ${isOnline ? 'text-green-500' : 'text-yellow-500'}`}>
            ● {isOnline ? 'Online' : 'Offline'}
          </span>
          <button onClick={handleLogout} className="text-light-gray hover:text-white text-sm">
            Sair
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-card-bg px-2 py-2 overflow-x-auto flex gap-1 sticky top-[60px] z-10">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              activeTab === index
                ? 'bg-electric-purple text-white'
                : 'text-light-gray hover:text-white'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4">
        <ActiveComponent user={user} setUser={setUser} />
      </div>
    </div>
  );
}
