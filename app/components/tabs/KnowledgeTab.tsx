'use client';

import { useState, useEffect } from 'react';
import { LocalStorage } from '../../lib/storage';
import { LESSONS } from '../../lib/lessons';
import { UserLevel } from '../../lib/utils';

interface KnowledgeTabProps {
  user: any;
  setUser: (user: any) => void;
}

export default function KnowledgeTab({ user, setUser }: KnowledgeTabProps) {
  const [progress, setProgress] = useState<any[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);

  useEffect(() => {
    setProgress(LocalStorage.getLessonProgress());
  }, []);

  const isCompleted = (lessonId: number) => {
    return progress.some(p => p.lessonId === lessonId && p.completed);
  };

  const handleComplete = (lesson: any) => {
    if (isCompleted(lesson.id)) return;

    const newProgress = [...progress, { lessonId: lesson.id, completed: true, completedAt: Date.now() }];
    LocalStorage.saveLessonProgress(newProgress);
    setProgress(newProgress);

    // Award XP
    if (user) {
      const updatedUser = { ...user, nexorPoints: user.nexorPoints + lesson.xpReward };
      updatedUser.level = UserLevel.checkLevelUp(updatedUser.nexorPoints, updatedUser.level);
      LocalStorage.saveUser(updatedUser);
      setUser(updatedUser);
      alert(`Aula concluída! +${lesson.xpReward} XP`);
    }

    setSelectedLesson(null);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Base de Conhecimento</h2>

      {LESSONS.map(lesson => {
        const completed = isCompleted(lesson.id);
        return (
          <div 
            key={lesson.id}
            onClick={() => setSelectedLesson(lesson)}
            className="nexor-card cursor-pointer hover:bg-opacity-80 transition-all flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{lesson.title}</h3>
              <p className="text-sm text-electric-purple">+{lesson.xpReward} XP</p>
            </div>
            {completed && <span className="text-2xl text-green-500">✓</span>}
          </div>
        );
      })}

      {selectedLesson && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={() => setSelectedLesson(null)}>
          <div className="bg-card-bg rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">{selectedLesson.title}</h2>
            <div className="prose prose-invert text-light-gray whitespace-pre-line mb-6">
              {selectedLesson.content}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setSelectedLesson(null)} className="nexor-button flex-1">
                Fechar
              </button>
              {!isCompleted(selectedLesson.id) && (
                <button onClick={() => handleComplete(selectedLesson)} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-2xl flex-1">
                  Concluir Aula
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
