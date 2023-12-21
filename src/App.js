import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShoppingLists from './components/ShoppingList';
import ShoppingListDetail from './components/ShoppingListDetail';
import Cs_ShoppingList from './components/cs_ShoppingList';
import Cs_ShoppingListDetial from './components/cs_ShoppingListDetail';
import De_ShoppingList from './components/de_ShoppingList';
import De_ShoppingListDetial from './components/de_ShoppingListDetail';
import Es_ShoppingList from './components/es_ShoppingList';
import Es_ShoppingListDetial from './components/es_ShoppingListDetail';
import { ThemeProvider } from './components/ThemeContext';
import './css/App.css';


const App = () => {

  const [language, setLanguage] = useState('en');

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  }

  return (
    <ThemeProvider>
      <div className='language-selector'>
        <select value={language} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="cs">Čeština</option>
          <option value="de">Deutsch</option>
          <option value="es">Español</option>
        </select>
      </div>
    <Router>
      <Routes>
        {language === 'cs' ? <Route path="/" element={<Cs_ShoppingList />} /> : null}
        {language === 'cs' ? <Route path="/shopping-lists/:id" element={<Cs_ShoppingListDetial />} /> : null}
        {language === 'en' ? <Route path="/" element={<ShoppingLists />} /> : null}
        {language === 'en' ? <Route path="/shopping-lists/:id" element={<ShoppingListDetail />} /> : null}
        {language === 'de' ? <Route path="/" element={<De_ShoppingList />} /> : null}
        {language === 'de' ? <Route path="/shopping-lists/:id" element={<De_ShoppingListDetial />} /> : null}
        {language === 'es' ? <Route path="/" element={<Es_ShoppingList />} /> : null}
        {language === 'es' ? <Route path="/shopping-lists/:id" element={<Es_ShoppingListDetial />} /> : null}
      </Routes>
    </Router>
    </ThemeProvider>
  );
};

export default App;
