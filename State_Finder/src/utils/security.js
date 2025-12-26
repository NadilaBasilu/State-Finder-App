/**
 * Security utilities for XSS prevention
 */

/**
 * HTML encoding to prevent XSS attacks
 * @param {String} str - String to encode
 * @returns {String} Encoded string
 */
export const encodeHTML = (str) => {
    if (typeof str !== 'string') return str;

    return str.replace(/[&<>"']/g, (match) => {
        const escapeChars = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return escapeChars[match];
    });
};

/**
 * Sanitize user input - remove script tags
 * @param {String} input - User input
 * @returns {String} Sanitized input
 */
export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;

    return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};
