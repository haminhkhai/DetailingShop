import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface Props {
    imagePreview: string;
    setCropper: (cropper: Cropper) => void;
    onCrop: () => void;
}

export default function PhotoWidgetCropperService({imagePreview, setCropper, onCrop} : Props) {
    return (
        <Cropper 
            src={imagePreview}
            style={{height:200, width: '100%'}}
            initialAspectRatio={16/9}
            aspectRatio={16/9}
            preview='.img-preview'
            guides={false}
            viewMode={2}
            autoCropArea={1}
            background={false}
            onInitialized={cropper => setCropper(cropper)}
            crop={onCrop}
        />
    )
}