import { makeAutoObservable, runInAction } from "mobx"
import { Gallery } from "../models/gallery";
import agent from "../api/agent";
import { toast } from "react-toastify";

export default class GalleryStore {
    loadingInitial = false;
    loading = false;
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
            const gallery = await agent.Galleries.details(id);
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

    uploadPhoto = async (file: Blob, id: string) => {
        this.loading = true;
        try {
            const gallery = await agent.Galleries.addPhoto(file, id);
            runInAction(() => {
                this.loading = false;
                this.galleries[this.galleries.indexOf(this.galleries.find(g => g.id === id)!)] = gallery;
            })
            return gallery;
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false)
            return null;
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
            runInAction(()=>{
                this.galleries = this.galleries.filter(g => g.id !== id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            this.loading = false;
        }
    }
}