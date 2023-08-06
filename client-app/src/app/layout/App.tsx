
import { ScrollRestoration, useLocation } from 'react-router-dom';
import HomePage from '../features/home/HomePage';
import { observer } from 'mobx-react-lite';
import ModalContainer from '../common/modal/ModalContainer';
import UserRoute from '../router/UserRoute';
import AdminRoute from '../router/AdminRoute';
import LoginForm from '../admin/LoginForm';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';

function App() {
  const { commonStore, userStore } = useStore();
  const location = useLocation();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

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
