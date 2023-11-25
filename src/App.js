import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShoppingLists from './components/ShoppingList';
import ShoppingListDetail from './components/ShoppingListDetail';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShoppingLists />} />
        <Route path="/shopping-lists/:id" element={<ShoppingListDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
