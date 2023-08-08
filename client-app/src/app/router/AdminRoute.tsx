import { Container } from "semantic-ui-react";
import NavBar from "../layout/NavBar";
import { Outlet } from "react-router-dom";

export default function AdminRoute() {
    return (
        <div className=''>
            <NavBar predicate="admin" />
            <Container style={{ margin: '0', padding: '8em 0' }}>
                {/* react-route package */}
                <Outlet />
            </Container>
        </div>
    )
}