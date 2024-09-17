const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

// Log the API key to check if it's being loaded
console.log("Unsplash API Key:", process.env.UNSPLASH_API_KEY);

exports.handler = async function(event) {
    const query = event.queryStringParameters.query;
    const token = process.env.UNSPLASH_API_KEY;

    try {
        // Dynamically import node-fetch
        const fetch = (await import('node-fetch')).default;
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
