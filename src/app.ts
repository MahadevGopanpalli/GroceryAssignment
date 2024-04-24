import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { json } from "body-parser";
import { connectDB } from "./db";
import admin from "./routes/adminController";
import user from "./routes/userController";

dotenv.config();

const startServer = async () => {
    await connectDB();
    const app: Express = express();
    const port = process.env.PORT || 3000;

    app.use(json());
    app.use('/api/admin', admin);
    app.use('/api/user', user);

    app.get("/", (req: Request, res: Response) => {
        res.send("Hello World !!");
    });

    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
};

startServer().catch(error => {
    console.error('Error starting server:', error);
    process.exit(1);
});
