import { Link } from "react-router-dom";
import { Button, Card, Divider, Grid, Header, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import LoadingComponent from "../../layout/LoadingComponent";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { format } from "date-fns";

export default observer(function BlogAdmin() {
    const [target, setTarget] = useState("");
    const { categoryStore: { loadCategories, categories, loadingInitial,
        deleteCategory, loading },
        blogStore: { loadBlogs, blogs, blogLoadingInitial, deleteBlog, blogLoading } } = useStore();

    useEffect(() => {
        if (categories.length <= 1) loadCategories();
        if (blogs.length <= 1) loadBlogs();
    }, []);

    if (loadingInitial) return <LoadingComponent content="Loading blogs..." />
    if (blogLoadingInitial) return <LoadingComponent content="Loading blogs..." />

    return (
        <>
            <Segment.Group>
                <Segment clearing basic>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={9}>
                                <Header as='h2' content='Categories' />
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Button
                                    icon='add'
                                    as={Link} to='/admin/createCategory'
                                    floated="right" basic content='Add Category' />
                            </Grid.Column>
                        </Grid.Row>
                        {categories.map(category => (
                            <Grid.Column key={category.id} computer={4} tablet={8} mobile={16}>
                                <Card style={{ margin: '0 auto' }}>
                                    <Card.Content>
                                        {category.name}
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Button
                                            as={Link} to={`/admin/manageCategory/${category.id}`}
                                            floated="right" content='Edit' color="blue" />
                                        <Button
                                            loading={loading && target === category.id}
                                            onClick={() => {
                                                deleteCategory(category.id);
                                                setTarget(category.id);
                                            }}
                                            floated="right" content='Delete' color="red" />
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        ))}
                    </Grid>
                </Segment>
            </Segment.Group>
            <Segment.Group>
                <Segment basic clearing>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={9}>
                                <Header as='h2' content='Blogs' />
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Button
                                    as={Link} to='/admin/createBlog'
                                    icon='add' floated="right"
                                    basic content='Add Blog'
                                />
                            </Grid.Column>
                        </Grid.Row>
                        {blogs.map(blog => (
                            <Grid.Column key={blog.id} width={16}>
                                <Card fluid>
                                    <Card.Content>
                                        <Grid>
                                            <Grid.Column width={12}>
                                                <Header
                                                    as='h3'
                                                    content={blog.title} />
                                            </Grid.Column>
                                            <Grid.Column width={4}>
                                                <Label style={{ float: 'right' }}>{blog.category.name}</Label>
                                            </Grid.Column>
                                        </Grid>
                                        <Card.Meta>
                                            {format(blog.createdDate, "dd MMM yy h:mm aa")}
                                        </Card.Meta>
                                        <Card.Description>
                                            {blog.description}
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Button
                                            as={Link} to={`/admin/manageBlog/${blog.id}`}
                                            floated="right" content='Edit' color="blue"
                                        />
                                        <Button
                                            onClick={() => {
                                                setTarget(blog.id);
                                                deleteBlog(blog.id);
                                            }}
                                            loading={blogLoading && target === blog.id}
                                            floated="right" content='Delete' color="red"
                                        />
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        ))}
                    </Grid>
                </Segment>
            </Segment.Group>
        </>
    )
})