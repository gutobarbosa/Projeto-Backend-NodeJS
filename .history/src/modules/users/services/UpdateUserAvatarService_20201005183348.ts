import path from 'path';
import fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
    // eslint-disable-next-line camelcase
    user_id: string;
    avatarFilename: string;
}

@injectable()
class UpdateUserService {
    // eslint-disable-next-line no-useless-constructor
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    // eslint-disable-next-line camelcase
    public async execute({ user_id, avatarFilename }: Request): Promise<User> {
        // agora teremos todos as informações de usuario
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError(
                'Only authenticated users can change avatar',
                401,
            );
        }
        if (user.avatar) {
            // deletar avatar anterior
            // iremos unir os caminho com o nome até onde o user.avatar esta, achando o caminho e o nome do arquivo iremos verificar se ele existe atraves da função stat do fs, se ele existir, removemos
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
        user.avatar = avatarFilename;
        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserService;
