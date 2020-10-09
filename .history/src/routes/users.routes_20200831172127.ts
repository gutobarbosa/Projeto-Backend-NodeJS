import { Router, request, response } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);
// POST http://localhost:3333/appointments

// eslint-disable-next-line no-shadow
usersRouter.post('/', async (request, response) => {
    try {
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
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
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
