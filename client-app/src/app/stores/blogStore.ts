import { makeAutoObservable, runInAction } from "mobx";
import { Blog } from "../models/blog";
import agent from "../api/agent";
import { toast } from "react-toastify";
import { CategoryBlogCount } from "../models/category";
import { store } from "./store";

export class BlogStore {
    blogRegistry = new Map<String, Blog>();
    blogLoading = false;
    blogLoadingInitial = false;
    blogs: Blog[] = [];
    blogsByCategory: Blog[] = [];
    blogsSearch: Blog[] = [];
    progress = 0;

    constructor() {
        makeAutoObservable(this);
    }

    setProgress = (progress: number) => {
        this.progress = progress;
    }

    createBlog = async (file: Blob | null, blog: Blog) => {
        try {
            if (file) {
                const photoDto = await agent.Photos.uploadPhoto(file, this.setProgress);
                blog.image = photoDto.url;
                blog.imageId = photoDto.public_id;
            }
            await agent.Blogs.add(blog);
            this.setProgress(100);
            runInAction(() => {
                this.blogs.push(blog);
                toast.info("Saved");
                this.setProgress(0);
            })
        } catch (error) {
            console.log(error);
        }
    }

    loadBlogs = async () => {
        try {
            this.blogLoadingInitial = true;
            const blogs = await agent.Blogs.list();
            runInAction(() => {
                blogs.forEach(blog => {
                    blog.createdDate = new Date(blog.createdDate);
                })
                this.blogs = blogs;
                this.blogLoadingInitial = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.blogLoadingInitial = false;
            })
        }
    }

    loadBlog = async (id: string, category: string) => {
        let blog = null;
        blog = this.blogs.find(b => b.id === id);
        if (blog) return blog;
        try {
            this.blogLoadingInitial = true;
            blog = await agent.Blogs.details(id, category);
            blog.createdDate = new Date(blog.createdDate);
            runInAction(() => {
                this.blogLoadingInitial = false;
            })
            return blog;
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.blogLoadingInitial = false;
            })
        }
    }

    latestBlog = () => {
        if (this.blogs.length > 0)
            return this.blogs.slice(0, 5);
    }

    get categoryBlogCounts() {
        let categoryBlogCounts: CategoryBlogCount[] = [];
        store.categoryStore.categories.forEach(category => {
            let count = this.blogs.filter(b => b.category.id === category.id).length;
            var categoryBlogCount = new CategoryBlogCount({ id: category.id, category: category.name, count: count });
            categoryBlogCounts.push(categoryBlogCount);
        });
        return categoryBlogCounts;
    }

    loadBlogsByCategory = async (category: string) => {
        this.blogLoadingInitial = true;
        try {
            const blogs = await agent.Blogs.listByCategory(category);
            runInAction(() => {
                blogs.forEach(blog => {
                    blog.createdDate = new Date(blog.createdDate);
                })
                this.blogsByCategory = blogs;
                this.blogLoadingInitial = false;
            })
        } catch (error) {
            console.log(error);
        }
    }

    loadBlogsSearch = async (value: string) => {
        this.blogLoadingInitial = true;
        const params = new URLSearchParams();
        params.append("value", value);
        try {
            const blogs = await agent.Blogs.search(params);
            runInAction(() => {
                blogs.forEach(blog => {
                    blog.createdDate = new Date(blog.createdDate);
                });
                this.blogsSearch = blogs;
                this.blogLoadingInitial = false;
            })
        } catch (error) {
            console.log(error);
            this.blogLoadingInitial = false;
        }
    }

    editBlog = async (file: Blob | null, blog: Blog) => {
        try {
            if (file) {
                const photoDto = await agent.Photos.uploadPhoto(file, this.setProgress);
                blog.image = photoDto.url;
                blog.imageId = photoDto.public_id;
            }
            await agent.Blogs.edit(blog);
            this.setProgress(100);
            runInAction(() => {
                this.blogs[this.blogs.indexOf(this.blogs.find(b => b.id === blog.id)!)] = blog;
                toast.info("Saved");
                this.setProgress(0);
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteBlog = async (id: string) => {
        this.blogLoading = true;
        try {
            await agent.Blogs.delete(id);
            runInAction(() => {
                this.blogLoading = false;
                this.blogs = this.blogs.filter(b => b.id !== id);
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.blogLoading = false;
            })
        }
    }
}