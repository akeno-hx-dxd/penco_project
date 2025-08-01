import Dexie from 'dexie';

// Define the database
class PencoDatabase extends Dexie {
  constructor() {
    super('PencoDatabase');
    
    // Define schemas
    this.version(1).stores({
      cart: '++id, productId, name, price, quantity, image, addedAt',
      cartHistory: '++id, orderId, items, total, orderDate, status, customerInfo',
      likedContent: '++id, contentId, contentType, title, image, likedAt'
    });
  }
}

// Create database instance
export const db = new PencoDatabase();

// Add some debugging
db.open().then(() => {
  console.log('=== DATABASE READY ===');
  console.log('Database name:', db.name);
  console.log('Database version:', db.verno);
  console.log('Tables:', db.tables.map(t => t.name));
  console.log('=== END DATABASE READY ===');
}).catch(error => {
  console.error('Database failed to initialize:', error);
});

// Global debug function for testing
window.testCart = async () => {
  try {
    console.log('=== TESTING CART FUNCTIONALITY ===');
    
    // Test adding an item
    const testItem = {
      productId: 'test-1',
      name: 'Test Product',
      price: 99.99,
      quantity: 1,
      image: 'test.jpg',
      addedAt: new Date().toISOString()
    };
    
    console.log('Adding test item:', testItem);
    const result = await db.cart.add(testItem);
    console.log('Add result:', result);
    
    // Get all items
    const allItems = await db.cart.toArray();
    console.log('All cart items:', allItems);
    
    // Get count
    const count = await db.cart.count();
    console.log('Cart count:', count);
    
    console.log('=== END CART TEST ===');
    return { result, allItems, count };
  } catch (error) {
    console.error('Cart test failed:', error);
    return { error };
  }
};

// Database utility functions
export const dbUtils = {
  // Clear all data (for development/testing)
  async clearAll() {
    await db.cart.clear();
    await db.cartHistory.clear();
    await db.likedContent.clear();
  },

  // Get database info
  async getInfo() {
    const cartCount = await db.cart.count();
    const historyCount = await db.cartHistory.count();
    const likedCount = await db.likedContent.count();
    
    return {
      cartItems: cartCount,
      orderHistory: historyCount,
      likedItems: likedCount
    };
  }
};