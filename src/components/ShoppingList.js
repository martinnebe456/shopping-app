import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/ShoppingLists.module.css';
import { getShoppingLists, createShoppingList, deleteShoppingList, archiveShoppingList } from '../services/ShoppingListService';
import { users } from '../data/Users';
import { ThemeContext } from './ThemeContext';

const ShoppingLists = () => {
  const [newListName, setNewListName] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [shoppingData, setShoppingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const themeClass = darkMode ? styles.darkMode : styles.lightMode;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getShoppingLists();
        setShoppingData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shopping lists:', error);
        setError('Error fetching shopping lists');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateList = async () => {
    if (newListName.trim() !== '' && selectedUser.trim() !== '') {
      const newList = {
        name: newListName,
        user: selectedUser,
        items: [],
        archived: false,
        sharedUser: [{
          userName: selectedUser
        }],
      };

      try {
        const createdList = await createShoppingList(newList);
        const updatedData = [...shoppingData, createdList];
        setShoppingData(updatedData);
      } catch (error) {
        console.error('Error creating shopping list:', error);
      }
    }
  };

  const toggleArchived = () => {
    setShowArchived(!showArchived);
  };

  const deleteList = async (listId) => {
    setConfirmDeleteId(listId);

    try {
      const listExists = shoppingData.some((list) => list.id === listId);

      if (listExists) {
        const updatedData = await deleteShoppingList(listId);
        setShoppingData(updatedData);
      } else {
        console.error('List with ID', listId, 'does not exist.');
      }
    } catch (error) {
      console.error('Error deleting shopping list:', error);
    }
  };

  const confirmDelete = async () => {
    try {
      const updatedData = await deleteShoppingList(confirmDeleteId);
      setShoppingData(updatedData);
      setConfirmDeleteId(null);
    } catch (error) {
      console.error('Error deleting shopping list:', error);
      setError('Error deleting shopping list');
    }
  };


  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const canDeleteList = (list) => {
    return list.sharedUser && list.sharedUser.some((user) => user.userName === selectedUser);
  };

  const archiveList = async (listId) => {
    try {
      const updatedData = await archiveShoppingList(listId);
      setShoppingData(updatedData);
    } catch (error) {
      console.error('Error archiving shopping list:', error);
    }
  };

  const canArchiveList = (list) => {
    return list.user === selectedUser;
  };

  return (
    <body className={themeClass}>
      <div className={styles.container}>
        {/* Dropdown pro výběr uživatele */}
        <div className={styles.userDropdown}>
          <label>
            Select user:
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className={styles.dropdown}
            >
              <option value="">Select user</option>
              {users.map((user) => (
                <option key={user.id} value={user.username}>
                  {user.username}
                </option>
              ))}
            </select>
          </label>
        </div>

        <h2>Shopping Lists</h2>

        {/* Checkbox pro zobrazení archivovaných seznamů */}
        <label>
          Show archived lists
          <input
            type="checkbox"
            checked={showArchived}
            onChange={toggleArchived}
            className={styles.checkbox}
          />
        </label>

        {/* Vykreslení seznamu */}
        {!loading && !error && (
          <ul className={styles.list}>
            {shoppingData.map((list) => {
              const shouldShow = showArchived || !list.archived;

              return shouldShow && (
                <li key={list.id} className={styles.item}>
                  <Link to={`/shopping-lists/${list.id}`} className={styles.link}>
                    {list.name} - {list.user}
                    {list.archived && ' (Archived)'}
                  </Link>

                  {/* Tlačítka pro smazání a archivaci seznamu */}
                  {canDeleteList(list) && (
                    <div>
                      <button onClick={() => deleteList(list.id)} className={styles.deleteButton}>
                        Delete
                      </button>
                      {confirmDeleteId === list.id && (
                        <div>
                          <p>Are you sure you want to delete this list?</p>
                          <button onClick={confirmDelete} className={styles.confirmButton}>
                            Confirm
                          </button>
                          <button onClick={cancelDelete} className={styles.cancelButton}>
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  {canArchiveList(list) && (
                    <button onClick={() => archiveList(list.id)} className={styles.archiveButton}>
                      Archive
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {/* Formulář pro vytvoření nového seznamu */}
        <div className={styles.newListForm}>
          <input
            type="text"
            placeholder="New Shopping List"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <button onClick={handleCreateList} className={styles.createButton}>
            Create List
          </button>
        </div>
        <div>
          <button className={styles.darkModeButton} onClick={toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </body>
  );
};

export default ShoppingLists;
