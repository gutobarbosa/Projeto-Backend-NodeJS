import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeDiscStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';



describe('UpdateUserAvatar', () =>{
    it('should be able to create avatar', async () =>{
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

        it('shouldnt be able to update avatar from no exist user', async () =>{
            const fakeUserRepository = new FakeUserRepository();
            const fakeStorageProvider = new FakeStorageProvider();

            const updateUserAvatar = new UpdateUserAvatarService(
                fakeUserRepository,
                fakeStorageProvider,

                );

                expect(
                    updateUserAvatar.execute({
                    user_id: 'non-existing-user',
                    avatarFilename: 'avatar.jgp',

                  })).rejects.toBeInstanceOf(AppError);
            });

            it('should delete old avatar when updating new one', async () =>{
                const fakeUserRepository = new FakeUserRepository();
                const fakeStorageProvider = new FakeStorageProvider();

                const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

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

                    await updateUserAvatar.execute({
                        user_id: user.id,
                        avatarFilename: 'avatar2.jgp',

                      });
                    expect(deleteFile).toHaveBeenCalledWith('avatar.jgp');
                    expect(user.avatar).toBe('avatar2.jpg');
                });

    });
