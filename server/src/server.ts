// @ts-ignore

import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { MongoClient } from 'mongodb';


// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tracksys';
let db: any;

// Server

const app = express();
const port = process.env.PORT || 3000;
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
}));

// Connect to MongoDB
async function connectToMongo() {
    try {
        const client = new MongoClient(mongoUri);
        await client.connect();
        db = client.db();
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
}

app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' } // Set to true if using HTTPS
}));


// Routes
app.get('/api/hello', (req, res) => {
    res.send(`${req.sessionID} - Hello World!`);
});

// HealthCheck
app.get('/healthcheck', (req, res) => res.status(200).send('OK'));

// Start server
app.listen(port, async () => {
    console.log(`Server listening on port ${port}`);
    await connectToMongo();
});