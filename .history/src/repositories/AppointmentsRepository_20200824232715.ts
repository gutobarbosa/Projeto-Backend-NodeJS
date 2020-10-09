import Appointment from '../models/Appointment';

class AppointmentsRepository {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    public create(provider: string, date: Date) {
        const appointment = new Appointment(provider, date);

        this.appointments.push(appointment);

        return appointment;
    }
}
