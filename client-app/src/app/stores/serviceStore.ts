import { makeAutoObservable, runInAction } from "mobx"
import { Service, vehicleTypeOptions } from "../models/service";
import agent from "../api/agent";
import { toast } from "react-toastify";

export default class ServiceStore {
    serviceRegistry = new Map<String, Service>();
    services: Service[] = [];
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    createService = async (file: Blob | null, service: Service) => {
        try {
            const response = await agent.Services.add(file, service);
            runInAction(() => {
                this.services.push(response.data);
                this.setService(response.data);
            });
            toast.info("Saved");
        } catch (error) {
            console.log(error);
        }
    }

    private getService = (id: string) => {
        return this.services.find(s => s.id === id);
    }

    editService = async (file: Blob | null, service: Service) => {
        try {
            const response = await agent.Services.edit(file, service)
            runInAction(() => {
                var serviceIndex = this.services.indexOf(this.getService(service.id)!);
                this.services[serviceIndex] = response.data;
                this.serviceRegistry.set(service.id, response.data);
            });
            toast.info("Saved");
        } catch (error) {
            console.log(error);
        }
    }

    loadServices = async () => {
        this.loadingInitial = true;
        try {
            const services = await agent.Services.list();
            runInAction(() => {
                this.services = services.sort((a, b) => {
                    return (
                        vehicleTypeOptions.indexOf(vehicleTypeOptions.find(v => v.value === a.vehicleType)!)
                        - vehicleTypeOptions.indexOf(vehicleTypeOptions.find(v => v.value === b.vehicleType)!)
                    )
                });

                services.forEach(service => {
                    this.setService(service);
                })

                this.loadingInitial = false
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingInitial = false)
        }
    }

    get groupServices() {
        return Object.entries(
            Array.from(this.serviceRegistry.values()).reduce((groupServices, service) => {
                const vehicleType = service.vehicleType;
                groupServices[vehicleType] = groupServices[vehicleType]
                    ? [...groupServices[vehicleType], service]
                    : [service]
                return groupServices;
            }, {} as { [key: string]: Service[] })
        ).sort((a, b) => {
            return (
                vehicleTypeOptions.indexOf(vehicleTypeOptions.find(v => v.value === a[0])!)
                - vehicleTypeOptions.indexOf(vehicleTypeOptions.find(v => v.value === b[0])!)
            )
        })
    }

    private setService = (service: Service) => {
        this.serviceRegistry.set(service.id, service);
    }

    loadService = async (id: string) => {
        let service = this.getService(id);
        if (service) {
            return service;
        }
        else {
            this.loadingInitial = true;
            try {
                service = await agent.Services.details(id);
                runInAction(() => {
                    this.loadingInitial = false;
                });
                return service;
            } catch (error) {
                console.log(error);
                runInAction(() => this.loadingInitial = false)
            }
        }

    }

    servicesByVehicleType = (vehicleType: string) => {
        return this.services.filter(v => v.vehicleType === vehicleType);
    }

    deleteService = async (id: string) => {
        this.loading = true;
        try {
            await agent.Services.delete(id);
            runInAction(() => {
                this.services.splice(this.services.indexOf(this.getService(id)!), 1);
                this.serviceRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false)
        }
    }
}