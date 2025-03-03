export interface User {
    id: string;
    username: string;
    email: string;
  }
  
  export interface Task {
    _id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: string;
  }
  
  export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
  }