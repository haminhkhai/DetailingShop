import NavBar from "../layout/NavBar";
import { Segment } from "semantic-ui-react";
import { Outlet } from "react-router-dom";
import ContactInfo from "../features/info/ContactInfo";
import MapReveal from "../features/info/MapReveal";
import Footer from "../layout/footer/Footer";

export default function UserRoute() {
  return (
    <div className=''>
      <NavBar predicate="user" />
      <Segment.Group style={{ margin: '0', padding: '0', border: '0' }}>
        {/* react-route package */}
        <Outlet />
      </Segment.Group>
      <ContactInfo />
      <MapReveal />
      <Footer />
    </div >
  )
}