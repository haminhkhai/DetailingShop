import { makeAutoObservable, runInAction } from "mobx"
import { Carousel } from "../models/carousel";
import agent from "../api/agent";
import { toast } from "react-toastify";

export class CarouselStore {
    loading = false;
    loadingInitial = false;
    progress = 0;
    carousels: Carousel[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    createCarousel = async (file: Blob | null, carousel: Carousel) => {
        try {
            if (file) {
                const photoDto = await agent.Photos.uploadPhoto(file, this.setProgress);
                carousel.image = photoDto.url;
                carousel.imageId = photoDto.public_id;
            }
            const responseCarousel = await agent.Carousels.add(carousel);
            this.setProgress(100);
            runInAction(() => {
                this.carousels.push(responseCarousel);
                toast.info("Saved");
                this.setProgress(0);
            })
        } catch (error) {
            console.log(error);
            this.setProgress(0)
        }
    }

    editCarousel = async (file: Blob | null, carousel: Carousel) => {
        try {
            if (file) {
                const photoDto = await agent.Photos.uploadPhoto(file, this.setProgress);
                carousel.image = photoDto.url;
                carousel.imageId = photoDto.public_id;
            }
            await agent.Carousels.edit(carousel);
            this.setProgress(100);
            runInAction(() => {
                this.carousels[this.carousels.indexOf(this.carousels.find(c => c.id === carousel.id)!)] = carousel;
                toast.info("Saved");
                this.progress = 0;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.progress = 0;
            })
        }
    }

    setProgress = (progress: number) => {
        this.progress = progress;
    }

    loadCarousels = async () => {
        this.loadingInitial = true;
        try {
            const carousels = await agent.Carousels.list();
            runInAction(() => {
                this.carousels = carousels;
                this.loadingInitial = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingInitial = false;
            })
        }
    }

    loadCarousel = async (id: number) => {
        let carousel = this.carousels.find(c => c.id === id);
        if (carousel) return carousel;
        else {
            this.loadingInitial = true;
            try {
                carousel = await agent.Carousels.details(id);
                runInAction(() => {
                    this.loadingInitial = false;
                })
                return carousel;
            } catch (error) {
                console.log(error);
                runInAction(() => {
                    this.loadingInitial = false;
                })
                return undefined;
            }
        }

    }

    deleteCarousel = async (id: number) => {
        this.loading = true;
        try {
            await agent.Carousels.delete(id);
            runInAction(() => {
                this.loading = false;
                this.carousels = this.carousels.filter(c => c.id !== id);
            })
        } catch (error) {
            runInAction(() => {
                console.log(error);
                this.loading = false;
            })
        }
    }
}