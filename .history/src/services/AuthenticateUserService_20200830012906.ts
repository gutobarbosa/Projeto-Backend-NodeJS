import { Request } from "express";

interface Request {
    email: string;
    password: string;
}


class AuthenticateUserService {
    public async execute({ email, password}: Request)
}
