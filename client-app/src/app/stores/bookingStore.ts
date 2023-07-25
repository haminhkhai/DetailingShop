import { makeAutoObservable, runInAction } from "mobx"
import { Booking } from "../models/booking";
import agent from "../api/agent";
import { toast } from "react-toastify";

export default class BookingStore {
    loadingInitial = false;
    loading = false;
    bookings: Booking[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    createBooking = async (booking: Booking) => {
        try {
            await agent.Bookings.add(booking);
            toast.info("Thanks for booking, we'll contact again to confirm")
        } catch (error) {
            console.log(error);
        }
    }

    loadBookings = async () => {
        this.loadingInitial = true;
        try {
            const bookings = await agent.Bookings.list();
            bookings.forEach(booking => {
                booking.date = new Date(booking.date + 'Z');
                booking.bookingDate = new Date(booking.bookingDate + 'Z');
            });
            runInAction(() => {
                this.bookings = bookings;
                this.loadingInitial = false;
            });
        } catch (error) {
            console.log(error)
            runInAction(() => this.loadingInitial = false)
        }
    }

    deleteBooking = async (id: string) => {
        this.loading = true;
        try {
            await agent.Bookings.delete(id);
            runInAction(() => {
                this.bookings = this.bookings.filter(b => b.id !== id);
                this.loading = false
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }
}