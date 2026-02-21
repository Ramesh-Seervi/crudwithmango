const express = require('express');
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

// Mount Routes
app.use('/api/blogs', blogRoutes);

const path = require('path');

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
