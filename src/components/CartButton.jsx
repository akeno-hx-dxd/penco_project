import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cartStore } from '../db/cartStore.js';

const CartButton = ({ scrolled }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [itemCount, setItemCount] = useState(0);
  const isGalleryPage = location.pathname === '/gallery';

  useEffect(() => {
    loadCartCount();
    
    // Set up periodic refresh to keep count updated
    const interval = setInterval(loadCartCount, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadCartCount = async () => {
    try {
      const count = await cartStore.getItemCount();
      console.log('=== CART BUTTON UPDATE ===');
      console.log('Cart count:', count);
      console.log('Previous itemCount state:', itemCount);
      console.log('=== END CART BUTTON UPDATE ===');
      setItemCount(count);
    } catch (error) {
      console.error('Error loading cart count:', error);
    }
  };

  return (
    <button
      onClick={() => navigate('/checkout')}
      className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-blue-600 hover:text-white ${
        scrolled || isGalleryPage ? 'text-slate-600 hover:text-white' : 'text-white hover:text-white'
      }`}
      title="View Cart"
    >
      <ShoppingCart size={20} />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
};

export default CartButton;