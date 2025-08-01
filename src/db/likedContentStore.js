import { db } from './database.js';

export const likedContentStore = {
  // Add content to liked list
  async addLike(content) {
    try {
      // Check if already liked
      const existing = await db.likedContent
        .where('contentId')
        .equals(content.contentId)
        .first();

      if (existing) {
        return existing; // Already liked
      }

      return await db.likedContent.add({
        contentId: content.contentId,
        contentType: content.contentType, // 'project', 'portfolio', 'gallery', etc.
        title: content.title,
        image: content.image,
        likedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error adding liked content:', error);
      throw error;
    }
  },

  // Remove content from liked list
  async removeLike(contentId) {
    try {
      const item = await db.likedContent
        .where('contentId')
        .equals(contentId)
        .first();
      
      if (item) {
        return await db.likedContent.delete(item.id);
      }
      return false;
    } catch (error) {
      console.error('Error removing liked content:', error);
      throw error;
    }
  },

  // Toggle like status
  async toggleLike(content) {
    try {
      const isLiked = await this.isLiked(content.contentId);
      
      if (isLiked) {
        await this.removeLike(content.contentId);
        return false;
      } else {
        await this.addLike(content);
        return true;
      }
    } catch (error) {
      console.error('Error toggling like status:', error);
      throw error;
    }
  },

  // Check if content is liked
  async isLiked(contentId) {
    try {
      const item = await db.likedContent
        .where('contentId')
        .equals(contentId)
        .first();
      return !!item;
    } catch (error) {
      console.error('Error checking like status:', error);
      throw error;
    }
  },

  // Get all liked content
  async getAll() {
    try {
      return await db.likedContent.orderBy('likedAt').reverse().toArray();
    } catch (error) {
      console.error('Error getting liked content:', error);
      throw error;
    }
  },

  // Get liked content by type
  async getByType(contentType) {
    try {
      return await db.likedContent
        .where('contentType')
        .equals(contentType)
        .reverse()
        .sortBy('likedAt');
    } catch (error) {
      console.error('Error getting liked content by type:', error);
      throw error;
    }
  },

  // Get like count
  async getCount() {
    try {
      return await db.likedContent.count();
    } catch (error) {
      console.error('Error getting like count:', error);
      throw error;
    }
  },

  // Clear all liked content
  async clear() {
    try {
      return await db.likedContent.clear();
    } catch (error) {
      console.error('Error clearing liked content:', error);
      throw error;
    }
  }
};