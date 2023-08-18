import { Divider, Header, Segment } from "semantic-ui-react";
import { CategoryBlogCount } from "../../models/category";
import { Fragment } from "react";
import { Link } from "react-router-dom";

interface Props {
    categoryBlogCounts: CategoryBlogCount[];
}

export default function Category({ categoryBlogCounts }: Props) {
    const style = {
        color: '#A8B1B6',
        fontSize: '14px',
        display: 'inline-block',
        margin: '0'
    }
    return (
        <>

            <Header as='h4' content='CATEGORIES' />
            {categoryBlogCounts.map(category => (
                <Fragment key={category.id}>
                    <Link to={`/blog/${category.category}`}>
                        <p style={style}>{category.category}</p>
                        <p style={{ ...style, float: 'right' }}>({category.count})</p>
                    </Link>
                    <Divider />
                </Fragment>
            ))}
        </>
    )
}