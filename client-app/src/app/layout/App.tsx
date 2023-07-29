
import { ScrollRestoration, useLocation } from 'react-router-dom';
import HomePage from '../features/home/HomePage';
import { observer } from 'mobx-react-lite';
import ModalContainer from '../common/modal/ModalContainer';
import UserRoute from '../router/UserRoute';
import AdminRoute from '../router/AdminRoute';
import LoginForm from '../admin/LoginForm';
import { ToastContainer } from 'react-toastify';

function App() {
  const location = useLocation();
  // window.onbeforeunload = function () {
  //   window.scrollTo(0, 0);
  // }
  return (
    <>
      <ScrollRestoration />
      <ToastContainer className="toast-position" position='top-center' hideProgressBar theme='colored' />
      <ModalContainer />
      {
        location.pathname === '/' ? <HomePage /> :
          location.pathname === '/login' ? <LoginForm /> :
            location.pathname.indexOf('admin') !== -1 ? <AdminRoute /> :
              <UserRoute />
      }
    </>
  );
}

export default observer(App);
