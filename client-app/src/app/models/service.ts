import { AddOnFormValues } from "./addOn";

export class Service {
    id = "";
    vehicleType = "";
    name = "";
    price = "0";
    description = "";
    imageId = "";
    image = "";
    constructor(service?: Service) {
        if (service) {
            this.id = service.id;
            this.vehicleType = service.vehicleType;
            this.name = service.name;
            this.price = (service.price ? service.price : "0");
            this.description = service.description;
            this.imageId = service.imageId;
            this.image = service.image;
        }
    }
}

export class ServiceFormValues {
    id = "";
    vehicleType = "";
    name = "";
    price = "0";
    description = "";
    imageId = "";
    image = "";
    addOns: AddOnFormValues[] = [];
    constructor (service? : ServiceFormValues) {
        if (service) {
            this.id = service.id;
            this.vehicleType = service.vehicleType;
            this.name = service.name;
            this.price = (service.price ? service.price : "0");
            this.description = service.description;
            this.imageId = service.imageId;
            this.image = service.image;
            this.addOns = service.addOns;
        }
    }
}

export class ServiceOptions {
    text = "";
    value = "";
    constructor(service?: Service) {
        if (service) {
            this.text = service.vehicleType + ' - ' + service?.name;
            this.value = service?.id;
        }
    }
}

export const vehicleTypeOptions = [
    { text: 'Regular Size Car', value: 'regular size car', icons: 'b'},
    { text: 'Medium Size Car', value: 'medium size car', icons: 'c' },
    { text: 'Compact SUV', value: 'compact suv', icons: 'e' },
    { text: 'Minivan', value: 'minivan', icons: 'j' },
    { text: 'Pickup Truck', value: 'pickup truck', icons: 'g' },
    { text: 'Cargo Truck', value: 'cargo truck', icons: 'k' }
]