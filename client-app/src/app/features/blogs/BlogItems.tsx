import { Grid, Header, Icon, Label, Image, Button, Divider } from "semantic-ui-react";
import { Blog } from "../../models/blog";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Fragment } from "react";

interface Props {
    blog: Blog;
}

export default function BlogItems({ blog }: Props) {
    return (
        <Fragment>
            <Grid>
                <Grid.Column width={16}>
                    <Header
                        as={Link} content={blog.title}
                        to={`/blog/${blog.category.name}/${blog.id}`}
                    />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Label style={{ marginRight: '10px' }}>
                        <Icon name="calendar outline" size="large" />
                        {format(blog.createdDate, "dd MMM yy h:mm aa")}
                    </Label>
                    <Label>
                        <Icon name="folder outline" size="large" />
                        {blog.category.name}
                    </Label>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Image
                        as={Link} to={`/blog/${blog.category.name}/${blog.id}`}
                        src={blog.image || '/assets/placeholder.png'}
                    />
                </Grid.Column>
                <Grid.Column width={10}>
                    <p>
                        {blog.description}
                    </p>
                    <Button
                        as={Link} to={`/blog/${blog.category.name}/${blog.id}`}
                        content='Read More' basic color="blue"
                    />
                </Grid.Column>

                <Grid.Column width={16}>
                    <Divider />
                </Grid.Column>
            </Grid>
        </Fragment>
    )
}