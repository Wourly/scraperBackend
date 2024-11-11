import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

//--------- Middleware
//---------------------------------------------------------------
app.use(express.json());
app.use(cors({
    origin: ['http://127.0.0.1:5173/', 'http://anotherdomain.com'],
    allowedHeaders: ['Content-Type']
}));
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    next();
});
//---------------------------------------------------------------
//--------- Middleware end


// Route for server activity
app.get('/', (req: Request, res: Response) => {
    res.send('Server is up and running!');
});

// Route for scraping
app.post('/scrape', async (req: Request, res: Response) => {
    const {query} = req.body; // Static query for now
    provideResponse (query, res)
});

// Default server display
app.get('/scrape', async (req: Request, res: Response) => {
    const query = 'venus+atmosphere'; // Static query for now

    provideResponse (query, res)
});

async function provideResponse (query:string, res: Response) {

    const url = `https://www.google.com/search?q=${query}&hl=en`;

    try {
        // Make HTTP GET request to Google Search page
        const response = await axios.get(url);

        // Send the raw HTML content of the Google Search page as a response (or you can extract specific data)
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error scraping the page');
    }
}

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});