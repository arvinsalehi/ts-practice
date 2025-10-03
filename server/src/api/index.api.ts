import express from "express";
import { Session } from '../models/Session';

const router = express.Router();

router.get('/hello', (req, res) => {
    res.send(`${req.sessionID} - Hello World!`);
});

router.post('/submit-session', async (req: any, res: any) => {
    try {
        const sessionData = req.body;


        const session = new Session(sessionData);
        const savedSession = await session.save();

        res.status(201).json({
            success: true,
            sessionId: savedSession._id,
            data: savedSession,
            message: 'Session submitted successfully'
        });

    } catch (error) {
        console.error("Failed to submit session:", error);

        res.status(500).json({ error: "Internal Server Error" });
    }
});

// HealthCheck
router.get('/health', (req, res) => res.status(200).send('OK'));

export default router;