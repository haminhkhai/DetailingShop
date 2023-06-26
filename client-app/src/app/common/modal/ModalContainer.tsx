import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { Modal, Image, Container } from "semantic-ui-react";
import Slider from "../../features/slider/Slider";

export default observer(function ModalContainer() {
    const { modalStore } = useStore();
    return (
        <Modal open={modalStore.modal.open}
            onClose={modalStore.closeModal} size="fullscreen">
            <Modal.Content>
                {modalStore.modal.body}
            </Modal.Content>
        </Modal>
    )
})