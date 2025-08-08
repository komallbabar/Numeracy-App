import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';

const LoginPage: React.FC = () => {
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password, userType);
      if (!success) {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials = {
    student: { email: 'emma@student.com', password: 'password' },
    teacher: { email: 'rodriguez@teacher.com', password: 'password' }
  };

  const fillDemoCredentials = () => {
    const creds = demoCredentials[userType];
    setEmail(creds.email);
    setPassword(creds.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-6xl mb-4"
            >
              🔢
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 font-fun">
              Numeracy Learning
            </h1>
            <p className="text-gray-600">Grade 1 Math Adventure</p>
          </div>

          {/* User Type Toggle */}
          <div className="flex bg-gray-100 rounded-full p-1 mb-6">
            <button
              onClick={() => setUserType('student')}
              className={`flex-1 py-2 px-4 rounded-full font-medium transition-all duration-200 ${
                userType === 'student'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              👧 Student
            </button>
            <button
              onClick={() => setUserType('teacher')}
              className={`flex-1 py-2 px-4 rounded-full font-medium transition-all duration-200 ${
                userType === 'teacher'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              👩‍🏫 Teacher
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 text-center">
            <button
              onClick={fillDemoCredentials}
              className="text-sm text-primary-600 hover:text-primary-700 underline"
            >
              Use Demo Credentials
            </button>
          </div>

          {/* Features Preview */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
              What you'll learn:
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center text-gray-600">
                <span className="mr-2">🔢</span>
                Numbers to 20
              </div>
              <div className="flex items-center text-gray-600">
                <span className="mr-2">➕</span>
                Addition
              </div>
              <div className="flex items-center text-gray-600">
                <span className="mr-2">🔷</span>
                Shapes
              </div>
              <div className="flex items-center text-gray-600">
                <span className="mr-2">⏰</span>
                Time
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage; 