import React, { useState } from 'react';
import '../styles/SearchForm.css';

/**
 * SearchForm Component
 * Provides form inputs for property search criteria with two-column layout
 */
function SearchForm({ onSearch }) {
    const [criteria, setCriteria] = useState({
        type: 'any',
        minPrice: '',
        maxPrice: '',
        minBedrooms: '',
        maxBedrooms: '',
        postcode: '',
        dateAfter: '',
        dateBefore: ''
    });

    /**
     * Handle input changes
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCriteria({
            ...criteria,
            [name]: value
        });
    };

    /**
     * Handle form submission
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(criteria);
    };

    /**
     * Reset all search criteria
     */
    const handleReset = () => {
        const resetCriteria = {
            type: 'any',
            minPrice: '',
            maxPrice: '',
            minBedrooms: '',
            maxBedrooms: '',
            postcode: '',
            dateAfter: '',
            dateBefore: ''
        };
        setCriteria(resetCriteria);
        onSearch(resetCriteria);
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <h2>🔍 Search Properties</h2>

            {/* Property Type - Full Width */}
            <div className="form-group full-width">
                <label htmlFor="type">Property Type</label>
                <select
                    id="type"
                    name="type"
                    value={criteria.type}
                    onChange={handleChange}
                    className="form-control"
                >
                    <option value="any">Any Type</option>
                    <option value="House">House</option>
                    <option value="Flat">Flat</option>
                </select>
            </div>

            {/* Two Column Grid */}
            <div className="form-grid">
                {/* Price Range */}
                <div className="form-group">
                    <label htmlFor="minPrice">Min Price (£)</label>
                    <input
                        id="minPrice"
                        type="number"
                        name="minPrice"
                        value={criteria.minPrice}
                        onChange={handleChange}
                        placeholder="e.g., 200,000"
                        className="form-control"
                        min="0"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="maxPrice">Max Price (£)</label>
                    <input
                        id="maxPrice"
                        type="number"
                        name="maxPrice"
                        value={criteria.maxPrice}
                        onChange={handleChange}
                        placeholder="e.g., 1,000,000"
                        className="form-control"
                        min="0"
                    />
                </div>

                {/* Bedroom Range */}
                <div className="form-group">
                    <label htmlFor="minBedrooms">Min Bedrooms</label>
                    <input
                        id="minBedrooms"
                        type="number"
                        name="minBedrooms"
                        value={criteria.minBedrooms}
                        onChange={handleChange}
                        placeholder="Any"
                        className="form-control"
                        min="0"
                        max="10"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="maxBedrooms">Max Bedrooms</label>
                    <input
                        id="maxBedrooms"
                        type="number"
                        name="maxBedrooms"
                        value={criteria.maxBedrooms}
                        onChange={handleChange}
                        placeholder="Any"
                        className="form-control"
                        min="0"
                        max="10"
                    />
                </div>

                {/* Date Range */}
                <div className="form-group">
                    <label htmlFor="dateAfter">Added After</label>
                    <input
                        id="dateAfter"
                        type="date"
                        name="dateAfter"
                        value={criteria.dateAfter}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="dateBefore">Added Before</label>
                    <input
                        id="dateBefore"
                        type="date"
                        name="dateBefore"
                        value={criteria.dateBefore}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
            </div>

            {/* Postcode - Full Width */}
            <div className="form-group full-width">
                <label htmlFor="postcode">Postcode Area</label>
                <input
                    id="postcode"
                    type="text"
                    name="postcode"
                    value={criteria.postcode}
                    onChange={handleChange}
                    placeholder="e.g., BR1, NW1, SW19"
                    className="form-control"
                    maxLength="10"
                />
            </div>

            {/* Action Buttons */}
            <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                    🔍 Search Properties
                </button>
                <button type="button" onClick={handleReset} className="btn btn-secondary">
                    ↻ Reset
                </button>
            </div>
        </form>
    );
}

export default SearchForm;
