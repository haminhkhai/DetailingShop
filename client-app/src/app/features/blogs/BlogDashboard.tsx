import { Container, Grid, Segment } from "semantic-ui-react";
import CoverSlogan from "../cover slogans/CoverSlogan";
import BlogItems from "./BlogItems";
import BlogSearch from "./BlogSearch";
import LatestPost from "./LatestPost";
import Category from "./Category";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogItemPlaceHolder from "./BlogItemPlaceHolder";

export default observer(function BlogDashboard() {
    const { blogStore: { loadBlogs, blogs, blogLoadingInitial,
        latestBlog, categoryBlogCounts, loadBlogsByCategory, blogsByCategory },
        categoryStore: { categories, loadCategories } } = useStore();
    const { category } = useParams();

    useEffect(() => {
        if (blogs.length < 1) loadBlogs();
        if (categories.length < 1) loadCategories();
    }, [])

    useEffect(() => {
        if (category) {
            loadBlogsByCategory(category);
        }
    }, [category])

    return (
        <>
            <CoverSlogan slogan={'BLOGS'}
                image={'/assets/sliderImages/Detail6.jpg'} />
            <Segment style={{ padding: '8em 0 0 0' }} basic clearing>
                <Container>
                    <Grid>
                        <Grid.Column computer={11} tablet={9} mobile={16}>
                            {
                                blogLoadingInitial ?
                                    <>
                                        <BlogItemPlaceHolder />
                                        <BlogItemPlaceHolder />
                                        <BlogItemPlaceHolder />
                                    </>
                                    :
                                    (category ?
                                        blogsByCategory.map(blog => (
                                            <BlogItems key={blog.id} blog={blog} />))
                                        :
                                        blogs.map(blog => (
                                            <BlogItems key={blog.id} blog={blog} />
                                        )))
                            }


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
})