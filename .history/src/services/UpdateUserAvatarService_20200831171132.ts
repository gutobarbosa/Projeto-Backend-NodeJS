import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import AppError from '../errors/AppError';
import uploadConfig from '../config/upload';

interface Request {
    // eslint-disable-next-line camelcase
    user_id: string;
    avatarFilename: string;
}

class UpdateUserService {
    // eslint-disable-next-line camelcase
    public async execute({ user_id, avatarFilename }: Request): Promise<User> {
        // agora teremos todos as informações de usuario
        const usersRepository = getRepository(User);
        const user = await usersRepository.findOne(user_id);

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
        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserService;
