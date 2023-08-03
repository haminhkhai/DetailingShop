export interface Carousel {
    id: number;
    message: string;
    image: string;
    imageId: string;
}

export class Carousel implements Carousel {
    id = 0;
    message = "";
    image = "";
    imageId = "";
    constructor(carousel?: Carousel) {
        if (carousel) {
            Object.assign(this, carousel);
        }
    }
}