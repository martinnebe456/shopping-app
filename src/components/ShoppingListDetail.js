import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from '../css/ShoppingListDetail.module.css';
import { shoppingData } from '../data/ShoppingListData';

const ShoppingListDetail = () => {
  const { id } = useParams();
  const [newItemName, setNewItemName] = useState('');
  const [items, setItems] = useState(shoppingData.find((item) => item.id.toString() === id)?.items || []);
  const shoppingList = shoppingData.find((item) => item.id.toString() === id);

  const handleAddItem = () => {
    if (newItemName.trim() !== '') {
      const newItem = {
        id: items.length + 1,
        name: newItemName,
        status: 'todo',
      };

      setItems((prevItems) => [...prevItems, newItem]);
      setNewItemName('');
    }
  };

  const handleDeleteItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleToggleDone = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, status: item.status === 'todo' ? 'done' : 'todo' } : item
      )
    );
  };

  return (
    <div className={styles.container}>
      <h2>Shopping List Detail</h2>
      {shoppingList && (
        <div>
          <h2>Name: {shoppingList.name}</h2>
          <h2>User: {shoppingList.user}</h2>
        </div>
      )}
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={`${styles.item} ${item.status === 'done' ? styles.done : ''}`}>
            <span>{item.name} - Status: {item.status}</span>
            <div>
              <button onClick={() => handleToggleDone(item.id)}>
                {item.status === 'todo' ? 'Mark as Done' : 'Mark as Todo'}
              </button>
              <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.newItemForm}>
        <input
          type="text"
          placeholder="New Item"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>

      <Link to="/" className={styles.backButton}>
        Back to Shopping Lists
      </Link>
    </div>
  );
};

export default ShoppingListDetail;
