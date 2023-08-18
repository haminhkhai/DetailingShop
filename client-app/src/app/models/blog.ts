import { Category } from "./category";

export interface Blog {
    id: string;
    title: string;
    description: string;
    createdDate: Date;
    category: Category;
    content: string;
    image: string;
    imageId: string;
}

export class Blog implements Blog {
    id = "";
    title = "";
    description = "";
    createdDate: Date = new Date();
    category: Category = new Category();
    content = "";
    image = "";
    imageId = "";
    constructor(blog?: Blog) {
        if (blog) {
            Object.assign(this, blog);
        }
    }
}