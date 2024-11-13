"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
//--------- Middleware
//---------------------------------------------------------------
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['http://127.0.0.1:5173/', 'https://mmscraper.netlify.app/'],
    allowedHeaders: ['Content-Type']
}));
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    next();
});
//---------------------------------------------------------------
//--------- Middleware end
// Route for server activity
app.get('/', (req, res) => {
    res.send('Server is up and running!');
});
// Route for scraping
app.post('/scrape', async (req, res) => {
    const { query } = req.body; // Static query for now
    provideResponse(query, res);
});
// Default server display
app.get('/scrape', async (req, res) => {
    const query = 'restaurants+nearby'; // Static query for now
    provideResponse(query, res);
});
async function provideResponse(query, res) {
    const url = `https://www.google.com/search?q=${query}&hl=en`;
    try {
        // Make HTTP GET request to Google Search page
        const response = await axios_1.default.get(url);
        // Send the raw HTML content of the Google Search page as a response (or you can extract specific data)
        res.send(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error scraping the page');
    }
}
// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
