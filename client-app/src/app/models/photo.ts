export interface Photo {
    id: string;
    url: string;
}

export interface PhotoDto {
    public_id: string;
    url: string;
}

export const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];