import { Response, Request } from 'express'
import pool from '../db'

export const getAllTasks = async (_req: Request, res: Response, next: any) => {
    try {
        const result = await pool.query('SELECT * FROM task')

        console.log(result.rows)
        res.status(200).json({ ok: true, result: result.rows })

    } catch (err: any) {
        next(err)
    }
}

export const getTask = async (req: Request, res: Response, next: any): Promise<any> => {
    const { id } = req.params

    try {
        const result = await pool.query('SELECT * FROM task WHERE id = $1', [ id ])

        if (result.rows.length === 0) {
            return res.status(404).json({ ok: false, msg: 'Task not found' })
        }

        console.log(result.rows[0])
        res.status(200).json({ ok: true, result: result.rows[0] })

    } catch (err: any) {
        next(err)
    }
}

export const createTask = async (req: Request, res: Response, next: any) => {
    const task = req.body

    try {
        const result = await pool.query('INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *', [
            task.title,
            task.description
        ])

        console.log(result.rows[0])
        res.status(201).json({ ok: true, result: result.rows[0]})

    } catch (err: any) {
        next(err)
    }
}

export const updateTask = async (req: Request, res: Response, next: any): Promise<any> => {
    const { id } = req.params
    const { title, description } = req.body

    try {
        const result = await pool.query(
            'UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *', 
            [ title, description, id ]
        )

        if (result.rowCount === 0) {
            return res.status(404).json({ ok: false, msg: 'Task not found' })
        }

        res.status(200).json({ ok: true, result: result.rows[0] })

    } catch (err: any) {
        next(err)
    }
}

export const deleteTask = async (req: Request, res: Response, next: any): Promise<any> => {
    const { id } = req.params

    try {
        const result = await pool.query('DELETE FROM task WHERE id = $1', [ id ])

        if (result.rowCount === 0) {
            return res.status(404).json({ ok: false, msg: 'Task not found' })
        }

        res.status(200).json({ ok: true, msg: `Task with id '${id}' deleted successfully`})

    } catch (err: any) {
        next(err)
    }
}