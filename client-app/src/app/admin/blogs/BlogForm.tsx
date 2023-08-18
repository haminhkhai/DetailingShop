import { observer } from "mobx-react-lite";
import { Button, Grid, Header, Label, Progress, Segment } from "semantic-ui-react";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import ReactQuillWidget from "./ReactQuillWidget";
import { useStore } from "../../stores/store";
import { Form, Formik } from "formik";
import { Blog } from "../../models/blog";
import MyTextInput from "../../common/form/MyTextInput";
import MySelectInput from "../../common/form/MySelectInput";
import { CategoryOptions } from "../../models/category";
import { v4 as uuidv4 } from 'uuid';
import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../../layout/LoadingComponent";
import PhotoWidgetDropzone from "../../common/imageUpload/PhotoWidgetDropzone";
import { Cropper } from "react-cropper";
import * as Yup from 'yup';
import MyTextArea from "../../common/form/MyTextArea";


export default observer(function BlogForm() {
    const [blog, setBlog] = useState<Blog>(new Blog());
    const [categoryOptions, setCategoryOptions] = useState<CategoryOptions[]>([]);
    const [value, setValue] = useState("");
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();
    const [error, setError] = useState("");

    const reactQuillRef = useRef<ReactQuill>(null);
    const { blogStore: { progress, setProgress, createBlog, loadBlog, editBlog, blogLoadingInitial },
        categoryStore: { categories, loadCategories } } = useStore();
    const { id } = useParams();

    useEffect(() => {
        if (categories.length === 0) {
            loadCategories();
            setCategoryOptions([]);
        }
        categories.forEach(category =>
            setCategoryOptions(current => [...current, new CategoryOptions(category)])
        )
    }, [categories])

    useEffect(() => {
        if (id) {
            loadBlog(id, "category").then(blog => {
                if (blog) {
                    setBlog(new Blog({ ...blog, content: '' }));
                    setValue(blog.content);
                    setFiles([{ preview: blog.image, imageId: blog.imageId, type: 'image/jpeg' }]);
                }
            });
        }
    }, [])

    const handleSubmit = (blog: Blog, setSubmitting: any, setValues: any) => {
        let cookedBlog = {
            ...blog,
            id: id ? blog.id : uuidv4(),
            category: categories.find(c => c.id === blog.category.id)!,
            content: reactQuillRef.current ? reactQuillRef.current!.value.toString() : ''
        }
        if (cropper && cropper.getCroppedCanvas() && files[0].imageId !== blog.imageId) {
            cropper.getCroppedCanvas().toBlob(blob => {
                if (!id) {
                    createBlog(blob, cookedBlog).then(() => {
                        setSubmitting(false);
                        setValues(new Blog());
                        setValue("");
                    });
                } else {
                    editBlog(blob, cookedBlog).then(() => setSubmitting(false))
                }
            }, 'image/jpeg')
        } else {
            if (!id) {
                createBlog(null, cookedBlog).then(() => {
                    setSubmitting(false);
                    setValues(new Blog());
                    setValue("");
                });
            } else {
                editBlog(null, cookedBlog).then(() => setSubmitting(false))
            }
        }
    }

    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"),
        category: Yup.object().shape({
            id: Yup.string().required("Category is required")
        })
    })

    if (blogLoadingInitial) return <LoadingComponent content="Loading blog..." />

    return (
        <Segment.Group>
            <Segment clearing>
                {progress > 0 && <Progress percent={progress} attached="top" />}
                <Header as='h2' content='Add Blog' />
                <Formik
                    validateOnChange={false}
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={blog}
                    onSubmit={(values, { setSubmitting, setValues }) => {
                        handleSubmit(values, setSubmitting, setValues)
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="ui form large">
                            <MyTextInput placeholder="Title" name="title" />
                            <MySelectInput
                                options={categoryOptions}
                                placeholder='Category' name='category.id'
                            />
                            <MyTextArea placeholder="Description" name='description' rows={3}  />
                            <div style={{ padding: '15px 0 25px 0' }}>
                                <Header as='h4'>Thumpnail</Header>
                                <Grid stackable>
                                    <Grid.Column width={6}>
                                        <Header sub color='teal' content='Step 1 - Add Photo' />
                                        <PhotoWidgetDropzone setFiles={setFiles} />
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Header sub color='teal' content='Step 2 - Resize image' />
                                        {files && files.length > 0 && (
                                            <Cropper
                                                src={files[0].preview}
                                                style={{ height: 200, width: '100%' }}
                                                initialAspectRatio={16 / 9}
                                                aspectRatio={16 / 9}
                                                preview='.img-preview'
                                                guides={false}
                                                viewMode={2}
                                                autoCropArea={1}
                                                background={false}
                                                onInitialized={cropper => setCropper(cropper)}
                                            />
                                        )}
                                    </Grid.Column>
                                    <Grid.Column width={1} />
                                    <Grid.Column width={4}>
                                        <Header sub color='teal' content='Step 3 - Preview & Upload' />
                                        {files && files.length > 0 &&
                                            <>
                                                <div className='img-preview'
                                                    style={{ minHeight: 200, overflow: 'hidden' }} />
                                            </>
                                        }
                                        {error !== "" &&
                                            <Label style={{ margin: '2em 0' }} color='red' content={error} />}
                                    </Grid.Column>
                                </Grid>
                            </div>
                            <ReactQuillWidget
                                reactQuillRef={reactQuillRef}
                                value={value}
                                setValue={setValue}
                                setProgress={setProgress}
                            />
                            <Button
                                loading={isSubmitting}
                                style={{ marginTop: '15px' }}
                                floated="right"
                                type="submit" positive content='Submit'
                            />
                            <Button
                                style={{ marginTop: '15px' }}
                                floated="right"
                                type="reset"
                                as={Link} to='/admin/blog'
                                content='Cancel'
                            />
                        </Form>
                    )}
                </Formik>
            </Segment>
        </Segment.Group>
    )
})
