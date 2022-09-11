import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

// routes
import tasksRoutes from './routes/tasks.routes'

dotenv.config()

const app = express()

app.use(express.json())
app.use(morgan('dev'))

// Endpoints
app.use('/api/tasks', tasksRoutes)

// Server execution
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})