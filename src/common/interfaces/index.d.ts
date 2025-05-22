// Global type definitions

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  meta?: Record<string, any>;
}

// Trial types that match the existing trial-table component
export interface TrialData {
  id: number;
  name: string;
  status: string;
  date: string;
  value: number;
}

// Add more global types as needed
