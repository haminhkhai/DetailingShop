import { Photo } from "./photo";

export interface Gallery {
    id: string;
    name: string;
    description: string;
    photos?: Photo[];
}

export class Gallery {
    id = "";
    name = "";
    description = "";
    photos?: Photo[] = [];
    constructor (gallery?: Gallery) {
        Object.assign(this, gallery);
    }
}