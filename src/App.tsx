// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Dashboard from './pages/Dashboard';
import SpendPage from './pages/Spend';
import IncomePage from './pages/Income';
import InvestPage from './pages/Invest';
import AlertsPage from './pages/Alerts';
import RemindersPage from './pages/Reminders';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading…</div>;

  const PrivateRoute = ({ children }: { children: React.ReactElement }) =>
    user ? children : <Navigate to="/login" replace />;

  return (
    <>
      {user && <Header />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/spend"
          element={
            <PrivateRoute>
              <SpendPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/income"
          element={
            <PrivateRoute>
              <IncomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/invest"
          element={
            <PrivateRoute>
              <InvestPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/alerts"
          element={
            <PrivateRoute>
              <AlertsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/reminders"
          element={
            <PrivateRoute>
              <RemindersPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
