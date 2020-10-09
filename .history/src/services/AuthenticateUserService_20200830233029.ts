import { Router } from 'express';
import { getRepository } from 'typeorm'; // como não iremos usar metodo especifico nenhuma, como por exemplo procurar um usuario que comece com a letra A, iremos utilizar apenas funções padrão como insert, put, delete or list podemos apenas importar o getRepository e fazer dali mesmo.
import { compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import User from '../models/User';

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
            throw new Error('Incorrect email/password combination.');
        }
        // user.password - Senha criptografada
        // password - Senha não-criptografada
        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error('Incorrect email/password combination.');
        }

        const token = sign({}, '5d0f691533da5890c362d6e8e1ff09bc', {
            subject: user.id,
            expiresIn: '1d',
        });

        return {
            user,
            token,
        };
    }
}
export default AuthenticateUserService;
