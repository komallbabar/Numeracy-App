# Numeracy Learning App - Grade 1

A comprehensive gamified numeracy learning application designed for Grade 1 students based on the CPA (Concrete–Pictorial–Abstract) approach.

## 🎯 Features

### For Students
- **CPA Learning Approach**: Progressive learning through Concrete, Pictorial, and Abstract stages
- **Gamification**: XP points, streaks, unlockable avatars, themes, and mini-games
- **Adaptive Learning**: Automatic progression/regression based on performance
- **Interactive Activities**: Drag-and-drop manipulatives, visual representations, and number exercises
- **Progress Tracking**: Detailed progress monitoring across all topics and CPA stages
- **Achievements**: Unlockable achievements and rewards for motivation

### For Teachers
- **Student Progress Monitoring**: Track individual and class-wide progress
- **CPA Stage Analysis**: Monitor student performance across concrete, pictorial, and abstract stages
- **Worksheet Generator**: Create printable worksheets for offline learning
- **Assessment Management**: Create and manage student assessments
- **Error Pattern Detection**: Identify common misconceptions and learning gaps

## 📚 Curriculum Topics

1. **Numbers to 20** - Counting and number recognition
2. **Addition & Subtraction** - Operations within 20
3. **Place Value** - Understanding tens and ones
4. **Shapes** - 2D and 3D shape recognition
5. **Measurement** - Length, weight, and capacity
6. **Fractions** - Introduction to simple fractions
7. **Patterns** - Pattern recognition and creation
8. **Time** - Telling time to hour and half hour
9. **Data Handling** - Collecting and organizing data

## 🏗️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **State Management**: Zustand with persistence
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **UI Components**: Custom components with responsive design

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd numeracy-learning-app
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Demo Credentials

**Student Login:**
- Email: `emma@student.com`
- Password: `password`

**Teacher Login:**
- Email: `rodriguez@teacher.com`
- Password: `password`

## 🎮 How It Works

### CPA Learning Stages

1. **Concrete Stage**: Students interact with physical manipulatives (blocks, counters, shapes)
2. **Pictorial Stage**: Students work with visual representations (pictures, diagrams, number lines)
3. **Abstract Stage**: Students work with numbers, symbols, and equations

### Adaptive Learning System

- Students must achieve mastery (80%+) at each stage before progressing
- If struggling at abstract level, the system reverts to pictorial/concrete for reinforcement
- Continuous assessment and error pattern detection

### Gamification Elements

- **XP Points**: Earned for completing activities and achieving milestones
- **Streaks**: Daily learning streaks with bonus rewards
- **Avatars**: Unlockable character avatars
- **Themes**: Customizable app themes
- **Mini-games**: Fun games unlocked after topic mastery
- **Achievements**: Milestone badges and rewards

## 📊 Teacher Dashboard Features

- **Class Overview**: Overall class progress and statistics
- **Individual Student Tracking**: Detailed progress per student
- **CPA Stage Analysis**: Performance breakdown by learning stage
- **Worksheet Generation**: Create printable worksheets for offline use
- **Assessment Management**: Create and assign assessments
- **Error Pattern Analysis**: Identify common misconceptions

## 🎨 UI/UX Design

- **Child-Friendly Interface**: Bright colors, large buttons, and intuitive navigation
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Accessibility**: Audio instructions and visual cues for diverse learners
- **Offline Support**: Printable worksheets for low-connectivity areas

## 🔧 Development

### Project Structure
```
src/
├── components/          # React components
├── stores/             # Zustand state management
├── types/              # TypeScript type definitions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Future Enhancements

- **Multi-language Support**: Support for multiple languages
- **Advanced Analytics**: Detailed learning analytics and insights
- **Parent Portal**: Parent dashboard for monitoring child's progress
- **Offline Mode**: Full offline functionality with sync
- **AI-powered Recommendations**: Personalized learning paths
- **Collaborative Features**: Peer learning and group activities

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support and questions, please open an issue in the repository. 