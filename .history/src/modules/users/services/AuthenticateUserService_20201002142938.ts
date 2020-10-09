import { getRepository } from 'typeorm'; // como não iremos usar metodo especifico nenhuma, como por exemplo procurar um usuario que comece com a letra A, iremos utilizar apenas funções padrão como insert, put, delete or list podemos apenas importar o getRepository e fazer dali mesmo.
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);
        const user = await usersRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }
        // user.password - Senha criptografada
        // password - Senha não-criptografada
        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return {
            user,
            token,
        };
    }
}
export default AuthenticateUserService;
