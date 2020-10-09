import { Router } from 'express';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// POST http://localhost:3333/appointments
appointmentsRouter.use(ensureAuthenticated);
/* appointmentsRouter.get('/', async (request, response) => {
    const appointments = await appointmentsRepository.find();
    return response.json(appointments);
}); */
appointmentsRouter.post('/', async (request, response) => {
    // eslint-disable-next-line camelcase
});

export default appointmentsRouter;
