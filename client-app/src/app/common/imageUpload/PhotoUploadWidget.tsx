import { useEffect, useState } from 'react';
import { Button, Grid, Header, Label } from 'semantic-ui-react';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';
import PhotoWidgetCropper from './PhotoWidgetCropper';
import { SUPPORTED_FORMATS } from '../../models/photo';
interface Props {
    loading: boolean;
    uploadPhoto: (file: Blob) => void;
}

export default function PhotoUploadWidget({ loading, uploadPhoto }: Props) {
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();
    const [error, setError] = useState("");

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob((blob) => {uploadPhoto(blob!)}, 'image/jpeg');
        }
    }

    useEffect(() => {
        if (files.length > 0) {
            fileValidation(files);
            //dispose file.preview after using
            return () => {
                files.forEach((file: any) => URL.revokeObjectURL(file.preview))
            }
        }
    }, [files])

    const fileValidation = (files: any[]) => {
        files.forEach(file => {
            if (!SUPPORTED_FORMATS.includes(file.type)) {
                setError("Format unsupported");
                return;
            }
            if (file.size > 1024 * 1024 * 5) {
                setError("Images must be smaller than 5MB");
                return;
            }
        });
    }

    return (
        <>
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column width={5}>
                        <Header sub color='teal' content='Step 1 - Add Photo' />
                        <PhotoWidgetDropzone setFiles={setFiles} />
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Header sub color='teal' content='Step 2 - Resize image' />
                        {files && files.length > 0 && (
                            <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
                        )}
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={4}>
                        <Header sub color='teal' content='Step 3 - Preview & Upload' />
                        {files && files.length > 0 &&
                            <>
                                <div className='img-preview' style={{ minHeight: 200, overflow: 'hidden' }} />
                                {error !== "" && <Label style={{ margin: '2em 0' }} color='red' content={error} />}
                                <br/>
                                <Button.Group style={{ margin: '3em 0' }} widths={2}>
                                    <Button
                                        type='submit' disabled={error !== ""}
                                        loading={loading} onClick={onCrop}
                                        positive icon='check'
                                    />
                                    <Button
                                        disabled={loading}
                                        onClick={() => {
                                            setError("");
                                            setFiles([]);
                                        }}
                                        icon='close'
                                    />
                                </Button.Group>
                            </>}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}