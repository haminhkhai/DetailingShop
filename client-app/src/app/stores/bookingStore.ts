import { makeAutoObservable, runInAction } from "mobx"
import { Booking } from "../models/booking";
import agent from "../api/agent";
import { toast } from "react-toastify";
import { Pagination, PagingParams } from "../models/pagination";

export default class BookingStore {
    loadingInitial = false;
    loading = false;
    bookings: Booking[] = [];
    selectedBooking: Booking | undefined = undefined;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();

    constructor() {
        makeAutoObservable(this);
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        return params
    }

    createBooking = async (booking: Booking) => {
        try {
            await agent.Bookings.add(booking);
            toast.info("Thanks for booking, we'll contact again to confirm")
        } catch (error) {
            console.log(error);
        }
    }

    setBooking = (booking: Booking) => {
        this.bookings.push(booking);
    }

    loadBookings = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Bookings.list(this.axiosParams);
            result.data.forEach(booking => {
                booking.date = new Date(booking.date + 'Z');
                booking.bookingDate = new Date(booking.bookingDate + 'Z');
                this.setBooking(booking);
            });
            this.setPagination(result.pagination);
            runInAction(() => {
                this.loadingInitial = false;
            });
        } catch (error) {
            console.log(error)
            runInAction(() => this.loadingInitial = false)
        }
    }

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
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

    setSelectedBooking = (booking: Booking) => {
        this.selectedBooking = booking;
    }
}