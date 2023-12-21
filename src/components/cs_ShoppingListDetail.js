import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from '../css/ShoppingListDetail.module.css';
import { ThemeContext } from './ThemeContext';

// Komponenta pro detailní zobrazení nákupního seznamu
const ShoppingListDetail = () => {
  // Získání id seznamu z URL parametrů
  const { id } = useParams();

  // Stavové proměnné pro správu formuláře a dat
  const [newItemName, setNewItemName] = useState('');
  const [items, setItems] = useState([]);
  const [shoppingList, setShoppingList] = useState(null);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const themeClass = darkMode ? styles.darkMode : styles.lightMode;

  // Načtení dat nákupního seznamu při prvním renderu komponenty nebo změně id
  useEffect(() => {
    const fetchShoppingList = async () => {
      try {
        const response = await fetch(`http://localhost:3005/shoppingData/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching shopping list: ${response.statusText}`);
        }
        const data = await response.json();
        setShoppingList(data);
        setItems(data.items || []);
      } catch (error) {
        console.error('Error fetching shopping list:', error);
      }
    };

    fetchShoppingList();
  }, [id]);

  // Přidání nové položky do seznamu
  const handleAddItem = async () => {
    if (newItemName.trim() !== '') {
      try {
        const response = await fetch(`http://localhost:3005/shoppingData/${id}/items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newItemName, status: 'todo' }),
        });

        if (!response.ok) {
          throw new Error(`Error adding item: ${response.statusText}`);
        }

        const updatedList = await response.json();
        setItems(updatedList.items || []);
        setNewItemName('');
      } catch (error) {
        console.error('Error adding item:', error);
      }
    }
  };

  // Smazání položky ze seznamu
  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:3005/shoppingData/${id}/items/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error deleting item: ${response.statusText}`);
      }

      const updatedList = await response.json();
      setItems(updatedList.items || []);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Přepnutí stavu položky mezi "todo" a "done"
  const handleToggleDone = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:3005/shoppingData/${id}/items/${itemId}`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        throw new Error(`Error toggling item status: ${response.statusText}`);
      }

      const updatedList = await response.json();
      setItems(updatedList.items || []);
    } catch (error) {
      console.error('Error toggling item status:', error);
    }
  };

  // Vykreslení komponenty
  return (
    <div className={styles.main}>
    <div className={themeClass}>
      <div className={styles.container}>
        <h2>Detail nákupního seznamu</h2>

        {/* Zobrazení informací o nákupním seznamu */}
        {shoppingList && (
          <div>
            <h2>Název: {shoppingList.name}</h2>
            <h2>Uživatel: {shoppingList.user}</h2>
          </div>
        )}

        {/* Vykreslení seznamu položek */}
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id} className={`${styles.item} ${item.status === 'done' ? styles.done : ''}`}>
              <span>{item.name} - Status: {item.status}</span>
              <div>
                {/* Tlačítka pro přepnutí stavu a smazání položky */}
                <button onClick={() => handleToggleDone(item.id)}>
                  {item.status === 'todo' ? 'Dokončit' : 'Zrušit dokončení'}
                </button>
                <button onClick={() => handleDeleteItem(item.id)}>Smazat</button>
              </div>
            </li>
          ))}
        </ul>

        {/* Formulář pro přidání nové položky */}
        <div className={styles.newItemForm}>
          <input
            type="text"
            placeholder="Nová položka"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <button onClick={handleAddItem}>Přidat položku</button>
        </div>
            
        {/* Odkaz na návrat na seznam nákupních seznamů */}
        <Link to="/" className={styles.backButton}>
          Zpátky na seznam nákupních seznamů
        </Link>
        <div>
          <button className={styles.darkModeButton} onClick={toggleDarkMode}>
            {darkMode ? 'Světly režim' : 'Tmavý režim'}
          </button>
        </div>
      </div>
      
    </div>
    </div>
  );
};

export default ShoppingListDetail;
