
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../features/footer/Footer';
import ContactInfo from '../features/info/ContactInfo';
import MapReveal from '../features/info/MapReveal';
import ServiceDashboard from '../features/services/ServiceDashboard';
import Slider from '../features/slider/Slider';
import NavBar from './NavBar';
import HomePage from '../features/home/HomePage';
import { Container, Segment } from 'semantic-ui-react';
import CoverSlogan from '../features/cover slogan/CoverSlogan';
import { observer } from 'mobx-react-lite';
import ModalContainer from '../common/modal/ModalContainer';

function App() {
  const location = useLocation();
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
  return (
    <>
      <ModalContainer />
      {
        location.pathname === '/' ? <HomePage /> :
          (<div className='App'>
            <NavBar />
            <Segment basic style={{ margin: '0', padding: '0' }}>
              {/* react-route package */}
              <Outlet />
            </Segment>
            <Footer />
          </div >)
      }
    </>
  );
}

export default observer(App);
