# Database Integration with Dexie IndexedDB

This directory contains the IndexedDB integration using Dexie for the Penco project.

## Overview

The database provides client-side storage for:
- **Cart**: Current shopping cart items (single active cart)
- **Cart History**: Past order records after checkout
- **Liked Content**: User's liked/favorited content

## Database Schema

### Cart Store
```javascript
{
  id: number,           // Auto-increment primary key
  productId: string,    // Unique product identifier
  name: string,         // Product name
  price: number,        // Product price
  quantity: number,     // Quantity in cart
  image: string,        // Product image URL
  addedAt: string       // ISO timestamp when added
}
```

### Cart History Store
```javascript
{
  id: number,           // Auto-increment primary key
  orderId: string,      // Unique order identifier
  items: array,         // Array of ordered items
  total: number,        // Total order amount
  orderDate: string,    // ISO timestamp of order
  status: string,       // Order status (pending, completed, etc.)
  customerInfo: object, // Customer details
  apiResponse: object   // API response data (optional)
}
```

### Liked Content Store
```javascript
{
  id: number,           // Auto-increment primary key
  contentId: string,    // Unique content identifier
  contentType: string,  // Type of content (project, portfolio, etc.)
  title: string,        // Content title
  image: string,        // Content image URL
  likedAt: string       // ISO timestamp when liked
}
```

## Usage Examples

### Cart Operations
```javascript
import { cartStore } from '../db/cartStore.js';

// Add item to cart
await cartStore.addItem({
  productId: 'prod-1',
  name: 'Web Development Service',
  price: 299.99,
  quantity: 1,
  image: 'https://example.com/image.jpg'
});

// Get all cart items
const items = await cartStore.getAll();

// Update quantity
await cartStore.updateQuantity(itemId, 2);

// Remove item
await cartStore.removeItem(itemId);

// Get total
const total = await cartStore.getTotal();

// Clear cart
await cartStore.clear();
```

### Cart History Operations
```javascript
import { cartHistoryStore } from '../db/cartHistoryStore.js';

// Add order to history (usually called after successful checkout)
await cartHistoryStore.addOrder(customerInfo, apiResponse);

// Get all order history
const orders = await cartHistoryStore.getAll();

// Get order statistics
const stats = await cartHistoryStore.getStats();
```

### Liked Content Operations
```javascript
import { likedContentStore } from '../db/likedContentStore.js';

// Toggle like status
const isLiked = await likedContentStore.toggleLike({
  contentId: 'proj-1',
  contentType: 'project',
  title: 'Amazing Project',
  image: 'https://example.com/image.jpg'
});

// Check if content is liked
const liked = await likedContentStore.isLiked('proj-1');

// Get all liked content
const likedItems = await likedContentStore.getAll();
```

## Components

### Checkout Page (`/checkout`)
- Displays current cart items with quantity controls
- Customer information form
- Submits order to API endpoint as JSON
- Moves cart to history after successful submission
- Clears current cart

### CartButton Component
- Shows cart icon with item count badge
- Links to checkout page
- Auto-updates count periodically

### AddToCartDemo Component
- Demonstrates adding sample products to cart
- Shows like/unlike functionality
- Provides visual feedback for actions

## Cart Management Rules

1. **Single Active Cart**: Only one cart can be active at a time
2. **Quantity Updates**: Adding existing items increases quantity
3. **Auto-Cleanup**: Cart is cleared after successful checkout
4. **History Preservation**: All completed orders are saved to history
5. **Persistence**: Data persists across browser sessions

## API Integration

The checkout process sends order data to `/api/orders` as JSON:

```javascript
{
  items: [
    {
      productId: "prod-1",
      name: "Product Name",
      price: 299.99,
      quantity: 1
    }
  ],
  total: 299.99,
  customerInfo: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    address: "123 Main St"
  }
}
```

Expected API response format:
```javascript
{
  orderId: "ORDER_123456789",
  status: "pending",
  message: "Order received successfully"
}
```

## Development

### Database Utilities
```javascript
import { dbUtils } from '../db/database.js';

// Clear all data (development/testing)
await dbUtils.clearAll();

// Get database info
const info = await dbUtils.getInfo();
```

### Error Handling
All database operations include try-catch blocks and proper error logging. Components should handle errors gracefully with user-friendly messages.

### Performance Considerations
- Cart count is refreshed periodically (1-second intervals)
- Database operations are asynchronous
- Large cart histories may impact performance over time