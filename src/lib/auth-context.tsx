'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import toast from 'react-hot-toast';

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

interface ErrorResponse {
  success: false;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = 'https://inoya-back-production.up.railway.app/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  const clearTokens = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    setUser(null);
  }, []);

  const fetchUserProfile = useCallback(
    async (userId?: string): Promise<User | null> => {
      const token = localStorage.getItem('accessToken');
      if (!token) return null;

      // Get user ID from parameter, localStorage, or JWT token
      let userIdToUse = userId || localStorage.getItem('userId');

      if (!userIdToUse) {
        try {
          // Decode JWT to get user ID (simple base64 decode of payload)
          const tokenParts = token.split('.');
          if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            userIdToUse = payload.userId || payload.id || payload.sub;
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          return null;
        }
      }

      if (!userIdToUse) {
        console.error('No user ID available for profile fetch');
        return null;
      }

      try {
        console.log('Fetching user profile for ID:', userIdToUse);
        const response = await fetch(`${API_BASE_URL}/users/${userIdToUse}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error('Profile fetch failed with status:', response.status);
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        console.log('Profile fetch response:', data);

        if (data.success && data.data && data.data.user) {
          return data.data.user;
        }
        return null;
      } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }
    },
    []
  );

  const refreshToken = useCallback(async (): Promise<void> => {
    const refreshTokenValue = localStorage.getItem('refreshToken');

    if (!refreshTokenValue) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/users/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: refreshTokenValue }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Token refresh failed');
      }

      // Store new tokens
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);

      // Set user data if available in response, otherwise fetch it
      if (data.data.user) {
        setUser(data.data.user);
      } else {
        // If refresh token doesn't return user data, fetch it separately
        // Try to get user ID from the new token
        const userData = await fetchUserProfile();
        if (userData) {
          setUser(userData);
        } else {
          throw new Error('Failed to get user data after token refresh');
        }
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      clearTokens();
      throw error;
    }
  }, [clearTokens, fetchUserProfile]);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshTokenValue = localStorage.getItem('refreshToken');

      console.log('Checking auth on mount:', {
        hasToken: !!token,
        hasRefreshToken: !!refreshTokenValue,
      });

      if (token && refreshTokenValue) {
        try {
          // First try to get user data with current token
          const userData = await fetchUserProfile();
          if (userData) {
            console.log('User data fetched successfully:', userData);
            setUser(userData);
          } else {
            // If that fails, try refreshing the token
            console.log('Token seems invalid, trying to refresh...');
            await refreshToken();
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          clearTokens();
        }
      } else {
        console.log('No tokens found, user not authenticated');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [refreshToken, clearTokens, fetchUserProfile]);

  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      try {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data: LoginResponse | ErrorResponse = await response.json();

        if (!response.ok || !data.success) {
          const errorData = data as ErrorResponse;
          throw new Error(errorData.message || 'Login failed');
        }

        const loginData = data as LoginResponse;

        // Store tokens and user ID
        localStorage.setItem('accessToken', loginData.data.accessToken);
        localStorage.setItem('refreshToken', loginData.data.refreshToken);
        localStorage.setItem('userId', loginData.data.user._id);

        // Set user
        setUser(loginData.data.user);

        toast.success('Успешный вход в систему!');
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Ошибка входа';
        toast.error(errorMessage);
        throw error;
      }
    },
    []
  );

  const register = useCallback(
    async (registerData: RegisterData): Promise<void> => {
      try {
        const response = await fetch(`${API_BASE_URL}/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registerData),
        });

        const data: LoginResponse | ErrorResponse = await response.json();

        if (!response.ok || !data.success) {
          const errorData = data as ErrorResponse;
          if (errorData.errors && errorData.errors.length > 0) {
            // Show validation errors
            errorData.errors.forEach((error) => {
              toast.error(`${error.field}: ${error.message}`);
            });
          }
          throw new Error(errorData.message || 'Registration failed');
        }

        const registerResult = data as LoginResponse;

        // Store tokens and user ID
        localStorage.setItem('accessToken', registerResult.data.accessToken);
        localStorage.setItem('refreshToken', registerResult.data.refreshToken);
        localStorage.setItem('userId', registerResult.data.user._id);

        // Set user
        setUser(registerResult.data.user);

        toast.success('Регистрация прошла успешно!');
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Ошибка регистрации';
        if (!errorMessage.includes(':')) {
          toast.error(errorMessage);
        }
        throw error;
      }
    },
    []
  );

  const logout = useCallback(async (): Promise<void> => {
    try {
      const refreshTokenValue = localStorage.getItem('refreshToken');

      if (refreshTokenValue) {
        await fetch(`${API_BASE_URL}/users/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken: refreshTokenValue }),
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearTokens();
      toast.success('Вы вышли из системы');
    }
  }, [clearTokens]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
