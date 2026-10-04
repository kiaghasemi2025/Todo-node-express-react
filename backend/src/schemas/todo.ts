import { z } from 'zod';

export const createTodoSchema = z.object({
    text: z.string().trim().min(1, 'Text is required').max(100),
    description: z.string().trim().min(1, 'Description is required').max(500)
})

export const updatedTodoSchema = z.object({
    text: z.string().trim().min(1).max(100),
    description: z.string().trim().min(1).max(500),
    status:z.boolean(),
})
.partial()
.refine((data) => Object.keys(data).length > 0, {
    message:'Send at least one field to update'
});


export const idParamSchema = z.object({
    id:z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid id")
})

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updatedTodoSchema>