
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () =>{
    it('should be able to create a new appointment', async () =>{
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const CreateAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,

            );

            const appointment = await CreateAppointment.execute({
                date: new Date(),
                provider_id: '1321321321',
            });
            expect(appointment).toHaveProperty('id');
            expect(appointment.provider_id).toBe('1321321321');
    });



  /*  it('shouldnt be able to create two appointments on the same date/time', () =>{
        expect
    });*/
});
