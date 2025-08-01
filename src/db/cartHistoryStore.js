import { db } from './database.js';
import { cartStore } from './cartStore.js';

export const cartHistoryStore = {
  // Add order to history (called after successful checkout)
  async addOrder(customerInfo, apiResponse = null) {
    try {
      const cartItems = await cartStore.getAll();
      const total = await cartStore.getTotal();
      
      if (cartItems.length === 0) {
        throw new Error('Cannot create order from empty cart');
      }

      const orderId = apiResponse?.orderId || `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const order = {
        orderId,
        items: cartItems.map(item => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        total,
        orderDate: new Date().toISOString(),
        status: apiResponse?.status || 'pending',
        customerInfo: {
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
          address: customerInfo.address
        },
        apiResponse
      };

      return await db.cartHistory.add(order);
    } catch (error) {
      console.error('Error adding order to history:', error);
      throw error;
    }
  },

  // Get all order history
  async getAll() {
    try {
      return await db.cartHistory.orderBy('orderDate').reverse().toArray();
    } catch (error) {
      console.error('Error getting order history:', error);
      throw error;
    }
  },

  // Get order by ID
  async getById(id) {
    try {
      return await db.cartHistory.get(id);
    } catch (error) {
      console.error('Error getting order by ID:', error);
      throw error;
    }
  },

  // Get order by order ID
  async getByOrderId(orderId) {
    try {
      return await db.cartHistory
        .where('orderId')
        .equals(orderId)
        .first();
    } catch (error) {
      console.error('Error getting order by order ID:', error);
      throw error;
    }
  },

  // Update order status
  async updateStatus(id, status) {
    try {
      return await db.cartHistory.update(id, { 
        status,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  // Get order statistics
  async getStats() {
    try {
      const orders = await this.getAll();
      const totalOrders = orders.length;
      const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
      const averageOrder = totalOrders > 0 ? totalSpent / totalOrders : 0;
      
      const statusCounts = orders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {});

      return {
        totalOrders,
        totalSpent,
        averageOrder,
        statusCounts
      };
    } catch (error) {
      console.error('Error getting order statistics:', error);
      throw error;
    }
  },

  // Clear order history
  async clear() {
    try {
      return await db.cartHistory.clear();
    } catch (error) {
      console.error('Error clearing order history:', error);
      throw error;
    }
  }
};