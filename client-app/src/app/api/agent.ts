import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { User, UserFormValues } from "../models/user";
import { router } from "../router/Routes";
import { AboutUs } from "../models/aboutUs";
import { Review, ReviewDto } from "../models/review";
import { Service, ServiceFormValues } from "../models/service";
import { AddOn, AddOnFormValues } from "../models/addOn";
import { Booking } from "../models/booking";
import { Gallery } from "../models/gallery";
import { store } from "../stores/store";
import { Photo, PhotoDto } from "../models/photo";
import { Carousel } from "../models/carousel";
import { PaginatedResult } from "../models/pagination";
import { Category } from "../models/category";
import { Blog } from "../models/blog";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;

    if (token && config.headers && config.url?.indexOf('cloudinary') === -1) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV === 'development') await sleep(500);

    //cook the paginated response header and return cooked response
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResult(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResult<any>>;
    }

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
    login: (user: UserFormValues) => request.post<User>('/account/login', user),
    current: () => request.get<User>('/account')
}

const Photos = {
    uploadPhoto: async (file: Blob, setProgress: (progress: number) => void) => {
        let formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'm8vcytbn');

        const config = {
            onUploadProgress: (e: any) => {
                const { loaded, total } = e;
                setProgress(loaded / total * 100 - 10);
            }
        }

        const response = await axios.post<PhotoDto>
            ('https://api.cloudinary.com/v1_1/de04qqilt/image/upload', formData, config);
        return responseBody(response);
    }
}

const About = {
    details: () => request.get<AboutUs>('/aboutus'),
    edit: (aboutUs: AboutUs) => request.put<AboutUs>(`/aboutus`, aboutUs),
    addPhoto: (photo: PhotoDto) => request.post('/aboutus', photo)
}

const Reviews = {
    list: () => request.get<Review[]>('/review'),
    add: (reviewDto: ReviewDto) => request.post<Review>('/review', reviewDto),
    setShowReview: (id: string) => request.put(`/review/${id}`, {}),
    delete: (id: string) => request.del(`/review/${id}`)
}

const Services = {
    list: () => request.get<ServiceFormValues[]>('/service'),
    details: (id: string) => request.get<ServiceFormValues>(`/service/${id}`),
    add: (service: Service) => request.post<Service>('/service', service),
    edit: (service: Service) => request.put<Service>('/service', service),
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
    list: (params: URLSearchParams) =>
        axios.get<PaginatedResult<Booking[]>>('/booking', { params }).then(responseBody),
    add: (booking: Booking) => request.post('/booking', booking),
    delete: (id: string) => request.del(`/booking/${id}`)
}

const Galleries = {
    add: (gallery: Gallery) => request.post('/gallery', gallery),
    list: () => request.get<Gallery[]>('/gallery'),
    details: (id: string) => request.get<Gallery>(`/gallery/${id}`),
    addPhoto: (id: string, photo: PhotoDto) => request.put<Gallery>(`/gallery/${id}`, photo),
    editGallery: (gallery: Gallery) => request.put('/gallery', gallery),
    deletePhoto: (id: string) => request.del(`/photo/${id}`),
    deleteGallery: (id: string) => request.del(`/gallery/${id}`)
}

const Carousels = {
    add: (carousel: Carousel) => request.post<Carousel>('/carousel', carousel),
    list: () => request.get<Carousel[]>('/carousel'),
    details: (id: number) => request.get<Carousel>(`/carousel/${id}`),
    edit: (carousel: Carousel) => request.put(`/carousel`, carousel),
    delete: (id: number) => request.del(`/carousel/${id}`)
}

const ReCaptcha = {
    post: (token: string) => axios.post('/recaptcha', token,
        {
            headers: { 'Content-Type': 'application/json' }
        }).then(responseBody)
}

const Categories = {
    add: (category: Category) => request.post('/category', category),
    list: () => request.get<Category[]>('/category'),
    delete: (id: string) => request.del(`/category/${id}`),
    details: (id: string) => request.get<Category>(`/category/${id}`),
    edit: (category: Category) => request.put('/category', category)
}

const Blogs = {
    add: (blog: Blog) => request.post('/blog', blog),
    list: () => request.get<Blog[]>('/blog'),
    listByCategory: (category: string) => request.get<Blog[]>(`/blog/${category}`),
    details: (id: string, category: string) => request.get<Blog>(`/blog/${category}/${id}`),
    search: (params: URLSearchParams) =>
        axios.get<Blog[]>('/blog/search', { params }).then(responseBody),
    edit: (blog: Blog) => request.put('/blog', blog),
    delete: (id: string) => request.del(`/blog/${id}`)
}

const agent = {
    Account,
    About,
    Reviews,
    Services,
    AddOns,
    Bookings,
    Galleries,
    Photos,
    Carousels,
    ReCaptcha,
    Categories,
    Blogs
}

export default agent;