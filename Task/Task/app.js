import dotenv from 'dotenv';
import express from 'express';
import connectDB from './src/config/db.mjs';
import studentRoutes from './src/routes/studentRoutes.js';
import classRoutes from './src/routes/classRoutes.js';
import cors from "cors";

const app = express();

dotenv.config();
// app.use(cors({
//     origin: ["*"],
//     methods: ["GET"],
//     allowedHeaders: ["Authorization", "Content-Length"]
// }))

// Middleware to parse JSON requests
app.use(express.json());

// Use the student routes
app.use('/api', studentRoutes);
// Use the class routes
app.use('/api/class', classRoutes);

// 404 Error handling for undefined routes
app.use("*", (req, res) => {
    return res.status(404).json({ message: "API Bad Gateway!" });
});

const PORT = process.env.PORT || 8000;

// Connect to the database
connectDB();

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
    } else {
        console.error('Server error:', err);
    }
});
