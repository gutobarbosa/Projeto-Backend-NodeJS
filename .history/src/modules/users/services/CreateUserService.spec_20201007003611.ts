
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';


describe('CreateUser', () =>{
    it('should be able to create a new user', async () =>{
        const fakeUserRepository = new FakeUserRepository();
        const CreateUser = new CreateUserService(
            fakeUserRepository,

            );

            const user = await CreateUser.execute({
               name: 'John Doe2',
               email: 'johndoe2@example.com',
               password: '123456',
            });
            expect(user).toHaveProperty('id');
        });

    it('shouldnt be able to create a new user with the same email', async () =>{
        const fakeUserRepository = new FakeUserRepository();
        const CreateUser = new CreateUserService(fakeUserRepository);

             await CreateUser.execute({
               name: 'John Doe',
               email: 'johndoe@example.com',
               password: '123456',
            });

            expect(
                CreateUser.execute({
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: '123456',
             }),
             ).rejects.toBeInstanceOf(AppError);
        });
    });
