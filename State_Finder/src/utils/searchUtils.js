/**
 * Search utilities for property filtering
 */

/**
 * Search properties based on multiple criteria
 * @param {Array} properties - Array of property objects
 * @param {Object} criteria - Search criteria
 * @returns {Array} Filtered properties
 */
export const searchProperties = (properties, criteria) => {
    return properties.filter(property => {
        // Type filter (House, Flat, Any)
        if (criteria.type && criteria.type !== 'any' && property.type !== criteria.type) {
            return false;
        }

        // Minimum price filter
        if (criteria.minPrice && property.price < parseInt(criteria.minPrice)) {
            return false;
        }

        // Maximum price filter
        if (criteria.maxPrice && property.price > parseInt(criteria.maxPrice)) {
            return false;
        }

        // Minimum bedrooms filter
        if (criteria.minBedrooms && property.bedrooms < parseInt(criteria.minBedrooms)) {
            return false;
        }

        // Maximum bedrooms filter
        if (criteria.maxBedrooms && property.bedrooms > parseInt(criteria.maxBedrooms)) {
            return false;
        }

        // Postcode area filter (first part of postcode)
        if (criteria.postcode && criteria.postcode.trim() !== '') {
            const searchPostcode = criteria.postcode.trim().toUpperCase();
            const propertyPostcode = property.postcode.toUpperCase();
            if (!propertyPostcode.includes(searchPostcode)) {
                return false;
            }
        }

        // Date filter (after and before)
        if (criteria.dateAfter || criteria.dateBefore) {
            const propDate = new Date(
                property.added.year,
                getMonthIndex(property.added.month),
                property.added.day
            );

            if (criteria.dateAfter && propDate < new Date(criteria.dateAfter)) {
                return false;
            }

            if (criteria.dateBefore && propDate > new Date(criteria.dateBefore)) {
                return false;
            }
        }

        return true;
    });
};

/**
 * Convert month name to index (0-11)
 * @param {String} monthName - Month name
 * @returns {Number} Month index
 */
const getMonthIndex = (monthName) => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months.indexOf(monthName);
};
