import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { Modal } from "semantic-ui-react";

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