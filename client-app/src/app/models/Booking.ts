
import { AddOnFormValues } from "./addOn";
import { Service } from "./service";

export interface Booking {
    id: string;
    name: string;
    tel: string;
    email: string;
    total: string;
    date: Date | null;
    bookingDate: Date | null;
    message: string;
    service: Service;
    bookingAddOns: AddOnFormValues[];
    captchaToken: string;
}

export class Booking implements Booking {
    id = "";
    name = "";
    tel = "";
    email = "";
    total = "0";
    date: Date | null = new Date();
    bookingDate: Date | null = null;
    message = "";
    service = new Service();
    bookingAddOns: AddOnFormValues[] = [];
    captchaToken: string = "";


    constructor(booking?: Booking) {
        if (booking) {
            this.id = booking.id;
            this.name = booking.name;
            this.tel = booking.tel;
            this.email = booking.email;
            this.total = booking.total;
            this.date = booking.date;
            this.bookingDate = booking.bookingDate;
            this.message = booking.message;
            this.service = booking.service;
            this.bookingAddOns = booking.bookingAddOns;
            this.captchaToken = booking.captchaToken;
        }
    }
}