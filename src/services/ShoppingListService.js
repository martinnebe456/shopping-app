const API_URL = 'http://localhost:3005';

export const getShoppingLists = async () => {
  try {
    const response = await fetch(`${API_URL}/shoppingData`);
    if (!response.ok) {
      throw new Error(`Error fetching shopping lists: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('ShoppingListService error:', error);
    throw error;
  }
};

export const createShoppingList = async (newList) => {
  try {
    const response = await fetch(`${API_URL}/shoppingData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newList),
    });
    if (!response.ok) {
      throw new Error(`Error creating shopping list: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('ShoppingListService error:', error);
    throw error;
  }
};

export const deleteShoppingList = async (listId) => {
  try {
    const response = await fetch(`${API_URL}/shoppingData/${listId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting shopping list: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('ShoppingListService error:', error);
    throw error;
  }
};

export const archiveShoppingList = async (listId) => {
  try {
    const response = await fetch(`${API_URL}/shoppingData/${listId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ archived: true }),
    });

    if (!response.ok) {
      throw new Error(`Error archiving shopping list: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('ShoppingListService error:', error);
    throw error;
  }
};

export const addItemToShoppingList = async (listId, newItem) => {
  try {
    const response = await fetch(`${API_URL}/shoppingData/${listId}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });

    if (!response.ok) {
      throw new Error(`Error adding item to shopping list: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('ShoppingListService error:', error);
    throw error;
  }
};

export const deleteItemFromShoppingList = async (listId, itemId) => {
  try {
    const response = await fetch(`${API_URL}/items/${itemId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Error deleting item from shopping list: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('ShoppingListService error:', error);
    throw error;
  }
};

export const toggleItemStatusInShoppingList = async (listId, itemId) => {
  try {
    const response = await fetch(`${API_URL}/shoppingData/${listId}/items/${itemId}`, {
      method: 'PATCH',
    });

    if (!response.ok) {
      throw new Error(`Error toggling item status in shopping list: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('ShoppingListService error:', error);
    throw error;
  }
};
