import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import propertiesData from './data/properties.json';
import SearchForm from './components/SearchForm.jsx';
import PropertyList from './components/PropertyList.jsx';
import PropertyDetails from './components/PropertyDetails.jsx';
import FavoritesList from './components/FavouritesList.jsx';
import Footer from './components/Footer.jsx';
import { searchProperties } from './utils/searchUtils.js';
import './styles/App.css';

/**
 * Main App Component
 * Manages application state and routing
 */
function App() {
    const [favorites, setFavorites] = useState([]);
    const [searchResults, setSearchResults] = useState(propertiesData.properties);

    /**
     * Handle search form submission
     */
    const handleSearch = (criteria) => {
        const results = searchProperties(propertiesData.properties, criteria);
        setSearchResults(results);
    };

    /**
     * Add property to favorites (silent mode - no alerts)
     * Prevents duplicates without showing popup messages
     */
    const addToFavorites = (property) => {
        const exists = favorites.find(fav => fav.id === property.id);

        if (!exists) {
            setFavorites([...favorites, property]);
            // Property added silently - no popup alert
        }
        // If already exists, silently ignore - no popup alert
    };

    /**
     * Remove property from favorites by ID
     */
    const removeFromFavorites = (id) => {
        setFavorites(favorites.filter(fav => fav.id !== id));
    };

    /**
     * Clear all favorites with confirmation
     */
    const clearFavorites = () => {
        if (window.confirm('Are you sure you want to clear all favorites?')) {
            setFavorites([]);
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <BrowserRouter>
                <div className="app">
                    {/* Header */}
                    <header>
                        <h1>🏠 Property Vision</h1>
                    </header>

                    <Routes>
                        {/* Main Search Page */}
                        <Route path="/" element={
                            <div className="main-layout">
                                <div className="search-section">
                                    <SearchForm onSearch={handleSearch} />
                                    <PropertyList
                                        properties={searchResults}
                                        onAddToFavorites={addToFavorites}
                                    />
                                </div>

                                {/* Favorites Sidebar */}
                                <FavoritesList
                                    favorites={favorites}
                                    onAddToFavorites={addToFavorites}
                                    onRemove={removeFromFavorites}
                                    onClearAll={clearFavorites}
                                />
                            </div>
                        } />

                        {/* Property Details Page */}
                        <Route path="/property/:id" element={
                            <PropertyDetails
                                properties={propertiesData.properties}
                                onAddToFavorites={addToFavorites}
                            />
                        } />
                    </Routes>

                    {/* Footer Component */}
                    <Footer />
                </div>
            </BrowserRouter>
        </DndProvider>
    );
}

export default App;
