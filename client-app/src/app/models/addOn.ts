import { Service } from "./service";

export interface AddOn {
    id: string;
    name: string;
    price: string;
    description: string;
    service: Service;
}

export class AddOn implements AddOn {
    constructor(addOn?: AddOnFormValues) {
        if (addOn) {
            Object.assign(this, addOn);
            this.service = new Service();
            this.service.id = addOn.serviceId;
            this.service.price = "0";
        }
    }
}

export class AddOnFormValues {
    id = "";
    name = "";
    price = "0";
    description = "";
    serviceId = "";
    serviceName = "";
    vehicleType = "";
    constructor(addOn?: AddOnFormValues) {
        if (addOn) {
            this.id = addOn.id;
            this.name = addOn.name;
            this.price = addOn.price;
            this.description = addOn.description;
            this.serviceId = addOn.serviceId;
            this.serviceName = addOn.serviceName;
            this.vehicleType = addOn.vehicleType;
        }
    }
}

// export class BookingAddOn {
//     id = "";
//     name = "";
//     description = "";
//     price = "0";
//     constructor(addOn?: BookingAddOn) {
//         if (addOn) {
//             this.id = addOn.id;
//             this.name = addOn.name;
//             this.price = addOn.price;
//             this.description = addOn.description;
//         }
//     }
// }
