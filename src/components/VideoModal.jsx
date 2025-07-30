import React, { useEffect } from 'react';
import { X, Maximize, Minimize } from 'lucide-react';


const VideoModal = ({ isOpen, onClose, videoUrl, title }) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const modalRef = React.useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, isFullscreen, onClose]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isFullscreen ? 'bg-black' : 'bg-black bg-opacity-75 backdrop-blur-sm p-4'
      }`}
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className={`relative bg-black rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ${
          isFullscreen 
            ? 'w-full h-full' 
            : 'w-full max-w-4xl aspect-video max-h-[80vh]'
        }`}
      >
        {/* Controls */}
        <div className="absolute top-4 right-4 z-10 flex space-x-2">
          <button
            onClick={toggleFullscreen}
            className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-lg transition-all duration-200 backdrop-blur-sm"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </button>
          <button
            onClick={onClose}
            className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-lg transition-all duration-200 backdrop-blur-sm"
            aria-label="Close video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video */}
        <div className="w-full h-full">
          <iframe
            src={videoUrl}
            title={title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Title overlay (only when not fullscreen) */}
        {!isFullscreen && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h3 className="text-white text-xl font-semibold">{title}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoModal;