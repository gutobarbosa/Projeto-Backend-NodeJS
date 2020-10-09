
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from './CreateUserService';


describe('AuthenticateUser', () =>{
    it('should be able to authenticate', async () =>{
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
        const authenticateUser = new AuthenticateUserService(
            fakeUserRepository,
            fakeHashProvider,
            );

            const user = await createUser.execute({
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: '123456',
            });

            const response = await authenticateUser.execute({
               email: 'johndoe@example.com',
               password: '123456',
            });
            expect(response).toHaveProperty('token');
            expect(response.user).toEqual(user);
        });

        it('shouldnt be able to authenticate with no existing user', async () =>{
            const fakeUserRepository = new FakeUserRepository();
            const fakeHashProvider = new FakeHashProvider();

            const authenticateUser = new AuthenticateUserService(
                fakeUserRepository,
                fakeHashProvider,
                );


                expect(authenticateUser.execute({
                    email: 'johndoe@example.com',
                    password: '123456',
                 })).rejects.toBeInstanceOf(AppError);
            });

            it('shouldnt be able to authenticate with a wrong password', async () =>{
                const fakeUserRepository = new FakeUserRepository();
                const fakeHashProvider = new FakeHashProvider();
                const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
                const authenticateUser = new AuthenticateUserService(
                    fakeUserRepository,
                    fakeHashProvider,
                    );

                    const user = await createUser.execute({
                        name: 'John Doe',
                        email: 'johndoe@example.com',
                        password: '123456',
                    });

                    await authenticateUser.execute({
                       email: 'johndoe@example.com',
                       password: 'wrong password',
                    });
                    expect(authenticateUser.execute({
                        email: 'johndoe@example.com',
                        password: 'wrong password',
                     })).rejects.toBeInstanceOf(AppError);
                });
});
