export interface AboutUs {
    id: number;
    header: string;
    body: string;
    imageId: string;
    image: string;
}

export class AboutUs implements AboutUs {
    id = 1;
    header = "";
    body = "";
    imageId = "";
    image = "";

    constructor(aboutUs?: AboutUs) {
        if (aboutUs) {
            this.id = aboutUs.id;
            this.header = aboutUs.header;
            this.body = aboutUs.body;
            this.image = aboutUs.image;
            this.imageId = aboutUs.imageId;
        }
    }
}

export interface PhotoDto {
    id: string;
    url: string;
}