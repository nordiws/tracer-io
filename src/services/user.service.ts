import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from '../../src/models/user.dto';
import { User } from '../../src/entities/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly repository: Repository<User>) { }

    public async get(id: string): Promise<User> {
        return await this.repository.findOne({ where: { id } });
    }

    public async getAll(): Promise<User[]> {
        return await this.repository.find();
    }

    public async create(userDto: UserDTO): Promise<User> {
        return await this.repository.save(userDto.toEntity());
    }

    public async update(id: string, userDto: UserDTO): Promise<User> {
        const user = userDto.toEntity()
        user.id = id
        return await this.repository.save(user);
    }

    public async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}