// handles /auth/login, /auth/register, /auth/refresh
import {Get, Post, Controller} from "nestjs/common"
import createUserSchema from '../users/schemas'
import { CreateUserDto } from "./dtos/createUser.dto.js"

@Controller('register')
export class CatsController {
    @Post()
    create(@Body({schema: createUserSchema}) createUserDto: CreateUserDto )
}