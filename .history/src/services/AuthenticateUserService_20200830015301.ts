import { Router } from 'express';
import { getRepository } from 'typeorm'; // como não iremos usar metodo especifico nenhuma, como por exemplo procurar um usuario que comece com a letra A, iremos utilizar apenas funções padrão como insert, put, delete or list podemos apenas importar o getRepository e fazer dali mesmo.
import { compare } from 'bcryptjs';
import User from '../models/User';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);
        const user = await usersRepository.findOne({
            where: { email },
        });

        if (!user){
            throw new Error('Incorrect email/password combination.');
        }
        // user.password - Senha criptografada
        // password - Senha não-criptografada
        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error('Incorrect email/password combination.');
        }

        // Se passou até aqui, então o usuário está autenticado
        return {
            user,
        };
    }
}
export default AuthenticateUserService;
