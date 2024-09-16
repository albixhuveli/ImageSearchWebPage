import express from 'express';
import fetch from 'node-fetch'; // Ensure this is imported dynamically
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// Determine the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the HTML file explicitly
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'webpage.html'));
});

// API endpoint to fetch images
app.get('/search', async (req, res) => {
    const query = req.query.query;
    const token = 'GubO-cT6c-jztdNC3VggFE8X7iluXOJh5jn8aBRzDu8'; // Your Unsplash API token

    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${token}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch images' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
