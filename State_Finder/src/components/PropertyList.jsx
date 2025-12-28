import React from 'react';
import PropertyCard from './PropertyCard';

import '../styles/ImageGallery.css'
import '../styles/PropertyList.css';

/**
 * PropertyList Component
 * Displays grid of property cards from search results
 */
function PropertyList({ properties, onAddToFavorites }) {

    if (!properties || properties.length === 0) {
        return (
            <div className="no-results">
                <h3>No properties found</h3>
                <p>Try adjusting your search criteria to see more results.</p>
            </div>
        );
    }

    return (
        <div className="property-list-container">
            <h2 className="results-count">
                {properties.length} {properties.length === 1 ? 'Property' : 'Properties'} Found
            </h2>

            <div className="property-list">
                {properties.map(property => (
                    <PropertyCard
                        key={property.id}
                        property={property}
                        onAddToFavorites={onAddToFavorites}
                    />
                ))}
            </div>
        </div>
    );
}

export default PropertyList;
