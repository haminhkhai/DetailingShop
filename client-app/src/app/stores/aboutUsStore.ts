import { makeAutoObservable, runInAction } from "mobx";
import { AboutUs } from "../models/aboutUs";
import agent from "../api/agent";

export default class AboutUsStore {
    aboutUs: AboutUs = new AboutUs();
    uploading = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadAboutUs = async () => {
        try {
            let aboutUs = await agent.About.details();
            runInAction(() => this.aboutUs = aboutUs);
        } catch (error) {
            console.log(error);
        }
    }

    editAboutUs = async (aboutUs: AboutUs) => {
        try {
            await agent.About.edit(aboutUs);
            // runInAction(() => this.aboutUs = aboutUs);
        } catch (error) {
            console.log(error);
        }
    }

    uploadPhoto = async (file: Blob) => {
        this.uploading = true;
        try {
            const response = await agent.About.uploadPhoto(file);
            const photo = response.data;
            runInAction(() => {
                if (this.aboutUs) {
                    this.aboutUs.image = photo.url;
                    this.aboutUs.imageId = photo.id;
                    console.log(this.aboutUs.image);
                    console.log(response.data);
                }
                this.uploading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.uploading = false);
        }
    }
}
