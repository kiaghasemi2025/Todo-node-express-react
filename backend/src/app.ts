import { env } from './config/env.js'
import { connectDB } from './config/db.js';
import todoRoutes from './routes/todo.js';
import express from "express";
import type { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import cors from "cors"
import helmet from "helmet"

const app = express();


app.use(cors({origin:"http://localhost:5173"}))
app.use(helmet())
app.use(express.json())

app.use('/todos', todoRoutes)

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err: Error & { status?: number }, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).json({ message: err.message });
    return;
  }
  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({ message: "Invalid id" });
    return;
  }
  if (err.status && err.status >= 400 && err.status < 500) {
    res.status(err.status).json({ message: err.message });
    return;
  }
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

await connectDB()

app.listen(env.PORT, () => {
  console.log(`Server is running on port:${env.PORT}`);
})