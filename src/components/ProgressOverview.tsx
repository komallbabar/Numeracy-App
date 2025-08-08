import React from 'react';
import { motion } from 'framer-motion';
import { useStudentStore } from '../stores/studentStore';

const ProgressOverview: React.FC = () => {
  const { topics, progress } = useStudentStore();

  const totalTopics = topics.length;
  const completedTopics = topics.filter(topic => topic.isCompleted).length;
  const overallProgress = (completedTopics / totalTopics) * 100;

  const getCPAProgress = () => {
    let concreteTotal = 0;
    let pictorialTotal = 0;
    let abstractTotal = 0;
    let concreteCompleted = 0;
    let pictorialCompleted = 0;
    let abstractCompleted = 0;

    topics.forEach(topic => {
      topic.levels.forEach(level => {
        if (level.cpaStage === 'concrete') {
          concreteTotal++;
          if (level.isCompleted) concreteCompleted++;
        } else if (level.cpaStage === 'pictorial') {
          pictorialTotal++;
          if (level.isCompleted) pictorialCompleted++;
        } else if (level.cpaStage === 'abstract') {
          abstractTotal++;
          if (level.isCompleted) abstractCompleted++;
        }
      });
    });

    return {
      concrete: concreteTotal > 0 ? (concreteCompleted / concreteTotal) * 100 : 0,
      pictorial: pictorialTotal > 0 ? (pictorialCompleted / pictorialTotal) * 100 : 0,
      abstract: abstractTotal > 0 ? (abstractCompleted / abstractTotal) * 100 : 0,
    };
  };

  const cpaProgress = getCPAProgress();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Progress</h2>
        <p className="text-gray-600">Track your learning journey across all topics</p>
      </div>

      {/* Overall Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Overall Progress</h3>
        <div className="flex items-center space-x-4 mb-4">
          <div className="text-4xl font-bold text-primary-600">
            {Math.round(overallProgress)}%
          </div>
          <div className="flex-1">
            <div className="progress-bar h-4">
              <div 
                className="progress-fill h-4"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          {completedTopics} of {totalTopics} topics completed
        </p>
      </motion.div>

      {/* CPA Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">CPA Learning Stages</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Concrete */}
          <div className="text-center">
            <div className="text-3xl mb-2">🧱</div>
            <h4 className="font-semibold text-gray-800 mb-2">Concrete</h4>
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {Math.round(cpaProgress.concrete)}%
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${cpaProgress.concrete}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Hands-on learning with manipulatives
            </p>
          </div>

          {/* Pictorial */}
          <div className="text-center">
            <div className="text-3xl mb-2">🖼️</div>
            <h4 className="font-semibold text-gray-800 mb-2">Pictorial</h4>
            <div className="text-2xl font-bold text-green-600 mb-2">
              {Math.round(cpaProgress.pictorial)}%
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${cpaProgress.pictorial}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Visual representations and diagrams
            </p>
          </div>

          {/* Abstract */}
          <div className="text-center">
            <div className="text-3xl mb-2">📝</div>
            <h4 className="font-semibold text-gray-800 mb-2">Abstract</h4>
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {Math.round(cpaProgress.abstract)}%
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${cpaProgress.abstract}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Numbers, symbols, and equations
            </p>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
        {progress.length > 0 ? (
          <div className="space-y-3">
            {progress.slice(-5).reverse().map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-800">
                    {activity.topicId} - {activity.activityId}
                  </div>
                  <div className="text-sm text-gray-600">
                    {activity.cpaStage} stage • {activity.score}/{activity.maxScore} points
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(activity.completedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📚</div>
            <p>No activity yet. Start learning to see your progress!</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProgressOverview; 