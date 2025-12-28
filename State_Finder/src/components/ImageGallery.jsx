import React from 'react';

import '../styles/ImageGallery.css';

/**
 * ImageGallery Component
 * Displays main image and thumbnail gallery
 */
function ImageGallery({ images, selectedImage, setSelectedImage }) {

    if (!images || images.length === 0) {
        return (
            <div className="image-gallery">
                <p>No images available</p>
            </div>
        );
    }

    return (
        <div className="image-gallery">
            {/* Main Large Image */}
            <div className="main-image-container">
                <img
                    src={images[selectedImage]}
                    alt={`Property view ${selectedImage + 1}`}
                    className="main-image"
                />
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
