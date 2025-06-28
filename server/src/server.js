const http = require('http');
const PORT = process.env.PORT || 8000;
const app = require('./app');

const { loadPlanetsData } = require('./model/planets.model');
const server = http.createServer(app);
async function startServer() {
    try {
       const planets =  await loadPlanetsData();
        console.log('Planets data loaded successfully', planets.length, 'habitable planets found.');
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to load planets data:', error);
        process.exit(1);
    }
}

startServer();

