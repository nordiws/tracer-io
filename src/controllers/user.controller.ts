import { ApiTags } from '@nestjs/swagger';
import { UserDTO } from '../models/user.dto';
import { UserService } from '../services/user.service';
import { User } from 'src/entities/user.entity';
import { Controller, Get, Post, Param, Delete, Body } from '@nestjs/common';

interface IUserController {
    id: string
}

@ApiTags("UserController")
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.getAll();
    }
    @Get(":id")
    findUser(@Param() params: IUserController): Promise<User> {
        return this.userService.get(params.id);
    }
    @Post()
    createUser(@Body() userDto: UserDTO): Promise<User> {
        return this.userService.create(userDto);
    }
    @Post(":id")
    updateUser(@Param() params: IUserController, @Body() userDto: UserDTO): Promise<User> {
        return this.userService.update(params.id, userDto);
    }
    @Delete(":id")
    deleteUser(@Param() params: IUserController): Promise<void> {
        return this.userService.delete(params.id);
    }
}
