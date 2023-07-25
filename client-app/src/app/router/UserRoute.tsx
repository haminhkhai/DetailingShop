import NavBar from "../layout/NavBar";
import { Container, Segment } from "semantic-ui-react";
import { Outlet } from "react-router-dom";
import ContactInfo from "../features/info/ContactInfo";
import MapReveal from "../features/info/MapReveal";
import Footer from "../layout/footer/Footer";

export default function UserRoute() {
    return (
        <div className='App'>
            <NavBar predicate="user" />
            <Container fluid style={{ margin: '0', padding: '0' }}>
              {/* react-route package */}
              <Outlet />
            </Container>
            <ContactInfo />
            <MapReveal />
            <Footer />
          </div >
    )
}