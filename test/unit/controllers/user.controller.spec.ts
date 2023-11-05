import { Test } from '@nestjs/testing';
import { defaultUser } from '../helpers';
import { UserDTO } from '../../../src/models/user.dto';
import { User } from '../../../src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../../src/services/user.service';
import { UserController } from '../../../src/controllers/user.controller';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;
    let userRepository: Repository<User>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
            ],
        }).compile();

        userController = moduleRef.get<UserController>(UserController);
        userService = moduleRef.get<UserService>(UserService);
        userRepository = moduleRef.get<Repository<User>>(getRepositoryToken(User));
    });

    describe('findAll', () => {
        it('should return an array of users', async () => {
            const mockUsers: User[] = []; // Mock the expected array of users
            jest.spyOn(userService, 'getAll').mockResolvedValueOnce(mockUsers);

            const result = await userController.findAll();

            expect(result).toBe(mockUsers);
            expect(userService.getAll).toHaveBeenCalled();
        });
    });

    describe('findUser', () => {
        it('should return a user by id', async () => {
            const userId = '1';
            const userDto = UserDTO.fromObj(defaultUser);
            const mockUser = userDto.toEntity();
            mockUser.id = userId;
            jest.spyOn(userService, 'get').mockResolvedValueOnce(mockUser);

            const result = await userController.findUser({ id: userId });

            expect(result).toBe(mockUser);
            expect(userService.get).toHaveBeenCalledWith(userId);
        });
    });

    describe('createUser', () => {
        it('should create a new user', async () => {
            const userId = '1';
            const userDto = UserDTO.fromObj(defaultUser);
            const mockUser = userDto.toEntity();
            mockUser.id = userId;
            jest.spyOn(userService, 'create').mockResolvedValueOnce(mockUser);

            const result = await userController.createUser(userDto);

            expect(result).toBe(mockUser);
            expect(userService.create).toHaveBeenCalledWith(userDto);
        });
    });

    describe('updateUser', () => {
        it('should update a user', async () => {
            const userId = '1';
            const userDto = UserDTO.fromObj(defaultUser);
            const mockUser = userDto.toEntity();
            mockUser.id = userId;
            jest.spyOn(userService, 'update').mockResolvedValueOnce(mockUser);

            const result = await userController.updateUser({ id: userId }, userDto);

            expect(result).toBe(mockUser);
            expect(userService.update).toHaveBeenCalledWith(userId, userDto);
        });
    });

    describe('deleteUser', () => {
        it('should delete a user', async () => {
            const userId = '1';
            jest.spyOn(userRepository, 'delete').mockResolvedValueOnce(undefined);

            await userController.deleteUser({ id: userId });

            expect(userRepository.delete).toHaveBeenCalledWith(userId);
        });
    });
});