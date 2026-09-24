/* Dto - Data Transfer Object schema. 
- Is better than TS interfaces since those are scrapped off during compilation

*/
import * as z from "zod"
import {userSchema} from '../../users/schemas/userSchema.js'

export class CreateUserDto implements z.infer<typeof userSchema> {
    email: string;
    fullname: string;
    password: string;
}
