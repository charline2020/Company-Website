// 
// config/config.js
require('dotenv').config(); // Ensure dotenv is required at the top

module.exports = {
    DBHOST: process.env.DBHOST || '127.0.0.1',
    DBPORT: process.env.DBPORT || 27017,
    DBNAME: process.env.DBNAME || 'contactForm',
    SESSION_SECRET: process.env.SESSION_SECRET || 'default_secret' // Use a default secret for local development
};