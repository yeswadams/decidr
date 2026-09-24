import * as z from 'zod'

export const userSchema = z.object({
    email: z.email(),
    username: z.string().optional(),
    fullname: z.string(),
    password: z.string()
})