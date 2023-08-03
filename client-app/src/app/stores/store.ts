import { createContext, useContext } from "react";
import ModalStore from "./modalStore";
import UserStore from "./userStore";
import AboutUsStore from "./aboutUsStore";
import ReviewStore from "./reviewStore";
import ServiceStore from "./serviceStore";
import AddOnStore from "./addOnStore";
import BookingStore from "./bookingStore";
import GalleryStore from "./galleryStore";
import CommonStore from "./commonStore";
import { CarouselStore } from "./carouselStore";

interface Store {
    modalStore: ModalStore;
    userStore: UserStore;
    aboutUsStore: AboutUsStore;
    reviewStore: ReviewStore;
    serviceStore: ServiceStore;
    addOnStore: AddOnStore;
    bookingStore: BookingStore;
    galleryStore: GalleryStore;
    carouselStore: CarouselStore;
    commonStore: CommonStore;
}

export const store: Store = {
    modalStore: new ModalStore(),
    userStore: new UserStore(),
    aboutUsStore: new AboutUsStore(),
    reviewStore: new ReviewStore(),
    serviceStore: new ServiceStore(),
    addOnStore: new AddOnStore(),
    bookingStore: new BookingStore(),
    galleryStore: new GalleryStore(),
    carouselStore: new CarouselStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}