import { Request, Response, NextFunction } from 'express';
import { verify, decode } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    // validação do token JWT

    const authHeader = request.headers.authorization; // como havia informado antes precisamos pegar o as informações do token no header, então.
    if (!authHeader) {
        throw new Error('JWT token is missing');
    }

    // Baerer dasjodpas13215 sera essa a informacao
    // iremos dividir o Bearer do token em sí
    // como não vamos utilizar o type da desestruturação podemos deixar vazio
    // const { type, token } = authHeader.split('');
    // e iremos separar o type do token pelo espaço entre eles através do split, ele devolvera um array com duas informações
    const [, token] = authHeader.split(' ');
    console.log(token);

    try {
        const decoded = verify(token, authConfig.jwt.secret);
        // se passar e o token for valido, teremos aqui os dados do usuario que passamos, e no caso oque realmente importa é oque vem no sub..
        // nesse '' iremos passar nossa chave secreta que utilizamos para gerar o token, e como utilizamos ela diversar vezes vamos abstrai-la num arquivo a parte de configuração.
        // e permitiremos que o usuario continue a navegar na aplicação
        const { sub } = decoded as TokenPayload;

        request.user = {
            id: sub,
        };
        return next();
    } catch (err) {
        throw new Error('Invalid JWT token');
    }
}
