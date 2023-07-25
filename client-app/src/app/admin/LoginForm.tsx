import { ErrorMessage, Form, Formik } from "formik";
import { Button, Grid, Header, Label, Segment } from "semantic-ui-react";
import MyTextInput from "../common/form/MyTextInput";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function LoginForm() {
    const { userStore } = useStore();
    return (

        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Log-in to admin panel
                </Header>
                <Formik
                    initialValues={{ username: '', password: '', error: null }}
                    onSubmit={(values, { setErrors, setSubmitting }) => {
                        userStore.login(values).catch(error => {
                            setErrors({ error: "Invalid username or password" })
                            setSubmitting(false);
                        })
                    }}
                >
                    {
                        ({ isSubmitting, errors }) => (
                            <Form className="ui form large" autoComplete="off">
                                <Segment stacked>
                                    <MyTextInput placeholder="Username" name="username" />
                                    <MyTextInput placeholder="Password" name="password" type='password' />
                                    <ErrorMessage name='error' render={() =>
                                        <Label style={{ marginBottom: 10 }} basic color="red" content={errors.error} />} />
                                    <Button loading={isSubmitting} type="submit" content='Login' color='teal' fluid />
                                </Segment>
                            </Form>
                        )
                    }
                </Formik>
            </Grid.Column>
        </Grid>

    )
})