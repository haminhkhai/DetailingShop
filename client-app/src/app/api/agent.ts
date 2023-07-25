import axios, { AxiosError, AxiosResponse } from "axios";
import { User, UserFormValues } from "../models/user";
import { router } from "../router/Routes";
import { AboutUs, PhotoDto } from "../models/aboutUs";
import { Review } from "../models/review";
import { Service, ServiceFormValues } from "../models/service";
import { AddOn, AddOnFormValues } from "../models/addOn";
import { Booking } from "../models/booking";
import { Gallery } from "../models/gallery";
import { store } from "../stores/store";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api'

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.response.use(async response => {
    await sleep(500);
    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                router.navigate('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                console.log(data);
            }
            break;
        case 401:
            console.log('unauthorised');
            break;
        case 403:
            console.log('forbidden');
            break;
        case 404:
            router.navigate('/not-found');
            break;
        case 500:
            console.log("sokratis");
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
    }
    //pass the error back to the component that was calling the method
    return Promise.reject(error);
})

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Account = {
    login: (user: UserFormValues) => request.post<User>('/account/login', user)
}

const About = {
    details: () => request.get<AboutUs>('/aboutus'),
    edit: (aboutUs: AboutUs) => request.put<AboutUs>(`/aboutus`, aboutUs),
    uploadPhoto: (file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post<PhotoDto>('/aboutus', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
}

const Reviews = {
    list: () => request.get<Review[]>('/review'),
    add: (files: Blob[], review: Review) => {
        let formData = new FormData();

        files.forEach(file => {
            formData.append('File', file);
        });
        formData.append('Rating', review.rating.toString());
        formData.append('Name', review.name);
        formData.append('Experience', review.experience);
        return axios.post<Review>('/review', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    setShowReview: (id: string) => request.put(`/review/${id}`, {}),
    delete: (id: string) => request.del(`/review/${id}`)
}

const Services = {
    list: () => request.get<ServiceFormValues[]>('/service'),
    details: (id: string) => request.get<ServiceFormValues>(`/service/${id}`),
    add: (file: Blob | null, service: Service) => {
        let formData = new FormData();
        if (file) {
            formData.append('File', file);
        }
        formData.append('VehicleType', service.vehicleType);
        formData.append('Name', service.name);
        formData.append('Price', service.price);
        formData.append('Description', service.description);
        return axios.post<Service>('/service', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    edit: (file: Blob | null, service: Service) => {
        let formData = new FormData();
        if (file) {
            formData.append('File', file);
        }
        formData.append('Id', service.id);
        formData.append('VehicleType', service.vehicleType);
        formData.append('Name', service.name);
        formData.append('Description', service.description);
        formData.append('Price', service.price);
        return axios.put<Service>('/service', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    delete: (id: string) => request.del(`/service/${id}`)
}

const AddOns = {
    list: () => request.get<AddOnFormValues[]>('/addon'),
    details: (id: string) => request.get<AddOnFormValues>(`/addon/${id}`),
    add: (addOn: AddOn) => request.post<AddOnFormValues>('/addon', addOn),
    edit: (addOn: AddOn) => request.put<AddOnFormValues>('/addon', addOn),
    delete: (id: string) => request.del(`/addon/${id}`)
}

const Bookings = {
    add: (booking: Booking) => request.post('/booking', booking),
    list: () => request.get<Booking[]>('/booking'),
    delete: (id: string) => request.del(`/booking/${id}`)
}

const Galleries = {
    add: (gallery: Gallery) => request.post('/gallery', gallery),
    list: () => request.get<Gallery[]>('/gallery'),
    details: (id: string) => request.get<Gallery>(`/gallery/${id}`),
    addPhoto: (file: Blob, id: string) => {
        let formData = new FormData();
        formData.append("File", file);
        formData.append("Id", id);
        return axios.put<Gallery>('/gallery', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(responseBody)
    },
    deletePhoto: (id: string) => request.del(`/photo/${id}`),
    deleteGallery: (id: string) => request.del(`/gallery/${id}`)
}

const agent = {
    Account,
    About,
    Reviews,
    Services,
    AddOns,
    Bookings,
    Galleries
}

export default agent;