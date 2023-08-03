import { makeAutoObservable, runInAction } from "mobx"
import { Gallery } from "../models/gallery";
import agent from "../api/agent";
import { toast } from "react-toastify";

export default class GalleryStore {
    loadingInitial = false;
    loading = false;
    progress = 0;
    galleries: Gallery[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    createGallery = async (gallery: Gallery) => {
        try {
            await agent.Galleries.add(gallery);
            toast.info("Album created");
            runInAction(() => {
                this.galleries.push(gallery);
            })
        } catch (error) {
            console.log(error);
        }
    }

    loadGalleries = async () => {
        this.loadingInitial = true;
        try {
            const galleries = await agent.Galleries.list();
            runInAction(() => {
                this.galleries = galleries;
                this.loadingInitial = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingInitial = false)
        }
    }

    loadGallery = async (id: string) => {
        this.loadingInitial = true;
        try {
            let gallery = this.galleries.find(g => g.id === id) || await agent.Galleries.details(id);
            runInAction(() => {
                this.loadingInitial = false;
            })
            return gallery;
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingInitial = false;
            })
        }
    }

    setProgress = (progress: number) => {
        this.progress = progress;
    }

    uploadPhoto = async (file: Blob, id: string) => {
        this.loading = true;
        try {
            const photo = await agent.Photos.uploadPhoto(file, this.setProgress);
            const gallery = await agent.Galleries.addPhoto(id, photo);
            this.setProgress(100);
            runInAction(() => {
                this.loading = false;
                this.galleries[this.galleries.indexOf(this.galleries.find(g => g.id === id)!)] = gallery;
                this.progress = 0;
            })
            return gallery;
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
                this.progress = 0;
            })
            return null;
        }
    }

    editGallery = async (gallery: Gallery) => {
        try {
            await agent.Galleries.editGallery(gallery);
            toast.info("Saved");
            runInAction(() => {
                this.galleries[this.galleries.indexOf(this.galleries.find(g => g.id === gallery.id)!)] = gallery;
            });
        } catch (error) {
            console.log(error);
        }
    }

    deletePhoto = async (id: string) => {
        this.loading = true;
        try {
            await agent.Galleries.deletePhoto(id);
            runInAction(() => {
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteGallery = async (id: string) => {
        this.loading = true;
        try {
            await agent.Galleries.deleteGallery(id);
            runInAction(() => {
                this.galleries = this.galleries.filter(g => g.id !== id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            this.loading = false;
        }
    }
}