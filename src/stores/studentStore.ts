import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Topic, Level, Activity, Progress, Achievement, Avatar, Theme, MiniGame } from '../types';

interface StudentState {
  topics: Topic[];
  currentTopic: Topic | null;
  currentLevel: Level | null;
  currentActivity: Activity | null;
  progress: Progress[];
  achievements: Achievement[];
  avatars: Avatar[];
  themes: Theme[];
  miniGames: MiniGame[];
  initializeStudentData: () => void;
  setCurrentTopic: (topic: Topic) => void;
  setCurrentLevel: (level: Level) => void;
  setCurrentActivity: (activity: Activity) => void;
  updateProgress: (progress: Progress) => void;
  unlockTopic: (topicId: string) => void;
  unlockLevel: (topicId: string, levelId: string) => void;
  completeActivity: (activityId: string, score: number) => void;
  addXP: (amount: number) => void;
  unlockAchievement: (achievementId: string) => void;
  unlockAvatar: (avatarId: string) => void;
  unlockTheme: (themeId: string) => void;
  unlockMiniGame: (miniGameId: string) => void;
}

// Mock curriculum data
const mockTopics: Topic[] = [
  {
    id: 'numbers-to-20',
    title: 'Numbers to 20',
    description: 'Learn to count and recognize numbers from 1 to 20',
    icon: '🔢',
    color: '#FF6B6B',
    order: 1,
    levels: [
      {
        id: 'concrete-1',
        title: 'Count with Blocks',
        description: 'Use blocks to count numbers',
        cpaStage: 'concrete',
        order: 1,
        isUnlocked: true,
        isCompleted: false,
        activities: [
          {
            id: 'count-blocks-1',
            title: 'Count the Blocks',
            description: 'Drag blocks to count numbers',
            type: 'drag-drop',
            content: {
              question: 'How many blocks are there?',
              correctAnswer: '5',
              manipulatives: [
                { id: '1', type: 'block', value: 1, color: '#FF6B6B', position: { x: 50, y: 100 }, isDraggable: true, isCorrect: true },
                { id: '2', type: 'block', value: 1, color: '#4ECDC4', position: { x: 100, y: 100 }, isDraggable: true, isCorrect: true },
                { id: '3', type: 'block', value: 1, color: '#45B7D1', position: { x: 150, y: 100 }, isDraggable: true, isCorrect: true },
                { id: '4', type: 'block', value: 1, color: '#96CEB4', position: { x: 200, y: 100 }, isDraggable: true, isCorrect: true },
                { id: '5', type: 'block', value: 1, color: '#FFEAA7', position: { x: 250, y: 100 }, isDraggable: true, isCorrect: true },
              ]
            },
            isCompleted: false,
            score: 0,
            maxScore: 10,
            attempts: 0,
            timeSpent: 0,
            errors: []
          }
        ],
        masteryScore: 80,
        currentScore: 0
      },
      {
        id: 'pictorial-1',
        title: 'Number Pictures',
        description: 'Match numbers with pictures',
        cpaStage: 'pictorial',
        order: 2,
        isUnlocked: false,
        isCompleted: false,
        activities: [],
        masteryScore: 80,
        currentScore: 0
      },
      {
        id: 'abstract-1',
        title: 'Number Symbols',
        description: 'Work with number symbols',
        cpaStage: 'abstract',
        order: 3,
        isUnlocked: false,
        isCompleted: false,
        activities: [],
        masteryScore: 80,
        currentScore: 0
      }
    ],
    isUnlocked: true,
    isCompleted: false,
    progress: 0
  },
  {
    id: 'addition-subtraction',
    title: 'Addition & Subtraction',
    description: 'Learn to add and subtract numbers within 20',
    icon: '➕',
    color: '#4ECDC4',
    order: 2,
    levels: [],
    isUnlocked: false,
    isCompleted: false,
    progress: 0
  },
  {
    id: 'place-value',
    title: 'Place Value',
    description: 'Understand tens and ones',
    icon: '🏠',
    color: '#45B7D1',
    order: 3,
    levels: [],
    isUnlocked: false,
    isCompleted: false,
    progress: 0
  },
  {
    id: 'shapes',
    title: 'Shapes',
    description: 'Learn about 2D and 3D shapes',
    icon: '🔷',
    color: '#96CEB4',
    order: 4,
    levels: [],
    isUnlocked: false,
    isCompleted: false,
    progress: 0
  },
  {
    id: 'measurement',
    title: 'Measurement',
    description: 'Learn to measure length, weight, and capacity',
    icon: '📏',
    color: '#FFEAA7',
    order: 5,
    levels: [],
    isUnlocked: false,
    isCompleted: false,
    progress: 0
  },
  {
    id: 'fractions',
    title: 'Fractions',
    description: 'Introduction to simple fractions',
    icon: '🍕',
    color: '#DDA0DD',
    order: 6,
    levels: [],
    isUnlocked: false,
    isCompleted: false,
    progress: 0
  },
  {
    id: 'patterns',
    title: 'Patterns',
    description: 'Recognize and create patterns',
    icon: '🎨',
    color: '#FFB6C1',
    order: 7,
    levels: [],
    isUnlocked: false,
    isCompleted: false,
    progress: 0
  },
  {
    id: 'time',
    title: 'Time',
    description: 'Tell time to the hour and half hour',
    icon: '⏰',
    color: '#F0E68C',
    order: 8,
    levels: [],
    isUnlocked: false,
    isCompleted: false,
    progress: 0
  },
  {
    id: 'data',
    title: 'Data Handling',
    description: 'Collect and organize data',
    icon: '📊',
    color: '#98D8C8',
    order: 9,
    levels: [],
    isUnlocked: false,
    isCompleted: false,
    progress: 0
  }
];

