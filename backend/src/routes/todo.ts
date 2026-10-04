import { Router } from 'express';
import { validateBody, validateParams } from '../middlewares/validate.js';
import { createTodoSchema, updatedTodoSchema, idParamSchema } from '../schemas/todo.js'
import { getTodos, addTodo, updateTodo, deleteTodo } from '../controllers/todo.js'
const router: Router = Router()


router.get('/', getTodos)
router.post('/', validateBody(createTodoSchema), addTodo)
router.patch('/:id', validateParams(idParamSchema), validateBody(updatedTodoSchema), updateTodo)
router.delete('/:id', validateParams(idParamSchema), deleteTodo)

export default router