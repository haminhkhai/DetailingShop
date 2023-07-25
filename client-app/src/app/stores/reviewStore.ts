import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Review } from "../models/review";
import { format } from "date-fns";
import { store } from "./store";

export default class ReviewStore {

    loading = false;
    loadingInitial = false;
    uploading = false;
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
                this.reviews = reviews;
                this.reviews.forEach(review => {
                    review.date = new Date(review.date + 'Z');
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
                    review.date = new Date(review.date + 'Z');
                    console.log(this.averageRating);
                });
                this.loadingInitial = false
            });
        } catch (error) {
            console.log(error)
            runInAction(() => this.loadingInitial = false);
        }
    }

    addReview = async (files: Blob[], review: Review) => {
        this.uploading = true;
        try {
            const response = await agent.Reviews.add(files, review);
            // const reviewResponse = response.data;
            runInAction(() => {
                // console.log(reviewResponse);
                this.uploading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.uploading = false);
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