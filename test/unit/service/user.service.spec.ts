import { Test } from '@nestjs/testing';
import { defaultUser } from '../helpers';
import { UserDTO } from '../../../src/models/user.dto';
import { User } from '../../../src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../../src/services/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
    let userService: UserService;
    let userRepository: Repository<User>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
            ],
        }).compile();

        userService = moduleRef.get<UserService>(UserService);
        userRepository = moduleRef.get<Repository<User>>(getRepositoryToken(User));
    });

    describe('get', () => {
        it('should return a user', async () => {
            const userId = '1';
            const userDto = UserDTO.fromObj(defaultUser);
            const mockUser = userDto.toEntity();
            mockUser.id = userId;
            jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(mockUser);

            const result = await userService.get(userId);

            expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: userId } });
            expect(result).toEqual(mockUser);
        });
    });

    describe('getAll', () => {
        it('should return an array of users', async () => {
            const userDto = UserDTO.fromObj(defaultUser);
            const user1 = userDto.toEntity();
            user1.id = '1';
            const user2 = userDto.toEntity();
            user2.id = '2';
            const mockUsers = [user1, user2];
            jest.spyOn(userRepository, 'find').mockResolvedValueOnce(mockUsers);

            const result = await userService.getAll();

            expect(userRepository.find).toHaveBeenCalled();
            expect(result).toEqual(mockUsers);
        });
    });

    describe('create', () => {
        it('should create a new user', async () => {
            const userDto = UserDTO.fromObj(defaultUser);
            const createdUser = userDto.toEntity();
            jest.spyOn(userRepository, 'save').mockResolvedValueOnce(createdUser);

            const result = await userService.create(userDto);

            expect(userRepository.save).toHaveBeenCalledWith(createdUser);
            expect(result).toEqual(createdUser);
        });
    });

    describe('update', () => {
        it('should update an existing user', async () => {
            const userId = '1';
            const userDto = UserDTO.fromObj(defaultUser);
            const updatedUser = userDto.toEntity();
            updatedUser.id = userId;
            jest.spyOn(userRepository, 'save').mockResolvedValueOnce(updatedUser);

            const result = await userService.update(userId, userDto);

            expect(userRepository.save).toHaveBeenCalledWith(updatedUser);
            expect(result).toEqual(updatedUser);
        });
    });

    describe('delete', () => {
        it('should delete a user', async () => {
            const userId = '1';
            jest.spyOn(userRepository, 'delete').mockResolvedValueOnce(undefined);

            await userService.delete(userId);

            expect(userRepository.delete).toHaveBeenCalledWith(userId);
        });
    });
});