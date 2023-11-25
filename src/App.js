import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import ShoppingLists from './components/ShoppingList';
import ShoppingListDetail from './components/ShoppingListDetail';
import Login from './components/Login';
import { authenticateUser } from './services/AuthService';

const ProtectedRoute = ({ element }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const handleLogin = (user) => {
    setAuthenticatedUser(user);
  };

  return authenticatedUser ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: window.location.pathname }} replace />
  );
};

const App = () => {
  const handleLogin = (user) => {
    setAuthenticatedUser(user);
  };

  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute element={<ShoppingLists />} />}
        />
        <Route
          path="/shopping-lists/:id"
          element={<ProtectedRoute element={<ShoppingListDetail />} />}
        />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
