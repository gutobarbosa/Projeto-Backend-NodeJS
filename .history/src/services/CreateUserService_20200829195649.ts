import { getRepository } from 'typeorm'; //como não iremos usar metodo especifico nenhuma, como por exemplo procurar um usuario que comece com a letra A, iremos utilizar apenas funções padrão como insert, put, delete or list podemos apenas importar o getRepository e fazer dali mesmo.

import User from '../models/User';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        const usersRepository = getRepository(User);
        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });

        if (checkUserExists){
            throw new Error('Email address already used.');
        }
        const user = usersRepository.create();
    }
}

export default CreateUserService;
