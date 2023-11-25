// AuthService.js
import { users } from '../data/Users';

export const authenticateUser = (username, password) => {
  const user = users.find((u) => u.username === username && u.password === password);
  return user ? user : null;
};
