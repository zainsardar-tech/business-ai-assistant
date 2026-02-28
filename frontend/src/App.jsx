import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ChatAssistant from './pages/ChatAssistant';
import DocumentManager from './pages/DocumentManager';
import Sidebar from './components/Sidebar';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  // Simple dev-time wrapper
  const PrivateRoute = ({ children }) => {
    // For dev we just let them in, or check token.
    return children;
  };

  return (
    <div className="flex bg-dark-bg min-h-screen text-slate-200">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden pt-16 md:pt-0">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/chat" element={<PrivateRoute><ChatAssistant /></PrivateRoute>} />
          <Route path="/documents" element={<PrivateRoute><DocumentManager /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
