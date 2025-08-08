import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Student, Teacher } from '../types';

interface AuthState {
  user: User | null;
  userType: 'student' | 'teacher' | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, userType: 'student' | 'teacher') => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User>) => Promise<boolean>;
}

// Mock user data for demonstration
const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    email: 'emma@student.com',
    userType: 'student',
    grade: 1,
    xp: 1250,
    level: 5,
    streak: 7,
    avatar: '👧',
    unlockedAvatars: ['👧', '🐱', '🦄'],
    currentTheme: 'ocean',
    unlockedThemes: ['ocean', 'forest', 'space'],
  },
  {
    id: '2',
    name: 'Liam Smith',
    email: 'liam@student.com',
    userType: 'student',
    grade: 1,
    xp: 890,
    level: 4,
    streak: 3,
    avatar: '👦',
    unlockedAvatars: ['👦', '🐶'],
    currentTheme: 'forest',
    unlockedThemes: ['forest'],
  },
];

const mockTeachers: Teacher[] = [
  {
    id: 't1',
    name: 'Ms. Rodriguez',
    email: 'rodriguez@teacher.com',
    userType: 'teacher',
    students: mockStudents,
    classCode: 'GRADE1A',
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      userType: null,
      isAuthenticated: false,

      login: async (email: string, password: string, userType: 'student' | 'teacher') => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        let user: User | null = null;

        if (userType === 'student') {
          user = mockStudents.find(s => s.email === email) || null;
        } else {
          user = mockTeachers.find(t => t.email === email) || null;
        }

        if (user) {
          set({
            user,
            userType,
            isAuthenticated: true,
          });
          return true;
        }

        return false;
      },

      logout: () => {
        set({
          user: null,
          userType: null,
          isAuthenticated: false,
        });
      },

      register: async (userData: Partial<User>) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // For demo purposes, create a new student
        const newStudent: Student = {
          id: Date.now().toString(),
          name: userData.name || 'New Student',
          email: userData.email || 'new@student.com',
          userType: 'student',
          grade: 1,
          xp: 0,
          level: 1,
          streak: 0,
          avatar: '👧',
          unlockedAvatars: ['👧'],
          currentTheme: 'ocean',
          unlockedThemes: ['ocean'],
        };

        set({
          user: newStudent,
          userType: 'student',
          isAuthenticated: true,
        });

        return true;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        userType: state.userType,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
); 