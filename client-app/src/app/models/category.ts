export interface Category {
    id: string;
    name: string;
}

export class Category implements Category {
    id = "";
    name = "";
    constructor(category?: Category) {
        Object.assign(this, category);
    }
}

export class CategoryOptions {
    text = "";
    value = "";
    constructor(category?: Category) {
        if (category) {
            this.text = category.name;
            this.value = category.id;
        }
    }
}

export class CategoryBlogCount {
    id = "";
    category = "";
    count = 0;
    constructor(categoryBlogCount?: CategoryBlogCount) {
        if (categoryBlogCount) {
            Object.assign(this, categoryBlogCount);
        }
    }
}