'use client';

import { UserLevel } from '../../lib/utils';

interface DisciplineTabProps {
  user: any;
}

export default function DisciplineTab({ user }: DisciplineTabProps) {
  if (!user) return <div>Carregando...</div>;

  const progress = UserLevel.getProgressToNextLevel(user.nexorPoints, user.level);

  return (
    <div className="space-y-4">
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold text-electric-purple purple-glow mb-2">NΞXOR Points</h2>
        <p className="text-6xl font-bold mb-4">{user.nexorPoints}</p>
        <p className="text-xl text-light-gray">Nível {user.level}: {UserLevel.getLevelName(user.level)}</p>
      </div>

      <div className="nexor-card">
        <p className="text-sm text-light-gray mb-2">Progresso para Próximo Nível</p>
        <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
          <div 
            className="bg-electric-purple h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-light-gray">
          {user.nexorPoints} / {UserLevel.getNextLevelPoints(user.level)} points
        </p>
      </div>

      <div className="nexor-card">
        <h3 className="font-semibold mb-3">Como Ganhar Points</h3>
        <ul className="space-y-2 text-sm text-light-gray">
          <li>• Adicionar investimento: +10 XP</li>
          <li>• Atualizar carteira semanalmente: +15 XP</li>
          <li>• Completar aula: +20-30 XP</li>
          <li>• 30 dias sem retirada: +50 XP</li>
        </ul>
      </div>
    </div>
  );
}
