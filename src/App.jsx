import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import NoteDetail from './pages/NoteDetail';
import Tasks from './pages/Tasks';
import Search from './pages/Search';
import Chat from './pages/Chat';

// Components
import PrivateRoute from './components/PrivateRoute';
import AppShell from './layouts/AppShell';

function App() {
  const { isAuthenticated, init } = useAuthStore();

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    init();
  }, [init]);

  return (
    <Router>
      <div className="min-h-screen">
        <Toaster position="top-right" />
        
        <Routes>
          {/* Landing Page */}
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/home" /> : <Landing />} 
          />

          {/* Public routes */}
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/home" /> : <Login />} 
          />
          <Route 
            path="/register" 
            element={isAuthenticated ? <Navigate to="/home" /> : <Register />} 
          />
          <Route 
            path="/forgot-password" 
            element={isAuthenticated ? <Navigate to="/home" /> : <ForgotPassword />} 
          />

          {/* Private routes */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <AppShell>
                  <Home />
                </AppShell>
              </PrivateRoute>
            }
          />
          <Route
            path="/note/:id"
            element={
              <PrivateRoute>
                <AppShell>
                  <NoteDetail />
                </AppShell>
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <AppShell>
                  <Tasks />
                </AppShell>
              </PrivateRoute>
            }
          />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <AppShell>
                  <Search />
                </AppShell>
              </PrivateRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <AppShell>
                  <Chat />
                </AppShell>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
