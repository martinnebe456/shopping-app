import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShoppingLists from './components/ShoppingList';
import ShoppingListDetail from './components/ShoppingListDetail';
import { ThemeProvider } from './components/ThemeContext';


const App = () => {

  return (
    <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<ShoppingLists />} />
        <Route path="/shopping-lists/:id" element={<ShoppingListDetail />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
};

export default App;
