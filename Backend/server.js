// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Import route files
const authRoutes = require('./routes/authRoutes');
const searchRoutes = require('./routes/searchRoutes');
const tripRoutes = require('./routes/tripRoutes');
const planRoutes = require('./routes/planRoutes');
const placesRoutes = require('./routes/placesRoutes');
const aiRoutes = require('./routes/aiRoutes');

dotenv.config();
connectDB();
const app = express();

app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? [process.env.FRONTEND_URL]
        : ['http://localhost:5173', 'http://localhost:8080'],
    credentials: true
}));
app.use(express.json());
app.use(require('cookie-parser')());


// --- ROUTES ---
app.get('/', (req, res) => { res.send('API is running successfully!'); });

// Mount Routers
app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/plan', planRoutes);
app.use('/api/places', placesRoutes);
app.use('/api/ai', aiRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));