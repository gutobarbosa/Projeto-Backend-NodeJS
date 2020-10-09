import { getRepository } from 'typeorm';
import User from '../models/User';
import path from 'path';
import uploadConfig from '../config/upload';
import fs from 'fs';

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
            throw new Error('Only authenticated users can change avatar');
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
