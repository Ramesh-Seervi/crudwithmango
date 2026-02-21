const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to Database (only if MONGO_URI is set)
if (process.env.MONGO_URI) {
    connectDB();
} else {
    console.warn('MONGO_URI not set; skipping DB connection. Set MONGO_URI in .env to enable DB.');
}

const app = express();

// Enable CORS
app.use(cors());

// Body Parser Middleware
app.use(express.json());

// Import Routes
const blogRoutes = require('./routes/blogRoutes');

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// Static Folder — served first so index.html is at /
app.use(express.static(path.join(__dirname, 'public')));

// Mount API Routes
app.use('/api/blogs', blogRoutes);

// Swagger UI — dynamically override the server URL based on the incoming request host
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', (req, res, next) => {
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.headers['x-forwarded-host'] || req.get('host');
    const dynamicSpec = {
        ...swaggerSpec,
        servers: [{ url: `${protocol}://${host}` }]
    };
    swaggerUi.setup(dynamicSpec)(req, res, next);
});

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
