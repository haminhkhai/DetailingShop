export interface Photo {
    id: string;
    url: string;
    message?: string;
}

export class Photo implements Photo {
    id = "";
    url = "";
    message? = "";
    constructor(photo?: Photo) {
        if (photo)
            Object.assign(this, photo);
    }
}

export interface PhotoDto {
    public_id: string;
    url: string;
}

export class PhotoDto implements PhotoDto {
    public_id: string = "";
    url: string = "";
    constructor(photoDto?: PhotoDto) {
        Object.assign(this, photoDto);
    }
}

export const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];