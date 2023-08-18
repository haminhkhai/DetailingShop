import { makeAutoObservable, runInAction } from "mobx";
import { AboutUs } from "../models/aboutUs";
import agent from "../api/agent";
import { toast } from "react-toastify";

export default class AboutUsStore {
    aboutUs: AboutUs = new AboutUs();
    progress = 0;
    uploading = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadAboutUs = async () => {
        try {
            let aboutUs = await agent.About.details();
            runInAction(() => {
                this.aboutUs = aboutUs;
            });
        } catch (error) {
            console.log(error);
        }
    }

    editAboutUs = async (aboutUs: AboutUs) => {
        try {
            await agent.About.edit(aboutUs);
            toast.info("Saved");
            // runInAction(() => this.aboutUs = aboutUs);
        } catch (error) {
            console.log(error);
        }
    }

    setProgress = (progress: number) => {
        this.progress = progress;
    }

    uploadPhoto = async (file: Blob) => {
        this.uploading = true;
        try {
            const responsePhoto = await agent.Photos.uploadPhoto(file, this.setProgress);
            await agent.About.addPhoto(responsePhoto);
            this.setProgress(100);
            runInAction(() => {
                if (this.aboutUs) {
                    this.aboutUs.image = responsePhoto.url;
                    this.aboutUs.imageId = responsePhoto.public_id;
                }
                this.progress = 0;
                this.uploading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.uploading = false;
                this.progress = 0;
            });
        }
    }
}
