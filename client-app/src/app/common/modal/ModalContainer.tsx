import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { Modal, Image, Container, ModalProps } from "semantic-ui-react";
import Slider from "../../features/slider/Slider";
import { EnumType } from "typescript";

export default observer(function ModalContainer() {

    const { modalStore } = useStore();
    return (
        /////////////////////////////////////////as 'mini' just to workaround typescript type error
        <Modal
            closeIcon={true}
            open={modalStore.modal.open}
            size={modalStore.modal.size as 'mini'}
            onClose={modalStore.closeModal}>
            <Modal.Content>
                {modalStore.modal.body}
            </Modal.Content>
        </Modal>
    )
})