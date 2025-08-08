import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import { useStudentStore } from '../stores/studentStore';
import TopicCard from './TopicCard';
import ProgressOverview from './ProgressOverview';
import AchievementPanel from './AchievementPanel';
import MiniGamePanel from './MiniGamePanel';
import AvatarSelector from './AvatarSelector';
import { Topic } from '../types';

const StudentDashboard: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { topics, achievements, miniGames } = useStudentStore();
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [activeTab, setActiveTab] = useState<'topics' | 'progress' | 'achievements' | 'games'>('topics');

  const student = user as any; // Type assertion for demo

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    // Navigate to topic detail or activity
  };

  const handleLogout = () => {
    logout();
  };

  const unlockedTopics = topics.filter(topic => topic.isUnlocked);
  const completedTopics = topics.filter(topic => topic.isCompleted);
  const unlockedAchievements = achievements.filter(achievement => achievement.isUnlocked);
  const unlockedGames = miniGames.filter(game => game.isUnlocked);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-4xl"
              >
                🔢
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 font-fun">
                  Numeracy Learning
                </h1>
                <p className="text-sm text-gray-600">Grade 1 Math Adventure</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Student Info */}
              <div className="flex items-center space-x-3 bg-gradient-to-r from-primary-100 to-primary-200 px-4 py-2 rounded-full">
                <span className="text-2xl">{student?.avatar || '👧'}</span>
                <div className="text-sm">
                  <div className="font-semibold text-gray-800">{student?.name}</div>
                  <div className="text-gray-600">Level {student?.level}</div>
                </div>
              </div>

              {/* XP and Streak */}
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-100 px-3 py-2 rounded-full">
                  <div className="text-sm font-semibold text-yellow-800">⭐ {student?.xp} XP</div>
                </div>
                <div className="bg-orange-100 px-3 py-2 rounded-full">
                  <div className="text-sm font-semibold text-orange-800">🔥 {student?.streak} days</div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'topics', label: '📚 Topics', count: unlockedTopics.length },
              { id: 'progress', label: '📊 Progress', count: completedTopics.length },
              { id: 'achievements', label: '🏆 Achievements', count: unlockedAchievements.length },
              { id: 'games', label: '🎮 Mini Games', count: unlockedGames.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'topics' && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Learning Topics</h2>
                <p className="text-gray-600">Choose a topic to start your math adventure!</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topics.map((topic, index) => (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TopicCard
                      topic={topic}
                      onSelect={handleTopicSelect}
                      isSelected={selectedTopic?.id === topic.id}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <ProgressOverview />
          )}

          {activeTab === 'achievements' && (
            <AchievementPanel />
          )}

          {activeTab === 'games' && (
            <MiniGamePanel />
          )}
        </motion.div>
      </main>

      {/* Quick Actions Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="fixed bottom-6 right-6 bg-primary-500 text-white p-4 rounded-full shadow-lg hover:bg-primary-600 transition-colors z-50"
        onClick={() => setActiveTab('topics')}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </motion.button>
    </div>
  );
};

export default StudentDashboard; 