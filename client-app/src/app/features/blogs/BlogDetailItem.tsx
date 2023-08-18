import { format } from "date-fns";
import { Grid, Header, Label, Icon, Divider } from "semantic-ui-react";
import { Blog } from "../../models/blog";

interface Props {
    blog: Blog;
}

export default function BlogDetailItem({ blog }: Props) {
    return (
        <>
            <Grid>
                <Grid.Column width={16}>
                    <Header as='h2' content={blog.title} />
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
                <Grid.Column width={16} dangerouslySetInnerHTML={{ __html: `${blog.content}` }}>
                </Grid.Column>
                <Grid.Column width={16}>
                    <div className="social-share-container">
                        <span>
                            Share:
                        </span>
                        <div className="button-wrap">
                            <span className="social-circle">
                                <Icon className="social-icon" name='twitter' size="large" />
                            </span>
                            <span className="social-circle">
                                <Icon name='facebook f' size="large" />
                            </span>
                            <span className="social-circle">
                                <Icon name='pinterest' size="large" />
                            </span>
                        </div>
                    </div>
                </Grid.Column>

                <Grid.Column width={16}>
                    <Divider />
                </Grid.Column>
            </Grid>
        </>
    )
}