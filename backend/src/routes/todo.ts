import { Router } from 'express';
import { getTodos, addTodo } from '../controllers/todo.js'
const router = Router()


router.get('/', getTodos)
router.post('/', addTodo)

export default router