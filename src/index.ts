import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'

// routes
import tasksRoutes from './routes/tasks.routes'

dotenv.config()

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// Endpoints
app.use('/api/tasks', tasksRoutes)

// Server error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction): any => {
    return res.status(500).json({
        ok: false,
        error_msg: err.message
    })
})

// Server execution
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})