import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Heart, Truck, Shield, RotateCcw, Check } from 'lucide-react';
import galleryConfig from '../../config/gallery.json';
import StellarBackground from '../components/StellarBackground';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('features');

  const product = galleryConfig.products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <Link to="/gallery" className="text-blue-600 hover:text-blue-800">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const benefits = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over $35'
    },
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: '100% satisfaction guaranteed'
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: '30-day return policy'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white relative overflow-hidden">
      <StellarBackground />
      
      <div className="relative z-10 pt-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            to="/gallery" 
            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Products</span>
          </Link>
        </div>

        {/* Product Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {product.isNew && (
                    <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                      New
                    </span>
                  )}
                  {product.isFeatured && (
                    <span className="bg-purple-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                      Featured
                    </span>
                  )}
                </div>
                {/* Favorite Button */}
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="absolute top-4 right-4 p-3 rounded-full bg-white/90 hover:bg-white transition-colors duration-300 group"
                >
                  <Heart 
                    className={`w-6 h-6 transition-colors duration-300 ${
                      isFavorite 
                        ? 'text-red-500 fill-red-500' 
                        : 'text-gray-600 group-hover:text-red-500'
                    }`} 
                  />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Rating and Reviews */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-white/80">({product.reviews} reviews)</span>
                </div>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  product.inStock 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Title and Description */}
              <div>
                <h1 className="text-4xl font-bold font-luismi mb-4">{product.name}</h1>
                <p className="text-xl text-white/80 mb-6">{product.shortDescription}</p>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-white/60 line-through">{product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                    Save {Math.round((1 - parseFloat(product.price.slice(1)) / parseFloat(product.originalPrice.slice(1))) * 100)}%
                  </span>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}\n              </div>

              {/* Color Selection */}
              {product.colors && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Available Colors:</h3>
                  <div className="flex space-x-3">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                          selectedColor === index
                            ? 'border-blue-400 bg-blue-500/20 text-blue-400'
                            : 'border-white/30 bg-white/10 text-white/80 hover:border-white/50'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-lg font-semibold">Quantity:</label>
                  <div className="flex items-center border border-white/30 rounded-lg bg-white/10">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-white/10 transition-colors duration-300"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-l border-r border-white/30">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 hover:bg-white/10 transition-colors duration-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button 
                disabled={!product.inStock}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3"
              >
                <ShoppingCart className="w-6 h-6" />
                <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/20">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="bg-white/10 p-2 rounded-lg">
                        <IconComponent className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{benefit.title}</p>
                        <p className="text-white/60 text-xs">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <div className="flex space-x-8 border-b border-white/20">
              {['features', 'details', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 font-semibold capitalize transition-colors duration-300 ${
                    activeTab === tab
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="py-8">
              {activeTab === 'features' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold font-luismi mb-6">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3 bg-white/5 p-4 rounded-lg border border-white/10">
                        <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-white/90">{feature}</p>
                      </div>  
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold font-luismi mb-6">Product Details</h3>
                  <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                    <p className="text-white/90 mb-4">
                      {product.name} represents the perfect fusion of traditional craftsmanship and modern AI technology. 
                      Each product is meticulously designed to enhance your creative and productive endeavors.
                    </p>
                    <p className="text-white/90">
                      Our AI-powered personalization ensures that every item is uniquely tailored to your preferences, 
                      usage patterns, and creative needs. Experience the future of stationery with {product.name}.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold font-luismi mb-6">Customer Reviews</h3>
                  <div className="space-y-4">
                    {/* Sample reviews */}
                    {[
                      { name: 'Sarah M.', rating: 5, comment: 'Absolutely love this product! The AI personalization is incredible.' },
                      { name: 'Mike R.', rating: 5, comment: 'Quality is outstanding. The design features are exactly what I needed.' },
                      { name: 'Emily C.', rating: 4, comment: 'Great product, fast shipping. Highly recommend!' }
                    ].map((review, index) => (
                      <div key={index} className="bg-white/5 p-6 rounded-lg border border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold">{review.name}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-400'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-white/80">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;