// netlify-functions/search.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const query = event.queryStringParameters.query;
    const token = process.env.UNSPLASH_API_KEY; // Use environment variable

    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${token}`);
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch images' }),
        };
    }
};
