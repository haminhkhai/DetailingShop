import { Photo } from "./photo";

// export interface Review {
//     id: string;
//     name: string;
//     experience: string;
//     photos?: Photo[];
// }

export class Review {
    rating = 0;
    id = "";
    name = "";
    date: Date = new Date();
    experience = "";
    isShowed = false;
    photos?: Photo[] = [];
    constructor(review?: Review) {
        if (review) {
            this.id = review.id;
            this.rating = review.rating;
            this.name = review.name;
            this.date = review.date;
            this.isShowed = review.isShowed;
            this.experience = review.experience;
            this.photos = review.photos;
        }
    }
}