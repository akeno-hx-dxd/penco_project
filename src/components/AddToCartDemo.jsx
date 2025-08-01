import { useState } from 'react';
import { cartStore } from '../db/cartStore.js';
import { likedContentStore } from '../db/likedContentStore.js';
import { Heart, ShoppingCart } from 'lucide-react';

const AddToCartDemo = () => {
  const [message, setMessage] = useState('');

  // Sample products for demo
  const sampleProducts = [
    {
      productId: 'prod-1',
      name: 'Web Development Service',
      price: 299.99,
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      productId: 'prod-2',
      name: 'Mobile App Development',
      price: 499.99,
      image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      productId: 'prod-3',
      name: 'UI/UX Design Package',
      price: 199.99,
      image: 'https://images.pexels.com/photos/196655/pexels-photo-196655.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const handleAddToCart = async (product) => {
    try {
      console.log('=== ADD TO CART DEBUG ===');
      console.log('Adding product:', product);
      
      const result = await cartStore.addItem(product);
      console.log('Add item result:', result);
      
      const allItems = await cartStore.getAll();
      const itemCount = await cartStore.getItemCount();
      const total = await cartStore.getTotal();
      
      console.log('Cart after adding item:');
      console.log('- All items:', allItems);
      console.log('- Item count:', itemCount);
      console.log('- Total:', total);
      console.log('=== END ADD TO CART DEBUG ===');
      
      setMessage(`Added ${product.name} to cart!`);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setMessage('Error adding to cart');
    }
  };

  const handleToggleLike = async (product) => {
    try {
      const isLiked = await likedContentStore.toggleLike({
        contentId: product.productId,
        contentType: 'product',
        title: product.name,
        image: product.image
      });
      setMessage(isLiked ? `Liked ${product.name}!` : `Removed ${product.name} from likes`);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error toggling like:', error);
      setMessage('Error updating likes');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Demo Products</h3>
      
      {message && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {message}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sampleProducts.map((product) => (
          <div key={product.productId} className="border rounded-lg p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover rounded mb-3"
            />
            <h4 className="font-medium mb-2">{product.name}</h4>
            <p className="text-lg font-semibold text-blue-600 mb-3">${product.price}</p>
            
            <div className="flex space-x-2">
              <button
                onClick={() => handleAddToCart(product)}
                className="flex-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
              >
                <ShoppingCart size={16} />
                <span>Add to Cart</span>
              </button>
              
              <button
                onClick={() => handleToggleLike(product)}
                className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                <Heart size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddToCartDemo;