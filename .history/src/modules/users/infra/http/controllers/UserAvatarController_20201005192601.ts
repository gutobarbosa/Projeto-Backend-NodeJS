// segundo as regras de API restfull só pode haver 5 metodos aqui index.show,create, update, delete.
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class SessionsController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateUserAvatarService = container.resolve(
            UpdateUserAvatarService,
        );
        const user = await updateUserAvatarService.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });
        delete user.password;

        return response.json(user);
    }
}
