import "dotenv/config";
import {connectDB} from './config/db.js';
import todoRoutes from './routes/todo.js';
import express from "express";
import type { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import cors from "cors"
import helmet from "helmet"

const app = express();


app.use(cors())
app.use(helmet())
app.use(express.json())

app.use('/todos',todoRoutes)

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).json({ message: err.message });
    return;
  }
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});


const Port = process.env.PORT ?? 2000;
await connectDB()

app.listen(Port, () => {
    console.log(`Server is running on port:${Port}`);
})