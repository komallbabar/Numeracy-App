import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import { useStudentStore } from '../stores/studentStore';
import ClassProgressOverview from './ClassProgressOverview';
import StudentList from './StudentList';
import WorksheetGenerator from './WorksheetGenerator';
import AssessmentManager from './AssessmentManager';

const TeacherDashboard: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { topics } = useStudentStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'worksheets' | 'assessments'>('overview');

  const teacher = user as any; // Type assertion for demo

  const handleLogout = () => {
    logout();
  };

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
                👩‍🏫
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 font-fun">
                  Teacher Dashboard
                </h1>
                <p className="text-sm text-gray-600">Grade 1 Numeracy Learning</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Teacher Info */}
              <div className="flex items-center space-x-3 bg-gradient-to-r from-primary-100 to-primary-200 px-4 py-2 rounded-full">
                <span className="text-2xl">👩‍🏫</span>
                <div className="text-sm">
                  <div className="font-semibold text-gray-800">{teacher?.name}</div>
                  <div className="text-gray-600">Class: {teacher?.classCode}</div>
                </div>
              </div>

              {/* Class Stats */}
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 px-3 py-2 rounded-full">
                  <div className="text-sm font-semibold text-green-800">
                    👥 {teacher?.students?.length || 0} Students
                  </div>
                </div>
                <div className="bg-blue-100 px-3 py-2 rounded-full">
                  <div className="text-sm font-semibold text-blue-800">
                    📚 {topics.length} Topics
                  </div>
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
              { id: 'overview', label: '📊 Class Overview', icon: '📊' },
              { id: 'students', label: '👥 Students', icon: '👥' },
              { id: 'worksheets', label: '📝 Worksheets', icon: '📝' },
              { id: 'assessments', label: '📋 Assessments', icon: '📋' },
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
          {activeTab === 'overview' && (
            <ClassProgressOverview />
          )}

          {activeTab === 'students' && (
            <StudentList />
          )}

          {activeTab === 'worksheets' && (
            <WorksheetGenerator />
          )}

          {activeTab === 'assessments' && (
            <AssessmentManager />
          )}
        </motion.div>
      </main>

      {/* Quick Actions Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="fixed bottom-6 right-6 bg-primary-500 text-white p-4 rounded-full shadow-lg hover:bg-primary-600 transition-colors z-50"
        onClick={() => setActiveTab('overview')}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </motion.button>
    </div>
  );
};

export default TeacherDashboard; 