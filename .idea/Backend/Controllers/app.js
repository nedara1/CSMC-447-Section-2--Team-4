// Controllers/app.js

// Import Express framework
const express = require('express');
// Import Node.js path module for handling file paths
const path    = require('path');
// Import MongoDB client and server API version
const { MongoClient, ServerApiVersion } = require('mongodb');

// ─── Business logic imports ──────────────────────────────────────────────────
// Import function to check if a course sequence is valid
const { checkCourseSequence } = require('../Utils/DataAlgo');
// Import function to retrieve course data
const { retrieveCourse }      = require('./retrieveCourse');

// ─── Controller & Route imports ──────────────────────────────────────────────
// Import controller function to get a course by its ID
const { getCourseById } = require('./CourseController');
// Import Express router for course-related routes
const courseRoutes      = require('../Routes/CourseRoutes');

// Initialize Express app
const app = express();
// Define port (use environment variable or default to 8080)
const PORT = process.env.PORT || 8080;

// ─── 1) Connect to MongoDB Atlas ─────────────────────────────────────────────
// Connection URI for MongoDB Atlas (replace with secure credentials in production)
const uri = "mongodb+srv://test1:Hello12345@4ypdatabase.99j9mje.mongodb.net/4YPDatabase?retryWrites=true&w=majority";
// Create a new MongoClient with recommended options
const client = new MongoClient(uri, {
    serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Async function to start the server after DB connection
async function startServer() {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB Atlas Cluster");

    // ─── 2) Middleware ─────────────────────────────────────────────────────────
    // Parse incoming JSON request bodies
    app.use(express.json());

    // Serve static files from Utils folder under /utils
    app.use('/utils', express.static(path.join(__dirname, '../Utils')));

    // Serve Pages folder so that custom.html is accessible
    // __dirname is Controllers/, so ../../Pages points to project-root/Pages
    app.use(express.static(path.join(__dirname, '../../Pages')));

    // Serve Models folder under /Backend/Models
    app.use('/Backend/Models', express.static(path.join(__dirname, '../Models')));

    // ─── 3) API ROUTES ─────────────────────────────────────────────────────────
    // Mount course-related routes at /api/course
    //   - GET /api/course/:courseId → getCourseById → retrieveCourse()
    app.use('/api/course', courseRoutes);

    // Serve Utils folder to browser for client-side access to DataAlgo.js
    app.use(
        '/Backend/Utils',
        express.static(path.join(__dirname, '../Utils'))
    );

    // Handle POST /api/compare to validate a course plan sequence
    app.post('/api/compare', (req, res) => {
        const { plan } = req.body;
        // Validate that plan is an array
        if (!Array.isArray(plan)) {
            return res.status(400).json({ valid: false, message: 'Invalid plan format' });
        }
        // Check sequence validity using business logic
        const valid = checkCourseSequence(plan);
        // Respond with result and message if invalid
        res.json({ valid, message: valid ? '' : 'Four Year Plan is Invalid. Please Speak With An Advisor If You Need Help' });
    });

    // ─ 4) Start Listening ─
    // Start Express server
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
}

//StartServer and handle errors
startServer().catch(err => {
    console.error("Failed to start server:", err);
    process.exit(1);
});
