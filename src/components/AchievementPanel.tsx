import React from 'react';
import { motion } from 'framer-motion';
import { useStudentStore } from '../stores/studentStore';

const AchievementPanel: React.FC = () => {
  const { achievements } = useStudentStore();

  const unlockedAchievements = achievements.filter(achievement => achievement.isUnlocked);
  const lockedAchievements = achievements.filter(achievement => !achievement.isUnlocked);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Achievements</h2>
        <p className="text-gray-600">Celebrate your learning milestones!</p>
      </div>

      {/* Achievement Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {unlockedAchievements.length}
            </div>
            <div className="text-sm text-gray-600">Achievements Unlocked</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {unlockedAchievements.reduce((total, achievement) => total + achievement.xpReward, 0)}
            </div>
            <div className="text-sm text-gray-600">Total XP Earned</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {Math.round((unlockedAchievements.length / achievements.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>
        </div>
      </motion.div>

      {/* Unlocked Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Unlocked Achievements</h3>
        {unlockedAchievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unlockedAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-yellow-100 to-orange-100 p-4 rounded-xl border-2 border-yellow-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    <div className="text-xs text-yellow-700 font-medium mt-1">
                      +{achievement.xpReward} XP
                    </div>
                  </div>
                </div>
                {achievement.unlockedAt && (
                  <div className="text-xs text-gray-500 mt-2">
                    Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🏆</div>
            <p>No achievements unlocked yet. Keep learning to earn rewards!</p>
          </div>
        )}
      </motion.div>

      {/* Locked Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Upcoming Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lockedAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-100 p-4 rounded-xl border-2 border-gray-200 opacity-60"
            >
              <div className="flex items-center space-x-3">
                <div className="text-3xl text-gray-400">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-600">{achievement.title}</h4>
                  <p className="text-sm text-gray-500">{achievement.description}</p>
                  <div className="text-xs text-gray-400 font-medium mt-1">
                    +{achievement.xpReward} XP
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-2">
                🔒 Locked
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AchievementPanel; 