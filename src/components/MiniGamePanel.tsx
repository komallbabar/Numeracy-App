import React from 'react';
import { motion } from 'framer-motion';
import { useStudentStore } from '../stores/studentStore';

const MiniGamePanel: React.FC = () => {
  const { miniGames } = useStudentStore();

  const unlockedGames = miniGames.filter(game => game.isUnlocked);
  const lockedGames = miniGames.filter(game => !game.isUnlocked);

  const handlePlayGame = (gameId: string) => {
    // Navigate to mini-game
    console.log(`Playing game: ${gameId}`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Mini Games</h2>
        <p className="text-gray-600">Have fun while practicing your math skills!</p>
      </div>

      {/* Game Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {unlockedGames.length}
            </div>
            <div className="text-sm text-gray-600">Games Unlocked</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {unlockedGames.filter(game => game.isCompleted).length}
            </div>
            <div className="text-sm text-gray-600">Games Completed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {unlockedGames.reduce((total, game) => total + game.highScore, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Score</div>
          </div>
        </div>
      </motion.div>

      {/* Unlocked Games */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Available Games</h3>
        {unlockedGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unlockedGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="game-card cursor-pointer"
                onClick={() => handlePlayGame(game.id)}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{game.icon}</div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{game.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{game.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">High Score:</span>
                      <span className="font-semibold text-green-600">{game.highScore}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">XP Reward:</span>
                      <span className="font-semibold text-yellow-600">+{game.xpReward}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                  >
                    {game.isCompleted ? 'Play Again' : 'Play Now'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🎮</div>
            <p>No games unlocked yet. Complete more topics to unlock mini-games!</p>
          </div>
        )}
      </motion.div>

      {/* Locked Games */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Upcoming Games</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lockedGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-100 p-6 rounded-2xl border-2 border-gray-200 opacity-60"
            >
              <div className="text-center">
                <div className="text-4xl mb-3 text-gray-400">{game.icon}</div>
                <h4 className="text-lg font-semibold text-gray-600 mb-2">{game.title}</h4>
                <p className="text-sm text-gray-500 mb-4">{game.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">XP Reward:</span>
                    <span className="font-semibold text-gray-400">+{game.xpReward}</span>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <div className="text-xs text-gray-400 mb-2">🔒 Locked</div>
                  <div className="text-xs text-gray-500">
                    Complete more topics to unlock
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Game Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card bg-gradient-to-r from-blue-50 to-purple-50"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">How to Play</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">🎯 Objective</h4>
            <p className="text-sm text-gray-600">
              Mini-games help reinforce math concepts through fun, interactive challenges. 
              Complete topics to unlock new games and earn XP rewards.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">🏆 Scoring</h4>
            <p className="text-sm text-gray-600">
              Each game has different scoring systems. Try to beat your high score and 
              earn XP points to level up your character.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MiniGamePanel; 