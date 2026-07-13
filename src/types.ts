// src/types.ts
export interface Expense {
  id: string;
  user_id: string;
  amount: number;
  description: string;
  created_at: string;
}

export interface Income {
  id: string;
  user_id: string;
  amount: number;
  source: string;
  created_at: string;
}

export interface Holding {
  id: string;
  user_id: string;
  symbol: string;
  shares: number;
  bought_at: number; // price per share at purchase
  created_at: string;
}
