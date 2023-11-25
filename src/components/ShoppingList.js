import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/ShoppingLists.module.css';
import { shoppingData, createShoppingList } from '../data/ShoppingListData';

const ShoppingLists = () => {
  const [newListName, setNewListName] = useState('');

  const handleCreateList = () => {
    if (newListName.trim() !== '') {
      const newList = {
        id: shoppingData.length + 1,
        name: newListName,
        user: 'New User',
        items: [],
      };

      const updatedData = createShoppingList(newList);
      // You can save the updatedData to a state or database as needed
      // For simplicity, I'll log it for now
      console.log('Updated Shopping Data:', updatedData);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Shopping Lists</h2>
      <ul className={styles.list}>
        {shoppingData.map((list) => (
          <li key={list.id} className={styles.item}>
            <Link to={`/shopping-lists/${list.id}`} className={styles.link}>
              {list.name} - {list.user}
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.newListForm}>
        <input
          type="text"
          placeholder="New Shopping List"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
        <button onClick={handleCreateList}>Create List</button>
      </div>
    </div>
  );
};

export default ShoppingLists;
