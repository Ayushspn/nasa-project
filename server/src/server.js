const http = require('http');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8000;
const app = require('./app');
const MONGO_URL = 'mongodb+srv://nasa:nasa@nasa.hfalfas.mongodb.net/nasa?retryWrites=true&w=majority';
const { loadPlanetsData } = require('./model/planets.model');
const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});
async function startServer() {
    try {
       const planets =  await loadPlanetsData();
        console.log('Planets data loaded successfully', planets.length, 'habitable planets found.');
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
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

