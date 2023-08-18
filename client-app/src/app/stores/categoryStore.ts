import { makeAutoObservable, runInAction } from "mobx"
import { Category } from "../models/category";
import agent from "../api/agent";
import { toast } from "react-toastify";

export class CategoryStore {
    loadingInitial = false;
    loading = false;
    categories: Category[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    createCategory = async (category: Category) => {
        try {
            await agent.Categories.add(category);
            toast.info('Saved');
        } catch (error) {
            throw error;
        }
    }

    loadCategories = async () => {
        this.loadingInitial = true;
        try {
            const categories = await agent.Categories.list();
            runInAction(() => {
                if (categories.length > this.categories.length) { this.categories = categories; }
                this.loadingInitial = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingInitial = false;
            })
        }
    }

    loadCategory = async (id: string) => {
        let category = this.categories.find(c => c.id === id);
        if (category) return category;
        this.loadingInitial = true;
        try {
            category = await agent.Categories.details(id);
            runInAction(() => {
                this.loadingInitial = false;
            });
            return category;
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingInitial = false;
            });
        }
    }

    deleteCategory = async (id: string) => {
        this.loading = true;
        try {
            await agent.Categories.delete(id);
            runInAction(() => {
                this.loading = false;
                this.categories = this.categories.filter(c => c.id !== id);
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    editCategory = async (category: Category) => {
        try {
            await agent.Categories.edit(category);
            runInAction(() => {
                toast.info('Saved');
                this.categories[this.categories.indexOf(this.categories.find(c => c.id === category.id)!)] = category;
            });
        } catch (error) {
            console.log(error);
        }
    }
}