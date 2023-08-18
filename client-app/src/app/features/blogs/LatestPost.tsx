import { Grid, Header, Icon, Image, Label } from "semantic-ui-react";
import { Blog } from "../../models/blog";
import { format } from "date-fns";
import { Link, NavLink } from "react-router-dom";
import { Fragment, useEffect } from "react";


interface Props {
    blogs: Blog[] | undefined;
}

export default function LatestPost({ blogs }: Props) {

    return (
        <>
            <Header as='h4' content='LATEST POST' />
            <Grid>
                {blogs?.map(blog => (
                    <Fragment key={blog.id}>
                        <Grid.Column width={6}>
                            <Image
                                as={NavLink}
                                to={`/blog/${blog.category.name}/${blog.id}`}
                                src={blog.image || '/assets/placeholder.png'}
                            />
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Link to={`/blog/${blog.category.name}/${blog.id}`}>
                                <p style={{ marginBottom: '6px', color: 'black' }}>{blog.title}</p>
                            </Link>
                            <Label>
                                <Icon name='calendar outline' />
                                {format(blog.createdDate, "dd MMM yy h:mm aa")}
                            </Label>
                        </Grid.Column>
                    </Fragment>
                ))}
            </Grid>
        </>
    )
}