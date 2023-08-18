import { Container, Grid, Segment } from "semantic-ui-react";
import CoverSlogan from "../cover slogans/CoverSlogan";
import BlogSearch from "./BlogSearch";
import LatestPost from "./LatestPost";
import Category from "./Category";
import { useStore } from "../../stores/store";
import { useEffect, useState } from "react";
import { Blog } from "../../models/blog";
import BlogDetailItem from "./BlogDetailItem";
import { useParams } from "react-router-dom";

export default function BlogDetail() {
    const { blogStore: { loadBlog, latestBlog, loadBlogs, blogs, categoryBlogCounts },
        categoryStore: { loadCategories, categories } } = useStore();
    const [blog, setBlog] = useState<Blog>(new Blog());
    const { id } = useParams();
    const { category } = useParams();

    useEffect(() => {
        if (blogs.length < 1) loadBlogs();
        if (categories.length < 1) loadCategories().then(() => { });
    }, [])

    useEffect(() => {
        if (id && category) {
            loadBlog(id, category).then((blog) => setBlog(new Blog(blog)));
            console.log(blog);
        }
    }, [])

    return (
        <>
            <CoverSlogan slogan={'BLOGS'}
                image={'/assets/sliderImages/Detail6.jpg'} />
            <Segment style={{ padding: '8em 0 0 0' }} basic clearing>
                <Container>
                    <Grid>
                        <Grid.Column computer={11} tablet={9} mobile={16}>
                            <BlogDetailItem blog={blog} />
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={7} mobile={16}>
                            <div style={{ padding: '2em 0 0 1em' }}>
                                <BlogSearch />
                            </div>
                            <div style={{ padding: '2em 0 0 1em' }}>
                                <LatestPost blogs={latestBlog()} />
                            </div>
                            <div style={{ padding: '2em 0 0 1em' }}>
                                <Category categoryBlogCounts={categoryBlogCounts} />
                            </div>
                        </Grid.Column>
                    </Grid>
                </Container>
            </Segment>
        </>
    )
}
