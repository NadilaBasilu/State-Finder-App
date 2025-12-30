import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { encodeHTML } from '../utils/security';
import '../styles/ImageGallery.css'
import '../styles/PropertyCard.css';

/**
 * PropertyCard Component
 * Displays individual property with drag and drop support
 * Click anywhere on card to view details
 */
function PropertyCard({ property, onAddToFavorites }) {
    const navigate = useNavigate();

    // Drag and drop functionality
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'PROPERTY',
        item: { property },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }), [property]);

    /**
     * Handle card click - navigate to property details
     */
    const handleCardClick = () => {
        navigate(`/property/${property.id}`);
    };

    /**
     * Handle favorite button click
     * Prevent event bubbling to card click
     */
    const handleFavoriteClick = (e) => {
        e.stopPropagation(); // Prevent card click
        e.preventDefault();
        onAddToFavorites(property);
    };

    return (
        <div
            ref={drag}
            className="property-card"
            style={{ opacity: isDragging ? 0.5 : 1 }}
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleCardClick();
                }
            }}
        >
            <div className="property-image">
                <img src={property.picture} alt={property.location} />
                <div className="property-type-badge">{property.type}</div>
            </div>

            <div className="property-info">
                <h3 className="property-price">£{property.price.toLocaleString()}</h3>

                <p className="property-bedrooms">
                    <strong>{property.bedrooms} bedroom {property.type}</strong>
                </p>

                <p className="property-location">
                    📍 {encodeHTML(property.location)}
                </p>

                <p className="property-description">
                    {property.description.substring(0, 120)}...
                </p>

                <div className="property-actions">
                    <Link
                        to={`/property/${property.id}`}
                        className="btn btn-view"
                        onClick={(e) => e.stopPropagation()} // Prevent double navigation
                    >
                        View Details
                    </Link>
                    <button
                        onClick={handleFavoriteClick}
                        className="btn btn-favorite"
                        title="Add to favorites"
                    >
                        ♥ Favorite
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PropertyCard;
