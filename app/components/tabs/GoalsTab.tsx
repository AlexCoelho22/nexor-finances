'use client';

import { useState, useEffect } from 'react';
import { LocalStorage } from '../../lib/storage';
import { Goal } from '../../types';
import { GoalCalculations, Formatter, generateId } from '../../lib/utils';

interface GoalsTabProps {
  user: any;
}

export default function GoalsTab({ user }: GoalsTabProps) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    setGoals(LocalStorage.getGoals());
  }, []);

  const handleAddGoal = (goalData: any) => {
    const newGoal: Goal = {
      ...goalData,
      id: generateId(),
      userId: user?.id || 'default',
      currentValue: 0,
      createdAt: Date.now()
    };

    const updatedGoals = [...goals, newGoal];
    LocalStorage.saveGoals(updatedGoals);
    setGoals(updatedGoals);
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Excluir esta meta?')) {
      const updatedGoals = goals.filter(g => g.id !== id);
      LocalStorage.saveGoals(updatedGoals);
      setGoals(updatedGoals);
    }
  };

  return (
    <div className="space-y-4">
      <button onClick={() => setShowAddModal(true)} className="nexor-button w-full">
        Criar Meta
      </button>

      {goals.map(goal => {
        const progress = GoalCalculations.getProgress(goal.currentValue, goal.targetValue);
        return (
          <div key={goal.id} className="nexor-card">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold">{goal.name}</h3>
              <button onClick={() => handleDelete(goal.id)} className="text-red-500 text-sm">Excluir</button>
            </div>

            <p className="text-sm text-light-gray mb-2">Meta: {Formatter.currency(goal.targetValue)}</p>

            <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
              <div 
                className="bg-electric-purple h-4 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-sm text-electric-purple mb-2">{progress.toFixed(1)}%</p>

            <div className="text-xs text-light-gray space-y-1">
              <p>Necessário/mês: {Formatter.currency(GoalCalculations.getMonthlyNeeded(goal.currentValue, goal.targetValue, goal.deadline))}</p>
              <p>Faltam {GoalCalculations.getMonthsRemaining(goal.deadline)} meses</p>
            </div>
          </div>
        );
      })}

      {goals.length === 0 && (
        <div className="nexor-card text-center py-8 text-light-gray">
          Nenhuma meta criada. Defina seus objetivos financeiros!
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={() => setShowAddModal(false)}>
          <AddGoalModal onClose={() => setShowAddModal(false)} onAdd={handleAddGoal} />
        </div>
      )}
    </div>
  );
}

function AddGoalModal({ onClose, onAdd }: { onClose: () => void, onAdd: (goal: any) => void }) {
  const [name, setName] = useState('');
  const [targetValue, setTargetValue] = useState(0);
  const [months, setMonths] = useState(12);

  const handleSubmit = () => {
    if (!name || targetValue <= 0) {
      alert('Preencha todos os campos');
      return;
    }

    const deadline = Date.now() + (months * 30 * 24 * 60 * 60 * 1000);
    onAdd({ name, targetValue, deadline });
  };

  return (
    <div className="bg-card-bg rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
      <h2 className="text-2xl font-bold mb-4">Criar Meta</h2>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Nome da Meta"
          value={name}
          onChange={e => setName(e.target.value)}
          className="nexor-input w-full"
        />

        <input
          type="number"
          placeholder="Valor Alvo"
          value={targetValue || ''}
          onChange={e => setTargetValue(parseFloat(e.target.value) || 0)}
          className="nexor-input w-full"
        />

        <input
          type="number"
          placeholder="Prazo (meses)"
          value={months}
          onChange={e => setMonths(parseInt(e.target.value) || 12)}
          className="nexor-input w-full"
        />

        <div className="flex gap-2">
          <button onClick={handleSubmit} className="nexor-button flex-1">Salvar</button>
          <button onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-2xl flex-1">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
