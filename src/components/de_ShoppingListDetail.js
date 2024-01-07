import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from '../css/ShoppingListDetail.module.css';
import { ThemeContext } from './ThemeContext';
import { PieChart, Pie, Cell } from 'recharts';

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

  const pieChartData = items.map((item) => ({
    name: item.name,
    value: item.status === 'done' ? 1 : 0
  }));

  const summarisedData = pieChartData.reduce((acc, item) => {
    if (item.value === 1) {
      acc[0].value += 1;
    } else if (item.value === 0) {
      acc[1].value += 1;
    }
    return acc;
  }, [{ name: 'Value 1', value: 0 }, { name: 'Value 0', value: 0 }]);

  //console.log(summarisedData);
  //console.log(pieChartData);
  
  const lightModeColors = ["#2ecc71", "#e74c3c"];
  const darkModeColors = [ "#003a4a", "#460000"];

  const getFillColor = (index) => {
    return darkMode ? darkModeColors[index % darkModeColors.length] : lightModeColors[index % lightModeColors.length];
  };

  // Vykreslení komponenty
  return (
    <div className={styles.main}>
    <div className={themeClass}>
      <div className={styles.container}>
        <h2>Einkaufsliste detail</h2>

        {/* Zobrazení informací o nákupním seznamu */}
        {shoppingList && (
          <div>
            <h2>Name: {shoppingList.name}</h2>
            <h2>Benutzer: {shoppingList.user}</h2>
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
                  {item.status === 'todo' ? 'als erledigt markieren' : 'Als erledigt markieren'}
                </button>
                <button onClick={() => handleDeleteItem(item.id)}>löschen</button>
              </div>
            </li>
          ))}
        </ul>

        {/* Formulář pro přidání nové položky */}
        <div className={styles.newItemForm}>
          <input
            type="text"
            placeholder="Neuer Gegenstand"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <button onClick={handleAddItem}>Artikel hinzufügen</button>
        </div>

        {/* Vykreslení grafu stavu položek */}
        <div className={styles.pieChart}>
            <PieChart width={400} height={400}>
              <Pie
                data={summarisedData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {summarisedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getFillColor(index)} />
                ))}
              </Pie>
            </PieChart>
          </div>
            
        {/* Odkaz na návrat na seznam nákupních seznamů */}
        <Link to="/" className={styles.backButton}>
        Zurück zu den Einkaufslisten
        </Link>
        <div>
          <button className={styles.darkModeButton} onClick={toggleDarkMode}>
            {darkMode ? 'Lichtmodus' : 'Dunkler Modus'}
          </button>
        </div>
      </div>
      
    </div>
    </div>
  );
};

export default ShoppingListDetail;
