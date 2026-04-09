const { v4: uuidv4 } = require('uuid');

// In-memory database (replace with real database in production)
let users = [
  {
    id: uuidv4(),
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1-555-0101',
    createdAt: new Date('2026-01-15')
  },
  {
    id: uuidv4(),
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1-555-0102',
    createdAt: new Date('2026-02-10')
  },
  {
    id: uuidv4(),
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1-555-0103',
    createdAt: new Date('2026-03-05')
  }
];

class User {
  // Get all users
  static getAll() {
    return users;
  }

  // Get user by ID
  static getById(id) {
    return users.find(user => user.id === id);
  }

  // Create new user
  static create(userData) {
    const newUser = {
      id: uuidv4(),
      ...userData,
      createdAt: new Date()
    };
    users.push(newUser);
    return newUser;
  }

  // Update user
  static update(id, userData) {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;
    
    users[userIndex] = {
      ...users[userIndex],
      ...userData,
      id: users[userIndex].id, // Prevent ID change
      createdAt: users[userIndex].createdAt // Prevent creation date change
    };
    return users[userIndex];
  }

  // Delete user
  static delete(id) {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;
    
    users.splice(userIndex, 1);
    return true;
  }

  // Search users
  static search(query) {
    return users.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    );
  }
}

module.exports = User;