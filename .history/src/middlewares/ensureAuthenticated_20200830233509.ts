import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

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
    const [, token] = authHeader.split('');
    // nesse '' iremos passar nossa chave secreta que utilizamos para gerar o token, e como utilizamos ela diversar vezes vamos abstrai-la num arquivo a parte de configuração.
    const { secret } = authConfig.jwt;
    const decoded = verify(token, secret);
}
