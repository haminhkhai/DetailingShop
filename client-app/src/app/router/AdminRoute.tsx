import { Container, Segment } from "semantic-ui-react";
import NavBar from "../layout/NavBar";
import { Outlet } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

export default observer(function AdminRoute() {
    return (
        <div className=''>
            <NavBar predicate="admin" />
            <Container style={{ margin: '0', padding: '8em 0' }}>
                {/* react-route package */}
                <Outlet />
            </Container>
        </div>
    )
})