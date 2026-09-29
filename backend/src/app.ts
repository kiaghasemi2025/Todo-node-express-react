import "dotenv/config"
import express from "express";
import type { Request, Response, NextFunction } from 'express'
import cors from "cors"
import helmet from "helmet"
import todoRoutes from './routes/todo.js'


const app = express();


app.use(cors())
app.use(helmet())
app.use(express.json())
app.use('/todos', todoRoutes)

app.use(
    (err: Error, _req: Request, res: Response, _next: NextFunction) => {
        res.status(500).json({ message: err.message })
    }
)

const Port = process.env.PORT ;
app.listen(Port, () => {
    console.log(`Server is running on port:${Port}`);
})