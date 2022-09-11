import { Router } from 'express'
import { createTask, deleteTask, getAllTasks, getTask, updateTask } from '../controllers/tasks.controller'

const router = Router()

router.get('/', getAllTasks)

router.get('/:id', getTask)

router.post('/new', createTask)

router.put('/edit/:id', updateTask)

router.delete('/delete/:id', deleteTask)

export default router