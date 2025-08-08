import React from 'react';
import { motion } from 'framer-motion';
import { useStudentStore } from '../stores/studentStore';

const AvatarSelector: React.FC = () => {
  const { avatars } = useStudentStore();

  const handleAvatarSelect = (avatarId: string) => {
    // Update selected avatar
    console.log(`Selected avatar: ${avatarId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Choose Your Avatar</h3>
        <p className="text-gray-600">Select an avatar to represent you in the game!</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {avatars.map((avatar, index) => (
          <motion.div
            key={avatar.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              avatar.isUnlocked
                ? 'border-primary-300 hover:border-primary-500 bg-white hover:shadow-lg'
                : 'border-gray-200 bg-gray-50 opacity-60'
            }`}
            onClick={() => avatar.isUnlocked && handleAvatarSelect(avatar.id)}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">{avatar.image}</div>
              <div className="font-medium text-gray-800 mb-1">{avatar.name}</div>
              {avatar.isUnlocked ? (
                <div className="text-xs text-green-600">Available</div>
              ) : (
                <div className="text-xs text-gray-500">
                  {avatar.xpRequired} XP required
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AvatarSelector; 