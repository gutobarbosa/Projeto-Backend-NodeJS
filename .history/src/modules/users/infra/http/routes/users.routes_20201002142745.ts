import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUserService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);
// POST http://localhost:3333/appointments

// eslint-disable-next-line no-shadow
usersRouter.post('/', async (request, response) => {
    // algumas regras de negocio, email nao pode ser duplicado, password deve ser encriptografada, não posso simplesmente armazena-la, então se tem regra de negocio eu preciso criar um service
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({
        name,
        email,
        password,
    });
    delete user.password;
    return response.json(user);
});
// atualizar uma unica informação utilizamos o patch como por exemplo, atualização de senha, de avatar e mais algumas por ai, mais não que não possamos utilizar o put tbm
// eslint-disable-next-line no-shadow
usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    // eslint-disable-next-line no-shadow
    async (request, response) => {
        const updateUserAvatarService = new UpdateUserAvatarService();
        const user = await updateUserAvatarService.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });
        delete user.password;

        return response.json(user);
    },
);

export default usersRouter;
