import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import LoginPage from './components/LoginPage';
import { useAuthStore } from './stores/authStore';
import { useStudentStore } from './stores/studentStore';

const App: React.FC = () => {
  const { user, userType } = useAuthStore();
  const { initializeStudentData } = useStudentStore();

  React.useEffect(() => {
    // Initialize student data when app loads
    initializeStudentData();
  }, [initializeStudentData]);

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route 
              path="/" 
              element={userType === 'student' ? <StudentDashboard /> : <TeacherDashboard />} 
            />
            <Route 
              path="/student/*" 
              element={<StudentDashboard />} 
            />
            <Route 
              path="/teacher/*" 
              element={<TeacherDashboard />} 
            />
          </Routes>
        </motion.div>
      </div>
    </Router>
  );
};

export default App; 