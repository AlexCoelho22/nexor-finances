import { Asset, PaymentFrequency } from '../types';

export class AssetCalculations {
  
  // Total Investido = quantidade × preço médio
  static getTotalInvested(asset: Asset): number {
    return asset.quantity * asset.avgPrice;
  }
  
  // Valor Atual = quantidade × preço atual
  static getCurrentValue(asset: Asset): number {
    return asset.quantity * asset.currentPrice;
  }
  
  // Lucro/Prejuízo Absoluto
  static getProfitLossAbsolute(asset: Asset): number {
    return this.getCurrentValue(asset) - this.getTotalInvested(asset);
  }
  
  // Lucro/Prejuízo %
  static getProfitLossPercentage(asset: Asset): number {
    const totalInvested = this.getTotalInvested(asset);
    if (totalInvested === 0) return 0;
    return (this.getProfitLossAbsolute(asset) / totalInvested) * 100;
  }
  
  // Renda Mensal
  static getMonthlyIncome(asset: Asset): number {
    switch (asset.paymentFrequency) {
      case PaymentFrequency.MONTHLY:
        return asset.quantity * asset.dividendPerShare;
      case PaymentFrequency.QUARTERLY:
        return (asset.quantity * asset.dividendPerShare) / 3;
      case PaymentFrequency.SEMIANNUAL:
        return (asset.quantity * asset.dividendPerShare) / 6;
      case PaymentFrequency.ANNUAL:
        return (asset.quantity * asset.dividendPerShare) / 12;
      default:
        return 0;
    }
  }
  
  // Renda Anual
  static getAnnualIncome(asset: Asset): number {
    return this.getMonthlyIncome(asset) * 12;
  }
  
  // Dividend Yield %
  static getDividendYield(asset: Asset): number {
    if (asset.currentPrice === 0) return 0;
    
    let annualDividend = 0;
    switch (asset.paymentFrequency) {
      case PaymentFrequency.MONTHLY:
        annualDividend = asset.dividendPerShare * 12;
        break;
      case PaymentFrequency.QUARTERLY:
        annualDividend = asset.dividendPerShare * 4;
        break;
      case PaymentFrequency.SEMIANNUAL:
        annualDividend = asset.dividendPerShare * 2;
        break;
      case PaymentFrequency.ANNUAL:
        annualDividend = asset.dividendPerShare;
        break;
    }
    
    return (annualDividend / asset.currentPrice) * 100;
  }
}

export class Formatter {
  
  static currency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }
  
  static percentage(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value / 100);
  }
  
  static number(value: number, decimals: number = 2): string {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  }
  
  static date(timestamp: number): string {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(timestamp));
  }
}

export class UserLevel {
  
  static getLevelName(level: number): string {
    switch (level) {
      case 1: return 'Iniciante';
      case 2: return 'Operador';
      case 3: return 'Estrategista';
      case 4: return 'Dominador';
      case 5: return 'NΞXOR Elite';
      default: return 'Desconhecido';
    }
  }
  
  static getNextLevelPoints(level: number): number {
    switch (level) {
      case 1: return 100;
      case 2: return 300;
      case 3: return 600;
      case 4: return 1000;
      case 5: return Infinity;
      default: return 100;
    }
  }
  
  static getPreviousLevelPoints(level: number): number {
    switch (level) {
      case 1: return 0;
      case 2: return 100;
      case 3: return 300;
      case 4: return 600;
      case 5: return 1000;
      default: return 0;
    }
  }
  
  static getProgressToNextLevel(points: number, level: number): number {
    if (level >= 5) return 100;
    
    const nextLevel = this.getNextLevelPoints(level);
    const previousLevel = this.getPreviousLevelPoints(level);
    const range = nextLevel - previousLevel;
    const progress = points - previousLevel;
    
    return range > 0 ? (progress / range) * 100 : 0;
  }
  
  static checkLevelUp(points: number, currentLevel: number): number {
    let level = currentLevel;
    while (points >= this.getNextLevelPoints(level) && level < 5) {
      level++;
    }
    return level;
  }
}

export class GoalCalculations {
  
  static getProgress(currentValue: number, targetValue: number): number {
    if (targetValue === 0) return 0;
    return Math.min((currentValue / targetValue) * 100, 100);
  }
  
  static getMonthsRemaining(deadline: number): number {
    const now = Date.now();
    const millisecondsRemaining = deadline - now;
    const daysRemaining = millisecondsRemaining / (1000 * 60 * 60 * 24);
    return Math.max(Math.floor(daysRemaining / 30), 0);
  }
  
  static getMonthlyNeeded(currentValue: number, targetValue: number, deadline: number): number {
    const remaining = targetValue - currentValue;
    const monthsRemaining = this.getMonthsRemaining(deadline);
    
    if (monthsRemaining <= 0 || remaining <= 0) return 0;
    return remaining / monthsRemaining;
  }
}

export function hashPassword(password: string): string {
  // Simple hash for demo - in production use proper crypto
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
