import React, { useState, useEffect } from 'react';
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
 * Header Component with Hide on Scroll and Tagline
 * Shows "Estate" in white and "Finder" in yellow
 */
function Header() {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            const isScrollingUp = prevScrollPos > currentScrollPos;
            const isAtTop = currentScrollPos < 50;

            // Show header when scrolling up or at top
            setVisible(isScrollingUp || isAtTop);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    return (
        <header className={`app-header ${visible ? 'header-visible' : 'header-hidden'}`}>
            <div className="header-content">
                <h1 className="header-title">
                    Estate<span className="highlight-yellow">Finder</span>
                </h1>
                <p className="header-tagline">Find Your Dream Home</p>
            </div>
        </header>
    );
}

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
        }
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
                    {/* Header with Hide on Scroll */}
                    <Header />

                    <Routes>
                        {/* Main Search Page */}
                        <Route path="/" element={
                            <div className="page-container">
                                {/* Search Form - Full Width */}
                                <div className="search-form-container">
                                    <SearchForm onSearch={handleSearch} />
                                </div>

                                {/* Property Cards + Favorites Side by Side */}
                                <div className="content-layout">
                                    {/* Property List - Left Side (Larger) */}
                                    <div className="property-section">
                                        <PropertyList
                                            properties={searchResults}
                                            onAddToFavorites={addToFavorites}
                                        />
                                    </div>

                                    {/* Favorites - Right Side (Smaller) */}
                                    <div className="favorites-section">
                                        <FavoritesList
                                            favorites={favorites}
                                            onAddToFavorites={addToFavorites}
                                            onRemove={removeFromFavorites}
                                            onClearAll={clearFavorites}
                                        />
                                    </div>
                                </div>
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
