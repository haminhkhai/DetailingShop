import { useEffect, useState } from "react";
import { Button, Header, Label, Segment } from "semantic-ui-react";
import { Category } from "../../models/category";
import { Link, useParams } from "react-router-dom";
import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../common/form/MyTextInput";
import { v4 as uuidv4 } from "uuid";
import { useStore } from "../../stores/store";
import LoadingComponent from "../../layout/LoadingComponent";
import * as Yup from 'yup';
import { observer } from "mobx-react-lite";
import ValidationError from "../../errors/ValidationError";
import { CategoryStore } from "../../stores/categoryStore";

export default observer(function CategoryForm() {
    const [category, setCategory] = useState<Category>(new Category());
    const { categoryStore } = useStore();
    const { id } = useParams();

    // useEffect(() => {
    //     if (id) {
    //         categoryStore.loadCategory(id).then(category => setCategory(new Category(category)));
    //     }
    // }, [])

    const handleSubmit = (category: Category, setSubmitting: any, setValues: any, setErrors: any) => {
        if (!id) {
            let newCategory = { ...category, id: uuidv4() }
            categoryStore.createCategory(newCategory)
                .then(() => {
                    setValues(new Category());
                    setSubmitting(false);
                }).catch(error => {
                    setErrors({ error });
                    setSubmitting(false);
                })
        } else {
            categoryStore.editCategory(category).then(() => {
                setSubmitting(false);
            })
        }
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required")
    })

    if (categoryStore.loadingInitial)
        return <LoadingComponent content="Loading category..." />

    return (
        <Segment.Group>
            <Segment clearing>
                <Header as='h2' content={id ? 'Edit Category' : 'Add Category'} />
                <Formik
                    // validateOnChange={false}
                    validationSchema={validationSchema}
                    initialValues={{ ...category, error: 'null' }}
                    enableReinitialize
                    onSubmit={(values, { setSubmitting, setValues, setErrors }) =>
                        handleSubmit(values, setSubmitting, setValues, setErrors)
                    }
                >
                    {({ isSubmitting, errors }) => (
                        <Form className="ui form large">
                            <MyTextInput placeholder='Name' name='name' />
                            <ErrorMessage
                                name='error' render={() =>
                                    <Label style={{ marginBottom: 10 }} basic color="red" content={errors.error} />}
                            />
                            <Button
                                loading={isSubmitting}
                                positive floated="right"
                                content='Submit' type="submit"
                            />
                            <Button
                                floated="right" content='Cancel'
                                as={Link} to='/admin/blog' type='reset'
                            />
                        </Form>
                    )}
                </Formik>
            </Segment>
        </Segment.Group>
    )
})