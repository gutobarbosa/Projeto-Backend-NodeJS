import { getRepository } from 'typeorm';
import User from '../models/User';
import path from 'path';
import uploadConfig from '../config/upload';

interface Request {
    // eslint-disable-next-line camelcase
    user_id: string;
    avatarFilename: string;
}

class UpdateUserService {
    // eslint-disable-next-line camelcase
    public async execute({ user_id, avatarFilename }: Request): Promise<void> {
        // agora teremos todos as informações de usuario
        const usersRepository = getRepository(User);
        const user = await usersRepository.findOne(user_id);

        if (!user) {
            throw new Error('Only authenticated users can change avatar');
        }
        if (user.avatar) {
            // deletar avatar anterior
            const userAvatarFilePath =
        }
    }
}

export default UpdateUserService;
