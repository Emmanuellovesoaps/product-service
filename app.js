const express = require('express');
const requestLogger = require('./middleware/logger');
const productRoutes = require('./routes/products');

const app = express();
const port = 3001;

// Essential Middleware (must come BEFORE routes)
app.use(express.json());   // Required for POST/PUT to work
app.use(requestLogger);    // Required for Observability (Correlation IDs)

// Routes
// Any request to /api/products will be handled by productRoutes
app.use('/api/products', productRoutes);

// Error Handling (keep this AT THE END, after all routes)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
    console.log(`product-service-v1 running on http://localhost:${port}`);
});