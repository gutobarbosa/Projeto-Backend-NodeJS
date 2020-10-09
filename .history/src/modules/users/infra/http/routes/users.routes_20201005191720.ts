import { Router } from 'express';
import { container } from 'tsyringe';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();

usersRouter.post('/', usersController.create);

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    // eslint-disable-next-line no-shadow
    async (request, response) => {
        const updateUserAvatarService = container.resolve(
            UpdateUserAvatarService,
        );
        const user = await updateUserAvatarService.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });
        delete user.password;

        return response.json(user);
    },
);

export default usersRouter;
