export interface Booking {
    name: string;
    tel: string;
    email: string;
    date: Date | null;
    message: string;
}

export class Booking implements Booking {
    constructor(booking: Booking) {
        this.name = booking.name;
        this.tel = booking.tel;
        this.email = booking.email;
        this.date = booking.date;
        this.message = booking.message;
    }
}