export type League = 'bronze' | 'silver' | 'gold' | 'diamond' | 'platinum';

export interface User {
  id: string;
  email: string;
  name?: string;
  username?: string;
  role: 'user' | 'admin';
  league?: League;
  isVerified: boolean;
  avatarUrl?: string;
  referralCode?: string;
  referredById?: string;
  totalEarnings?: number;
  nc?: number;
  level?: number;
  streak?: number;
  badges?: string[];
  leaderboardRank?: number;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}
