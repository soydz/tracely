export interface User {
    email: string;
    username: string;
    userId: number;
    fullName: string;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (user: User) => void;
    logout: () => void;
}
