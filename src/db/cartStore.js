import { db } from './database.js';

export const cartStore = {
  // Add item to cart
  async addItem(product) {
    try {
      // Check if item already exists in cart
      const existingItem = await db.cart
        .where('productId')
        .equals(product.productId)
        .first();

      if (existingItem) {
        // Update quantity if item exists
        return await db.cart.update(existingItem.id, {
          quantity: existingItem.quantity + (product.quantity || 1)
        });
      } else {
        // Add new item
        return await db.cart.add({
          productId: product.productId,
          name: product.name,
          price: product.price,
          quantity: product.quantity || 1,
          image: product.image,
          addedAt: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  },

  // Remove item from cart
  async removeItem(cartItemId) {
    try {
      return await db.cart.delete(cartItemId);
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  },

  // Update item quantity
  async updateQuantity(cartItemId, quantity) {
    try {
      if (quantity <= 0) {
        return await this.removeItem(cartItemId);
      }
      return await db.cart.update(cartItemId, { quantity });
    } catch (error) {
      console.error('Error updating item quantity:', error);
      throw error;
    }
  },

  // Get all cart items
  async getAll() {
    try {
      return await db.cart.orderBy('addedAt').reverse().toArray();
    } catch (error) {
      console.error('Error getting cart items:', error);
      throw error;
    }
  },

  // Get cart total
  async getTotal() {
    try {
      const items = await this.getAll();
      return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    } catch (error) {
      console.error('Error calculating cart total:', error);
      throw error;
    }
  },

  // Get cart item count
  async getItemCount() {
    try {
      const items = await this.getAll();
      return items.reduce((count, item) => count + item.quantity, 0);
    } catch (error) {
      console.error('Error getting cart item count:', error);
      throw error;
    }
  },

  // Clear entire cart
  async clear() {
    try {
      return await db.cart.clear();
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },

  // Check if item exists in cart
  async hasItem(productId) {
    try {
      const item = await db.cart
        .where('productId')
        .equals(productId)
        .first();
      return !!item;
    } catch (error) {
      console.error('Error checking if item exists in cart:', error);
      throw error;
    }
  }
};