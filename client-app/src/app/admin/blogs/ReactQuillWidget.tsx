import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize-module-react';
import { useCallback } from "react";
import { useStore } from "../../stores/store";
import agent from "../../api/agent";
import { observer } from "mobx-react-lite";

Quill.register('modules/imageResize', ImageResize);

interface Props {
    reactQuillRef: React.RefObject<ReactQuill>;
    value: string;
    setValue: any;
    setProgress: (progres: number) => void;
}

export default observer(function ReactQuillWidget({ reactQuillRef, value, setValue, setProgress }: Props) {

    const imageHandler = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
            if (input !== null && input.files !== null) {
                const file = input.files[0];
                const photoDto = await agent.Photos.uploadPhoto(file, setProgress)
                const quill = reactQuillRef.current;
                setProgress(100);
                if (quill) {
                    const range = quill.getEditorSelection();
                    range && quill.getEditor().insertEmbed(range.index, "image", photoDto.url);
                }
                setProgress(0);
            }
        };
    }, []);

    return (
        <ReactQuill
            ref={reactQuillRef}
            theme="snow"
            placeholder="Start writing..."
            modules={{
                toolbar: {
                    container: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        [{ size: [] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [
                            { list: "ordered" },
                            { list: "bullet" },
                            { indent: "-1" },
                            { indent: "+1" },
                        ],
                        ["link", "image", "video"],
                        ["code-block"],
                        ["clean"],
                    ],
                    handlers: {
                        image: imageHandler,   // <- 
                    },
                },
                clipboard: {
                    matchVisual: false,
                },
                imageResize: {
                    parchment: Quill.import('parchment'),
                    modules: ['Resize', 'DisplaySize']
                }
            }}
            formats={[
                "header",
                "font",
                "size",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "list",
                "bullet",
                "indent",
                "link",
                "image",
                "video",
                "code-block",
                "width",
            ]}
            value={value}
            onChange={setValue}
        />
    )
})