'use client';

import { useState } from 'react';
import { LocalStorage } from '../lib/storage';
import { hashPassword, generateId } from '../lib/utils';
import { LESSONS } from '../lib/lessons';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [isCreate, setIsCreate] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  
  // Easter egg state
  const [easterEggClicks, setEasterEggClicks] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }

    const user = LocalStorage.getUser();
    
    if (!user) {
      setError('Usuário não encontrado. Crie uma conta.');
      return;
    }

    const passwordHash = hashPassword(password);
    if (user.email === email && user.passwordHash === passwordHash) {
      LocalStorage.setLoggedIn(true);
      onLogin();
    } else {
      setError('Email ou senha incorretos');
    }
  };

  const handleCreate = () => {
    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }

    if (!email.includes('@')) {
      setError('Email inválido');
      return;
    }

    if (password.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (pin && pin.length !== 4) {
      setError('PIN deve ter 4 dígitos');
      return;
    }

    const existingUser = LocalStorage.getUser();
    if (existingUser && existingUser.email === email) {
      setError('Email já cadastrado');
      return;
    }

    const newUser = {
      id: generateId(),
      email,
      passwordHash: hashPassword(password),
      pin: pin ? hashPassword(pin) : undefined,
      nexorPoints: 0,
      level: 1,
      lastActivityAt: Date.now(),
      lastWeeklyUpdate: 0,
      consecutiveDaysWithoutWithdrawal: 0
    };

    LocalStorage.saveUser(newUser);
    LocalStorage.saveLessonProgress([]);
    LocalStorage.setLoggedIn(true);
    onLogin();
  };

  const handleTitleClick = () => {
    const now = Date.now();
    
    // Reset se passou mais de 2 segundos
    if (now - lastClickTime > 2000) {
      setEasterEggClicks(1);
    } else {
      setEasterEggClicks(prev => prev + 1);
    }
    
    setLastClickTime(now);
    
    // Ativar easter egg após 10 cliques
    if (easterEggClicks + 1 >= 10) {
      setShowEasterEgg(true);
      setEasterEggClicks(0);
      
      // Auto-fechar após 5 segundos
      setTimeout(() => {
        setShowEasterEgg(false);
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 
            onClick={handleTitleClick}
            className="text-4xl font-bold text-electric-purple purple-glow mb-2 cursor-pointer select-none"
          >
            NΞXOR FINANCE
          </h1>
          <p className="text-light-gray">{isCreate ? 'Criar Conta' : 'Entrar'}</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-500 rounded-xl px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="nexor-input w-full"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="nexor-input w-full"
          />

          {isCreate && (
            <input
              type="password"
              placeholder="PIN (4 dígitos) - Opcional"
              value={pin}
              onChange={(e) => setPin(e.target.value.slice(0, 4))}
              maxLength={4}
              className="nexor-input w-full"
            />
          )}

          <button
            onClick={isCreate ? handleCreate : handleLogin}
            className="nexor-button w-full"
          >
            {isCreate ? 'Criar' : 'Entrar'}
          </button>

          <button
            onClick={() => {
              setIsCreate(!isCreate);
              setError('');
            }}
            className="w-full text-electric-purple hover:text-white transition-colors py-2"
          >
            {isCreate ? 'Já tenho conta' : 'Criar conta'}
          </button>
        </div>
      </div>

      {/* Easter Egg Overlay */}
      {showEasterEgg && (
        <div 
          className="fixed inset-0 bg-background flex items-center justify-center z-50"
          style={{ animation: 'fadeIn 0.5s ease-in, fadeOut 0.5s ease-out 4.5s' }}
        >
          <div className="text-center px-8">
            <p className="text-3xl font-bold text-electric-purple purple-glow">
              Criado por Alex Coelho!!
              <br />
              Aproveite o app!!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
