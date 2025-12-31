import React from 'react';
import '../styles/ImageGallery.css';

/**
 * ImageGallery Component with Navigation Arrows
 * Displays main image with previous/next controls and thumbnail gallery
 */
function ImageGallery({ images, selectedImage, setSelectedImage }) {

    if (!images || images.length === 0) {
        return (
            <div className="image-gallery">
                <p>No images available</p>
            </div>
        );
    }

    /**
     * Navigate to previous image
     */
    const handlePrevious = () => {
        setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    /**
     * Navigate to next image
     */
    const handleNext = () => {
        setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    /**
     * Handle keyboard navigation
     */
    const handleKeyPress = (e) => {
        if (e.key === 'ArrowLeft') {
            handlePrevious();
        } else if (e.key === 'ArrowRight') {
            handleNext();
        }
    };

    return (
        <div className="image-gallery" onKeyDown={handleKeyPress} tabIndex={0}>
            {/* Main Large Image with Navigation */}
            <div className="main-image-container">
                <img
                    src={images[selectedImage]}
                    alt={`Property view ${selectedImage + 1}`}
                    className="main-image"
                />

                {/* Previous Arrow Button */}
                <button
                    className="nav-arrow nav-arrow-left"
                    onClick={handlePrevious}
                    aria-label="Previous image"
                    title="Previous image"
                >
                    <span className="arrow-icon">‹</span>
                </button>

                {/* Next Arrow Button */}
                <button
                    className="nav-arrow nav-arrow-right"
                    onClick={handleNext}
                    aria-label="Next image"
                    title="Next image"
                >
                    <span className="arrow-icon">›</span>
                </button>

                {/* Image Counter */}
                <div className="image-counter">
                    {selectedImage + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="thumbnail-gallery">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`thumbnail-wrapper ${selectedImage === index ? 'active' : ''}`}
                        onClick={() => setSelectedImage(index)}
                    >
                        <img
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className="thumbnail-image"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageGallery;
