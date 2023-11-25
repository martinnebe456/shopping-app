import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/ShoppingLists.module.css';
import { shoppingData, createShoppingList, deleteShoppingList, addUserToShoppingList } from '../data/ShoppingListData';
import { users } from '../data/Users';

const ShoppingLists = () => {
  const [newListName, setNewListName] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleCreateList = () => {
    if (newListName.trim() !== '' && selectedUser.trim() !== '') {
      const newList = {
        id: shoppingData.length + 1,
        name: newListName,
        user: selectedUser,
        items: [],
      };

      const updatedData = createShoppingList(newList);
      console.log('Updated Shopping Data:', updatedData);
      setNewListName('');
    }
  };


  const toggleArchived = () => {
    setShowArchived(!showArchived);
  };

  const deleteList = (listId) => {
    setConfirmDeleteId(listId);
  };

const confirmDelete = () => {
  const updatedData = deleteShoppingList(confirmDeleteId, selectedUser);
  console.log('Updated Shopping Data:', updatedData);
  setConfirmDeleteId(null);
};

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const canDeleteList = (list) => {
    return list.sharedUser.some((user) => user.userName === selectedUser);
  };

  return (
    <div className={styles.container}>
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
      <label>
        Show archived lists
        <input
          type="checkbox"
          checked={showArchived}
          onChange={toggleArchived}
          className={styles.checkbox}
        />
      </label>

      <ul className={styles.list}>
        {shoppingData.map((list) => {
          const shouldShow = showArchived || !list.archived;

          return shouldShow && (
            <li key={list.id} className={styles.item}>
              <Link to={`/shopping-lists/${list.id}`} className={styles.link}>
                {list.name} - {list.user}
                {list.archived && ' (Archived)'}
              </Link>
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
            </li>
          );
        })}
      </ul>

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
    </div>
  );
};

export default ShoppingLists;
