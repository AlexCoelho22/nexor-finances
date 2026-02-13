'use client';

// Sistema de armazenamento local - salva na memória do celular
export class LocalStorage {
  
  // Usuário
  static saveUser(user: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nexor_user', JSON.stringify(user));
    }
  }

  static getUser() {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('nexor_user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  static clearUser() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nexor_user');
    }
  }

  // Ativos
  static saveAssets(assets: any[]) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nexor_assets', JSON.stringify(assets));
    }
  }

  static getAssets(): any[] {
    if (typeof window !== 'undefined') {
      const assets = localStorage.getItem('nexor_assets');
      return assets ? JSON.parse(assets) : [];
    }
    return [];
  }

  // Metas
  static saveGoals(goals: any[]) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nexor_goals', JSON.stringify(goals));
    }
  }

  static getGoals(): any[] {
    if (typeof window !== 'undefined') {
      const goals = localStorage.getItem('nexor_goals');
      return goals ? JSON.parse(goals) : [];
    }
    return [];
  }

  // Progresso das aulas
  static saveLessonProgress(progress: any[]) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nexor_lesson_progress', JSON.stringify(progress));
    }
  }

  static getLessonProgress(): any[] {
    if (typeof window !== 'undefined') {
      const progress = localStorage.getItem('nexor_lesson_progress');
      return progress ? JSON.parse(progress) : [];
    }
    return [];
  }

  // Login state
  static setLoggedIn(value: boolean) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nexor_logged_in', value.toString());
    }
  }

  static isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nexor_logged_in') === 'true';
    }
    return false;
  }

  // Limpar todos os dados
  static clearAll() {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  }
}
