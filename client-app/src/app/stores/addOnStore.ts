import { makeAutoObservable, runInAction } from "mobx";
import { AddOn, AddOnFormValues } from "../models/addOn"
import agent from "../api/agent";
import { toast } from "react-toastify";
import { store } from "./store";

export default class AddOnStore {
    addOnRegistry = new Map<string, AddOnFormValues>();
    addOns: AddOnFormValues[] = [];
    loadingInitial = false;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadAddOns = async () => {
        this.loadingInitial = true;
        try {
            const addOns = await agent.AddOns.list();
            runInAction(() => {
                this.addOns = addOns;

                // addOns.forEach(addOn => {
                //     this.setAddOn(addOn);
                // });

                this.loadingInitial = false
            });
        } catch (error) {
            console.log(error);
            runInAction(() => { this.loadingInitial = false });
        }

    }

    setAddOnsByVehicleType = (vehicleType: string) => {
        this.addOnRegistry.clear();
        this.addOns.filter(a => a.vehicleType === vehicleType).forEach(addOn => {
            this.setAddOn(addOn);
        })
    }

    get groupAddOns() {
        return Object.entries(
            Array.from(this.addOnRegistry.values()).reduce((groupAddOns, addOn) => {
                const service = addOn.vehicleType + ' / ' + addOn.serviceName;
                groupAddOns[service] = groupAddOns[service] ? [...groupAddOns[service], addOn] : [addOn];
                return groupAddOns;
            }, {} as { [key: string]: AddOnFormValues[] })
        )
    }

    private setAddOn = (addOn: AddOnFormValues) => {
        this.addOnRegistry.set(addOn.id, addOn);
    }

    private getAddOn = (id: string) => {
        return this.addOnRegistry.get(id);
    }

    addOnByService = (id: string) => {
        let addOns: AddOnFormValues[] = [];
        this.addOns.filter(s => s.serviceId === id).forEach(addOn => (
            addOns.push(addOn)
        ));
        return addOns;
    }

    loadAddOn = async (id: string) => {
        let addOn = this.getAddOn(id);
        if (addOn) return addOn;
        else {
            this.loadingInitial = true;
            try {
                addOn = await agent.AddOns.details(id);
                runInAction(() => this.loadingInitial = false);
                return addOn;
            } catch (error) {
                console.log(error);
                runInAction(() => this.loadingInitial = false);
            }
        }
    }

    createAddOn = async (addOn: AddOn) => {
        try {
            const response = await agent.AddOns.add(addOn);
            runInAction(() => {
                this.setAddOn(response)
                toast.info("Saved");
            });
        } catch (error) {
            console.log(error);
        }
    }

    editAddOn = async (addOn: AddOn) => {
        try {
            const response = await agent.AddOns.edit(addOn);
            runInAction(() => {
                if (response.id) {
                    this.addOnRegistry.set(addOn.id, response);
                }
                toast.info("Saved");
            });
        } catch (error) {
            console.log(error);
        }
    }

    deleteAddOn = async (id: string) => {
        this.loading = true;
        try {
            await agent.AddOns.delete(id);
            runInAction(() => {
                this.addOnRegistry.delete(id);
                // this.addOns.splice(this.addOns.indexOf(this.getAddOn(id)!), 1);
                this.loading = false
            });
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }
}