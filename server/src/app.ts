// @ts-ignore

import express from 'express';
import cors from 'cors';
import { notFound, errorHandler } from "../middleware/index.middleware";
import api from "./api/index.api";
import helmet from 'helmet';
import morgan from 'morgan';

// Server
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
}));

// Express Session with MongoDB
// app.use(session({
//     secret: process.env.SESSION_SECRET || 'your-secret-key',
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({
//         mongoUrl: mongoUri,
//         collectionName: 'sessions',
//         ttl: 14 * 24 * 60 * 60 // Session TTL in seconds (e.g., 14 days)
//     }),
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24 * 7 // Cookie expiration in milliseconds (e.g., 7 days)
//     }
// }));

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

// Routes
app.use("/api", api);

// Middleware
app.use(notFound);
app.use(errorHandler);



export default app;

