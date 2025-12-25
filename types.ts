
export enum Language {
  EN = 'en',
  HI = 'hi',
  ES = 'es',
  FR = 'fr'
}

export enum Currency {
  USD = 'USD',
  INR = 'INR',
  EUR = 'EUR',
  GBP = 'GBP'
}

export interface UserProfile {
  name: string;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  income: number;
  incomeType: 'Student' | 'Professional' | 'Business' | 'Freelancer';
  preferences: string[];
  country: string;
  language: Language;
  currency: Currency;
  isDarkMode: boolean;
  cibilScore: number;
}

export interface TransactionRecord {
  id: string;
  type: 'income' | 'expense' | 'transfer';
  category: string;
  amount: number;
  date: string;
  description: string;
  impactsSavingsId?: string;
}

export interface SavingGoal {
  id: string;
  name: string;
  purpose: 'School Fee' | 'Household' | 'Emergency' | 'Investment' | 'Travel';
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  isReminderActive?: boolean;
  isRecoveryMode?: boolean;
}

export type FeatureType = 
  | 'side-income' 
  | 'tickets' 
  | 'groceries' 
  | 'ai-advisor' 
  | 'settings' 
  | 'dashboard' 
  | 'health-checkup'
  | 'transaction'
  | 'savings'
  | 'loan'
  | 'emi'
  | 'transfer'
  | 'reminders';
