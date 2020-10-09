
import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeDiscStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';


describe('UpdateUserAvatar', () =>{
    it('should be able to create a new user', async () =>{
        const fakeUserRepository = new FakeUserRepository();
        const fakeStorageProvider = new FakeStorageProvider();
        const updateUserAvatar = new UpdateUserAvatarService(
            fakeUserRepository,
            fakeStorageProvider,

            );
            const user = await fakeUserRepository.create({
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: '123456',
            });
            await updateUserAvatar.execute({
              user_id: user.id,
              avatarFilename: 'avatar.jgp',

            });
            expect(user.avatar).toBe('avatar.jgp');
        });

    });
