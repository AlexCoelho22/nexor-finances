export interface User {
  id: string;
  email: string;
  passwordHash: string;
  pin?: string;
  nexorPoints: number;
  level: number;
  lastActivityAt: number;
  lastWeeklyUpdate: number;
  consecutiveDaysWithoutWithdrawal: number;
}

export enum AssetType {
  BRAZILIAN_STOCK = 'BRAZILIAN_STOCK',
  FII = 'FII',
  BITCOIN = 'BITCOIN',
  CRYPTO = 'CRYPTO'
}

export enum PaymentFrequency {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  SEMIANNUAL = 'SEMIANNUAL',
  ANNUAL = 'ANNUAL'
}

export interface Asset {
  id: string;
  name: string;
  ticker: string;
  type: AssetType;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  dividendPerShare: number;
  paymentFrequency: PaymentFrequency;
  paymentMonths: number[]; // [1,4,7,10]
  notes: string;
  createdAt: number;
  lastUpdated: number;
}

export interface Goal {
  id: string;
  userId: string;
  name: string;
  targetValue: number;
  deadline: number;
  currentValue: number;
  createdAt: number;
}

export interface Lesson {
  id: number;
  title: string;
  content: string;
  xpReward: number;
  order: number;
}

export interface LessonProgress {
  lessonId: number;
  completed: boolean;
  completedAt?: number;
}

export interface DividendPayment {
  assetId: string;
  assetName: string;
  ticker: string;
  month: number;
  year: number;
  estimatedValue: number;
  paymentDate: number;
}
