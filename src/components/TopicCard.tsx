import React from 'react';
import { motion } from 'framer-motion';
import { Topic, CPAStage } from '../types';

interface TopicCardProps {
  topic: Topic;
  onSelect: (topic: Topic) => void;
  isSelected?: boolean;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, onSelect, isSelected = false }) => {
  const getCPAStageProgress = (stage: CPAStage) => {
    const stageLevels = topic.levels.filter(level => level.cpaStage === stage);
    if (stageLevels.length === 0) return 0;
    
    const completedLevels = stageLevels.filter(level => level.isCompleted);
    return (completedLevels.length / stageLevels.length) * 100;
  };

  const concreteProgress = getCPAStageProgress('concrete');
  const pictorialProgress = getCPAStageProgress('pictorial');
  const abstractProgress = getCPAStageProgress('abstract');

  const getStatusColor = () => {
    if (topic.isCompleted) return 'bg-green-500';
    if (topic.isUnlocked) return 'bg-blue-500';
    return 'bg-gray-400';
  };

  const getStatusText = () => {
    if (topic.isCompleted) return 'Completed';
    if (topic.isUnlocked) return 'Available';
    return 'Locked';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`card cursor-pointer transition-all duration-300 ${
        isSelected ? 'ring-4 ring-primary-500' : ''
      } ${!topic.isUnlocked ? 'opacity-60' : ''}`}
      onClick={() => topic.isUnlocked && onSelect(topic)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="text-4xl p-3 rounded-full"
            style={{ backgroundColor: `${topic.color}20` }}
          >
            {topic.icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
            <p className="text-sm text-gray-600">{topic.description}</p>
          </div>
        </div>
        
        {/* Status Badge */}
        <div className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </div>
      </div>

      {/* CPA Progress */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Concrete</span>
          <span className="text-sm text-gray-500">{Math.round(concreteProgress)}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${concreteProgress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Pictorial</span>
          <span className="text-sm text-gray-500">{Math.round(pictorialProgress)}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${pictorialProgress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Abstract</span>
          <span className="text-sm text-gray-500">{Math.round(abstractProgress)}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${abstractProgress}%` }}
          />
        </div>
      </div>

      {/* Overall Progress */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Overall Progress</span>
        <span className="text-lg font-bold text-primary-600">{Math.round(topic.progress)}%</span>
      </div>

      {/* Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-full mt-4 py-2 px-4 rounded-lg font-medium transition-colors ${
          topic.isUnlocked
            ? 'bg-primary-500 text-white hover:bg-primary-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        disabled={!topic.isUnlocked}
      >
        {topic.isCompleted ? 'Review' : topic.isUnlocked ? 'Start Learning' : 'Locked'}
      </motion.button>

      {/* Lock Icon for Locked Topics */}
      {!topic.isUnlocked && (
        <div className="absolute top-4 right-4 text-gray-400">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}

      {/* Completion Badge */}
      {topic.isCompleted && (
        <div className="absolute top-4 right-4 text-green-500">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </motion.div>
  );
};

export default TopicCard; 