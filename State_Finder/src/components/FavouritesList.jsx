import React from 'react';
import { useDrop } from 'react-dnd';
import { Link } from 'react-router-dom';

import '../styles/FavouritesList.css';

/**
 * FavoritesList Component
 * Drop zone for dragged properties
 * Displays saved favorite properties
 */
function FavoritesList({ favorites, onAddToFavorites, onRemove, onClearAll }) {

    // Drop zone configuration for drag and drop

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'PROPERTY',
        drop: (item) => {
            // Ensure the property exists before adding
            if (item && item.property) {
                onAddToFavorites(item.property);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    }), [onAddToFavorites]);

    return (
        <div
            ref={drop}
            className={`favorites-list ${isOver ? 'drag-over' : ''}`}
        >
            <h2>My Favorites ({favorites.length})</h2>

            {/* Clear all button - only show when there are favorites */}
            {favorites.length > 0 && (
                <button onClick={onClearAll} className="clear-all-btn">
                    Clear All Favorites
                </button>
            )}

            {/* Display favorite properties - only when there are favorites */}
            {favorites.length > 0 && favorites.map(property => (
                <div key={property.id} className="favorite-item">
                    <Link to={`/property/${property.id}`}>
                        <img src={property.picture} alt={property.location} />
                    </Link>
                    <div className="favorite-info">
                        <p>£{property.price.toLocaleString()}</p>
                        <p>{property.bedrooms} bed {property.type}</p>
                        <p className="location-text">{property.location.substring(0, 25)}...</p>
                    </div>
                    <button
                        onClick={() => onRemove(property.id)}
                        title="Remove from favorites"
                        aria-label="Remove from favorites"
                    >
                        ×
                    </button>
                </div>
            ))}

            {/* Empty state - only show when there are NO favorites */}
            {favorites.length === 0 && (
                <div className="empty-message">
                    <p>🏠 Drag properties here to save them</p>
                    <p style={{ fontSize: '0.9rem', color: '#999' }}>
                        or click the ♥ Favorite button
                    </p>
                </div>
            )}
        </div>
    );
}

export default FavoritesList;

