import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Review, ReviewDto } from "../models/review";
import { format } from "date-fns";
import { store } from "./store";
import { PhotoDto } from "../models/photo";

export default class ReviewStore {

    loading = false;
    loadingInitial = false;
    uploading = false;
    progress = 0;
    reviews: Review[] = [];
    averageRating: string = "";

    constructor() {
        makeAutoObservable(this);
    }

    loadReviews = async () => {
        this.loadingInitial = true;
        try {
            const reviews = await agent.Reviews.list();
            runInAction(() => {
                if (reviews.length > this.reviews.length) this.reviews = reviews;
                this.reviews.forEach(review => {
                    review.date = new Date(review.date);
                });
                this.loadingInitial = false
            });
        } catch (error) {
            console.log(error)
            runInAction(() => this.loadingInitial = false);
        }
    }

    loadReviewsShowcase = async () => {
        this.loadingInitial = true;
        try {
            const reviews = await agent.Reviews.list();
            runInAction(() => {
                this.reviews = reviews.filter(r => r.isShowed);
                this.reviews.forEach(review => {
                    this.averageRating = (this.reviews.reduce((sum, rating) => sum + rating.rating, 0) / this.reviews.length).toFixed(1)
                    review.date = new Date(review.date);
                });
                this.loadingInitial = false
            });
        } catch (error) {
            console.log(error)
            runInAction(() => this.loadingInitial = false);
        }
    }

    setProgress = (progress: number) => {
        this.progress = progress;
    }

    addReview = async (files: Blob[], reviewDto: ReviewDto) => {
        this.uploading = true;
        try {
            let photos: PhotoDto[] = [];

            for (let i = 0; i < files.length; i++) {
                photos.push(await agent.Photos.uploadPhoto(files[i], this.setProgress));
                if (i < files.length - 1) this.setProgress(100);
            }

            reviewDto.photos = photos;
            const review = await agent.Reviews.add(reviewDto);
            this.setProgress(100);
            runInAction(() => {
                // this.reviews.push(review);
                this.uploading = false;
                this.setProgress(0);
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.uploading = false;
                this.setProgress(0);
            });
        }
    }

    setShow = async (id: string) => {
        this.loading = true;
        try {
            await agent.Reviews.setShowReview(id);
            runInAction(() => {
                if (this.reviews && this.reviews.find(p => p.id === id)) {
                    var currentState = this.reviews.find(p => p.id === id)?.isShowed;
                    this.reviews.find(p => p.id === id)!.isShowed = !currentState;
                    this.loading = false
                }
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    setReviews = (reviews: Review[]) => {
        this.reviews = reviews;
    }

    SortReviews = (predicate: string) => {
        switch (predicate) {
            case "newest":
                this.setReviews(Array.from(this.reviews).sort((b, a) =>
                    a.date!.getTime() - b.date!.getTime())
                )
                break;
            case "highest":
                this.setReviews(Array.from(this.reviews).sort((a, b) => b.rating - a.rating))
                break;
            case "lowest":
                this.setReviews(Array.from(this.reviews).sort((a, b) => a.rating - b.rating))
                break;
            default:
                break;
        }
    }

    deleteReview = async (id: string) => {
        this.loading = true;
        try {
            await agent.Reviews.delete(id);
            runInAction(() => {
                this.loading = false;
                this.reviews = this.reviews.filter(r => r.id != id);
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}