const mockAchievements: Achievement[] = [
  {
    id: 'first-activity',
    title: 'First Steps',
    description: 'Complete your first activity',
    icon: '🌟',
    isUnlocked: false,
    xpReward: 50
  },
  {
    id: 'streak-3',
    title: 'On Fire!',
    description: 'Maintain a 3-day streak',
    icon: '🔥',
    isUnlocked: false,
    xpReward: 100
  },
  {
    id: 'mastery-1',
    title: 'Master',
    description: 'Achieve mastery in your first topic',
    icon: '👑',
    isUnlocked: false,
    xpReward: 200
  }
];

const mockAvatars: Avatar[] = [
  {
    id: 'default',
    name: 'Default',
    image: '👧',
    isUnlocked: true,
    xpRequired: 0
  },
  {
    id: 'cat',
    name: 'Cat',
    image: '🐱',
    isUnlocked: false,
    xpRequired: 100
  },
  {
    id: 'unicorn',
    name: 'Unicorn',
    image: '🦄',
    isUnlocked: false,
    xpRequired: 500
  }
];

const mockThemes: Theme[] = [
  {
    id: 'ocean',
    name: 'Ocean',
    preview: '🌊',
    isUnlocked: true,
    xpRequired: 0
  },
  {
    id: 'forest',
    name: 'Forest',
    preview: '🌲',
    isUnlocked: false,
    xpRequired: 200
  },
  {
    id: 'space',
    name: 'Space',
    preview: '🚀',
    isUnlocked: false,
    xpRequired: 1000
  }
];

const mockMiniGames: MiniGame[] = [
  {
    id: 'number-race',
    title: 'Number Race',
    description: 'Race to complete number sequences',
    icon: '🏃',
    isUnlocked: false,
    isCompleted: false,
    highScore: 0,
    xpReward: 50
  },
  {
    id: 'shape-matcher',
    title: 'Shape Matcher',
    description: 'Match shapes quickly',
    icon: '🔷',
    isUnlocked: false,
    isCompleted: false,
    highScore: 0,
    xpReward: 50
  }
];

export const useStudentStore = create<StudentState>()(
  persist(
    (set, get) => ({
      topics: mockTopics,
      currentTopic: null,
      currentLevel: null,
      currentActivity: null,
      progress: [],
      achievements: mockAchievements,
      avatars: mockAvatars,
      themes: mockThemes,
      miniGames: mockMiniGames,

      initializeStudentData: () => {
        // Initialize with default data if not already set
        const state = get();
        if (state.topics.length === 0) {
          set({ topics: mockTopics });
        }
      },

      setCurrentTopic: (topic: Topic) => {
        set({ currentTopic: topic });
      },

      setCurrentLevel: (level: Level) => {
        set({ currentLevel: level });
      },

      setCurrentActivity: (activity: Activity) => {
        set({ currentActivity: activity });
      },

      updateProgress: (progress: Progress) => {
        set((state) => ({
          progress: [...state.progress, progress]
        }));
      },

      unlockTopic: (topicId: string) => {
        set((state) => ({
          topics: state.topics.map(topic =>
            topic.id === topicId ? { ...topic, isUnlocked: true } : topic
          )
        }));
      },

      unlockLevel: (topicId: string, levelId: string) => {
        set((state) => ({
          topics: state.topics.map(topic =>
            topic.id === topicId
              ? {
                  ...topic,
                  levels: topic.levels.map(level =>
                    level.id === levelId ? { ...level, isUnlocked: true } : level
                  )
                }
              : topic
          )
        }));
      },

      completeActivity: (activityId: string, score: number) => {
        set((state) => ({
          topics: state.topics.map(topic => ({
            ...topic,
            levels: topic.levels.map(level => ({
              ...level,
              activities: level.activities.map(activity =>
                activity.id === activityId
                  ? { ...activity, isCompleted: true, score }
                  : activity
              )
            }))
          }))
        }));
      },

      addXP: (amount: number) => {
        // This would typically update the user's XP in the auth store
        console.log(`Added ${amount} XP`);
      },

      unlockAchievement: (achievementId: string) => {
        set((state) => ({
          achievements: state.achievements.map(achievement =>
            achievement.id === achievementId
              ? { ...achievement, isUnlocked: true, unlockedAt: new Date() }
              : achievement
          )
        }));
      },

      unlockAvatar: (avatarId: string) => {
        set((state) => ({
          avatars: state.avatars.map(avatar =>
            avatar.id === avatarId ? { ...avatar, isUnlocked: true } : avatar
          )
        }));
      },

      unlockTheme: (themeId: string) => {
        set((state) => ({
          themes: state.themes.map(theme =>
            theme.id === themeId ? { ...theme, isUnlocked: true } : theme
          )
        }));
      },

      unlockMiniGame: (miniGameId: string) => {
        set((state) => ({
          miniGames: state.miniGames.map(game =>
            game.id === miniGameId ? { ...game, isUnlocked: true } : game
          )
        }));
      },
    }),
    {
      name: 'student-storage',
      partialize: (state) => ({
        topics: state.topics,
        progress: state.progress,
        achievements: state.achievements,
        avatars: state.avatars,
        themes: state.themes,
        miniGames: state.miniGames,
      }),
    }
  )
); 