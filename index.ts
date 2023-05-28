import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './database/database.service';
import { gamesRouter } from './routes/games.routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

connectToDatabase()
    .then(() => {
        app.use("/games", gamesRouter);
        
        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });