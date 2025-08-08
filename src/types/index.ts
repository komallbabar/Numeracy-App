// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  userType: 'student' | 'teacher';
  avatar?: string;
}

// Student Types
export interface Student extends User {
  userType: 'student';
  grade: number;
  xp: number;
  level: number;
  streak: number;
  avatar: string;
  unlockedAvatars: string[];
  currentTheme: string;
  unlockedThemes: string[];
}

// Teacher Types
export interface Teacher extends User {
  userType: 'teacher';
  students: Student[];
  classCode: string;
}

// CPA Stages
export type CPAStage = 'concrete' | 'pictorial' | 'abstract';

// Topic Types
export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  levels: Level[];
  isUnlocked: boolean;
  isCompleted: boolean;
  progress: number;
}

export interface Level {
  id: string;
  title: string;
  description: string;
  cpaStage: CPAStage;
  order: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  activities: Activity[];
  masteryScore: number;
  currentScore: number;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  type: ActivityType;
  content: ActivityContent;
  isCompleted: boolean;
  score: number;
  maxScore: number;
  attempts: number;
  timeSpent: number;
  errors: ErrorPattern[];
}

export type ActivityType = 
  | 'drag-drop'
  | 'multiple-choice'
  | 'fill-blank'
  | 'matching'
  | 'counting'
  | 'number-line'
  | 'shapes'
  | 'measurement'
  | 'patterns'
  | 'time'
  | 'data';

export interface ActivityContent {
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  manipulatives?: Manipulative[];
  images?: string[];
  audio?: string;
  hints?: string[];
}

export interface Manipulative {
  id: string;
  type: 'block' | 'counter' | 'shape' | 'number' | 'symbol';
  value: number | string;
  color: string;
  position: { x: number; y: number };
  isDraggable: boolean;
  isCorrect: boolean;
}

export interface ErrorPattern {
  id: string;
  type: string;
  description: string;
  frequency: number;
  lastOccurred: Date;
  suggestedRemediation: string;
}

// Progress Types
export interface Progress {
  topicId: string;
  levelId: string;
  activityId: string;
  score: number;
  maxScore: number;
  timeSpent: number;
  attempts: number;
  completedAt: Date;
  cpaStage: CPAStage;
}

// Assessment Types
export interface Assessment {
  id: string;
  topicId: string;
  levelId: string;
  questions: AssessmentQuestion[];
  totalScore: number;
  passingScore: number;
  timeLimit?: number;
  isCompleted: boolean;
  score?: number;
  completedAt?: Date;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'fill-blank' | 'drag-drop';
  options?: string[];
  correctAnswer: string | string[];
  points: number;
  cpaStage: CPAStage;
}

// Gamification Types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: Date;
  xpReward: number;
}

export interface Avatar {
  id: string;
  name: string;
  image: string;
  isUnlocked: boolean;
  xpRequired: number;
}

export interface Theme {
  id: string;
  name: string;
  preview: string;
  isUnlocked: boolean;
  xpRequired: number;
}

// Mini-game Types
export interface MiniGame {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  highScore: number;
  xpReward: number;
}

// Teacher Dashboard Types
export interface ClassProgress {
  studentId: string;
  studentName: string;
  overallProgress: number;
  topicProgress: TopicProgress[];
  recentActivity: Progress[];
  misconceptions: ErrorPattern[];
}

export interface TopicProgress {
  topicId: string;
  topicTitle: string;
  concreteProgress: number;
  pictorialProgress: number;
  abstractProgress: number;
  overallProgress: number;
  needsHelp: boolean;
}

// Worksheet Types
export interface Worksheet {
  id: string;
  title: string;
  topicId: string;
  levelId: string;
  cpaStage: CPAStage;
  content: WorksheetContent[];
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  isPrintable: boolean;
}

export interface WorksheetContent {
  type: 'question' | 'activity' | 'instruction';
  content: string;
  options?: string[];
  correctAnswer?: string;
  points?: number;
} 