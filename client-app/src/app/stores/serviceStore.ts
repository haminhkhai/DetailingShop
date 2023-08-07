import { makeAutoObservable, runInAction } from "mobx"
import { Service, ServiceFormValues, vehicleTypeOptions } from "../models/service";
import agent from "../api/agent";
import { toast } from "react-toastify";
import { PhotoDto } from "../models/photo";

export default class ServiceStore {
    serviceRegistry = new Map<String, Service>();
    services: Service[] = [];
    loading = false;
    loadingInitial = false;
    progress = 0;

    constructor() {
        makeAutoObservable(this);
    }

    createService = async (file: Blob | null, service: Service) => {
        try {
            let photoDto = null;
            if (file) {
                photoDto = await agent.Photos.uploadPhoto(file, this.setProgress);
                service.image = photoDto.url;
                service.imageId = photoDto.public_id;
            }
            const responseService = await agent.Services.add(service);
            this.setProgress(100);
            runInAction(() => {
                this.services.push(responseService);
                this.setService(responseService);
                this.setProgress(0);
            });
            toast.info("Saved");
        } catch (error) {
            console.log(error);
            this.setProgress(0);
        }
    }

    setProgress = (progress: number) => {
        this.progress = progress;
    }

    private getService = (id: string) => {
        return this.services.find(s => s.id === id);
    }

    editService = async (file: Blob | null, service: Service) => {
        try {
            if (file) {
                const photoDto = await agent.Photos.uploadPhoto(file, this.setProgress);
                service.imageId = photoDto.public_id;
                service.image = photoDto.url;
            }
            const responseService = await agent.Services.edit(service);
            this.setProgress(100);
            runInAction(() => {
                var serviceIndex = this.services.indexOf(this.getService(service.id)!);
                this.services[serviceIndex] = responseService;
                this.serviceRegistry.set(service.id, responseService);
                this.progress = 0;
            });
            toast.info("Saved");
        } catch (error) {
            console.log(error);
            this.progress = 0;
        }
    }

    loadServices = async () => {
        this.loadingInitial = true;
        try {
            const services = await agent.Services.list();
            runInAction(() => {
                if (services.length > this.services.length) {
                    this.services = services.sort((a, b) => {
                        return (
                            vehicleTypeOptions.indexOf(vehicleTypeOptions.find(v => v.value === a.vehicleType)!)
                            - vehicleTypeOptions.indexOf(vehicleTypeOptions.find(v => v.value === b.vehicleType)!)
                        )
                    });
                }

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
        if (service.price) {
            if (service.price.toString().indexOf('.') !== -1) {
                let price = service.price.toString();
                service.price = price.split('.')[0];
                service.priceDecimal = price.split('.')[1];
            }
        }
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
                return undefined;
            }
        }

    }

    servicesByVehicleType = (vehicleType: string) => {
        let filteredGroupServices = this.groupServices.filter(c => c[0] === vehicleType);
        if (filteredGroupServices.length > 0)
            return filteredGroupServices[0][1];
        else return [];
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