# RecollectAI Frontend

Modern, responsive React frontend for RecollectAI - An AI-powered voice note-taking application for students.

## Features

- 🎤 **Real-time Audio Recording**: Capture lectures, ideas, and reminders with a single tap
- 🤖 **AI-Powered Processing**: Automatic transcription, summarization, and categorization
- 📝 **Smart Notes**: Auto-generated titles, summaries, and key points
- ✅ **Task Management**: Automatically extract deadlines and create tasks
- 🔍 **Powerful Search**: Full-text search across all your notes
- 🎯 **Student Companion Mode**: Highlight important moments with keywords
- 📱 **Responsive Design**: Beautiful UI that works on all devices

## Tech Stack

- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Zustand** - Lightweight state management
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (optional):
```bash
VITE_API_BASE_URL=http://localhost:5006/api
```

3. Start the development server:
```bash
npm run dev
```

The app will start on http://localhost:3000

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.jsx
│   ├── RecordButton.jsx
│   ├── NoteCard.jsx
│   └── PrivateRoute.jsx
├── pages/              # Page components
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── ForgotPassword.jsx
│   ├── Home.jsx
│   ├── NoteDetail.jsx
│   ├── Tasks.jsx
│   └── Search.jsx
├── services/           # API services
│   └── api.js
├── store/              # State management
│   └── authStore.js
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Key Features

### Authentication
- Email/password login and registration
- Password reset functionality
- JWT-based authentication
- Protected routes

### Recording Interface
- One-tap recording with big microphone button
- Real-time recording timer
- Visual feedback during recording
- Progress indicator during upload

### Notes Management
- Grid view of all notes
- Category filtering
- Auto-generated summaries and key points
- Highlighted sections from companion mode
- Full transcript view (collapsible)
- Delete notes

### Tasks & Deadlines
- View all tasks
- Filter by category
- Mark tasks as complete
- Create tasks manually
- Upcoming tasks section (next 7 days)
- Delete tasks

### Search
- Full-text search across all content
- Category filtering
- Real-time results

## Usage

1. **Register/Login**: Create an account or sign in
2. **Record**: Tap the big microphone button to start recording
3. **Stop**: Tap the square button to stop and process
4. **View Notes**: Browse your AI-processed notes on the home screen
5. **Manage Tasks**: Check deadlines and tasks on the Tasks page
6. **Search**: Find specific notes using the search feature

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari

**Note**: Microphone access is required for recording functionality.

