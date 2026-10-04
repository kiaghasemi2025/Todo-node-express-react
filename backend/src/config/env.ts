import 'dotenv/config'

import {z} from 'zod'

const envSchema = z.object({
    PORT:z.coerce.number().default(2000) ,
    URI:z.string().min(1,'URI is required'),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
})

export const env = envSchema.parse(process.env)