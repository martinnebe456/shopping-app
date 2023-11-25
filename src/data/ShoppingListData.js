export const shoppingData = [
    {
      id: 1,
      name: 'Groceries',
      user: 'John',
      items: [
        { id: 1, name: 'Milk', status: 'todo' },
        { id: 2, name: 'Bread', status: 'todo' },
        { id: 3, name: 'Eggs', status: 'todo' },
        { id: 4, name: 'Fruits', status: 'done' },
        { id: 5, name: 'Vegetables', status: 'done' },
      ],
    },
    {
      id: 2,
      name: 'Electronics',
      user: 'Alice',
      items: [
        { id: 6, name: 'Laptop', status: 'done' },
        { id: 7, name: 'Phone', status: 'todo' },
        { id: 8, name: 'Headphones', status: 'todo' },
        { id: 9, name: 'Camera', status: 'todo' },
        { id: 10, name: 'Smartwatch', status: 'todo' },
      ],
    },
    {
      id: 3,
      name: 'Clothing',
      user: 'Bob',
      items: [
        { id: 11, name: 'T-shirt', status: 'done' },
        { id: 12, name: 'Jeans', status: 'done' },
        { id: 13, name: 'Sweater', status: 'done' },
        { id: 14, name: 'Socks', status: 'todo' },
        { id: 15, name: 'Shoes', status: 'todo' },
      ],
    },
  ];
  
  export const addItemToShoppingList = (listId, newItem) => {
    const updatedData = shoppingData.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          items: [...list.items, newItem],
        };
      }
      return list;
    });
  
    return updatedData;
  };
  
  export const createShoppingList = (newList) => {
    const updatedData = [...shoppingData, newList];
    return updatedData;
  };