import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ImageGallery from './ImageGallery';
import '../styles/ImageGallery.css'
import '../styles/PropertyDetails.css';

/**
 * PropertyDetails Component
 * Displays full property details with image gallery and tabs
 */
function PropertyDetails({ properties, onAddToFavorites }) {
    const { id } = useParams();
    const property = properties.find(p => p.id === id);
    const [selectedImage, setSelectedImage] = useState(0);

    if (!property) {
        return (
            <div className="property-details">
                <div className="no-results">
                    <h3>Property not found</h3>
                    <Link to="/" className="btn btn-primary">Back to Search</Link>
                </div>
            </div>
        );
    }

    /**
     * Handle favorite button click
     */
    const handleAddToFavorites = () => {
        onAddToFavorites(property);
    };

    /**
     * Get Google Maps embed URL with location query
     */
    const getGoogleMapsUrl = () => {
        // Encode the full location for Google Maps search
        const location = encodeURIComponent(property.location);

        // Google Maps Embed API URL (without API key - using search mode)
        return `https://maps.google.com/maps?q=${location}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    };

    return (
        <div className="property-details">
            {/* Back button */}
            <Link to="/" className="btn btn-secondary" style={{ marginBottom: '1rem' }}>
                ← Back to Search
            </Link>

            {/* Image Gallery */}
            <ImageGallery
                images={property.images}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
            />

            {/* Property Header */}
            <div className="property-header">
                <h1>£{property.price.toLocaleString()}</h1>
                <p className="property-type-info">
                    <strong>{property.bedrooms} bedroom {property.type}</strong> • {property.tenure}
                </p>
                <p className="property-location-detail">
                    📍 {property.location}
                </p>
                <button onClick={handleAddToFavorites} className="btn-add-favorite">
                    ♥ Add to Favorites
                </button>
            </div>

            {/* React Tabs for Description, Floor Plan, and Map */}
            <Tabs>
                <TabList>
                    <Tab>Description</Tab>
                    <Tab>Floor Plan</Tab>
                    <Tab>Map</Tab>
                </TabList>

                {/* Description Tab */}
                <TabPanel>
                    <div className="description">
                        <h2>Property Description</h2>
                        <p>{property.longDescription || property.description}</p>

                        <h3>Key Features</h3>
                        <ul className="features-list">
                            <li>{property.bedrooms} bedrooms</li>
                            <li>{property.type} property</li>
                            <li>{property.tenure}</li>
                            <li>Added: {property.added.month} {property.added.day}, {property.added.year}</li>
                            <li>Location: {property.location}</li>
                        </ul>
                    </div>
                </TabPanel>

                {/* Floor Plan Tab */}
                <TabPanel>
                    <div className="floor-plan">
                        <h2>Floor Plan</h2>
                        <img src={property.floorPlan} alt="Property floor plan" />
                        <p className="floor-plan-note">
                            Floor plans are for illustration purposes only and may not be to scale.
                        </p>
                    </div>
                </TabPanel>

                {/* Map Tab - Google Maps */}
                <TabPanel>
                    <div className="map">
                        <h2>Location</h2>

                        {/* Location Header */}
                        <div style={{
                            padding: '1.5rem',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '12px',
                            marginBottom: '1.5rem',
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', fontWeight: '600' }}>
                                📍 {property.location}
                            </h3>
                            <p style={{ fontSize: '1.1rem', opacity: 0.95, margin: 0 }}>
                                {property.postcode}
                            </p>
                        </div>

                        {/* Google Maps Embed */}
                        <div className="map-container">
                            <iframe
                                title="Property Location Map"
                                width="100%"
                                height="450"
                                style={{
                                    border: 0,
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                }}
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                                src={getGoogleMapsUrl()}
                            />
                        </div>

                        {/* Property Info Cards */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '1rem',
                            marginTop: '1.5rem'
                        }}>
                            <div style={{
                                padding: '1.5rem',
                                background: 'white',
                                borderRadius: '8px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                border: '2px solid #667eea'
                            }}>
                                <strong style={{ fontSize: '1.1rem', color: '#667eea', display: 'block', marginBottom: '0.5rem' }}>
                                     Property Type
                                </strong>
                                <p style={{ fontSize: '1rem', color: '#333', margin: 0 }}>
                                    {property.bedrooms} bedroom {property.type}
                                </p>
                            </div>

                            <div style={{
                                padding: '1.5rem',
                                background: 'white',
                                borderRadius: '8px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                border: '2px solid #667eea'
                            }}>
                                <strong style={{ fontSize: '1.1rem', color: '#667eea', display: 'block', marginBottom: '0.5rem' }}>
                                     Price
                                </strong>
                                <p style={{ fontSize: '1rem', color: '#333', margin: 0 }}>
                                    £{property.price.toLocaleString()}
                                </p>
                            </div>

                            <div style={{
                                padding: '1.5rem',
                                background: 'white',
                                borderRadius: '8px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                border: '2px solid #667eea'
                            }}>
                                <strong style={{ fontSize: '1.1rem', color: '#667eea', display: 'block', marginBottom: '0.5rem' }}>
                                     Date Added
                                </strong>
                                <p style={{ fontSize: '1rem', color: '#333', margin: 0 }}>
                                    {property.added.month} {property.added.day}, {property.added.year}
                                </p>
                            </div>
                        </div>

                        {/* Info Note with Google Maps Link */}
                        <div style={{
                            marginTop: '1.5rem',
                            padding: '1.5rem',
                            background: '#f0f4ff',
                            borderRadius: '8px',
                            borderLeft: '4px solid #667eea'
                        }}>
                            <p style={{ margin: 0, color: '#555', lineHeight: '1.6' }}>
                                <strong style={{ color: '#667eea' }}>🗺️ Google Maps:</strong>
                                <br />
                                This property is located at <strong>{property.location}</strong> in the <strong>{property.postcode}</strong> area.
                                {' '}
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: '#667eea', fontWeight: '600', textDecoration: 'underline' }}
                                >
                                    Open in Google Maps
                                </a>
                                {' '}for directions and street view.
                            </p>
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default PropertyDetails;
