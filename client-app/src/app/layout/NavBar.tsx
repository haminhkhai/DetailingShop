import { useMediaQuery } from 'react-responsive';
import NavbarLg from './NavbarLg';
import NavbarMb from './NavbarMb';
import { useEffect, useState } from 'react';
import { Container, Dropdown, Menu, Image, Label } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../stores/store';

interface Props {
    predicate: string;
}

export default function NavBar({ predicate }: Props) {
    const [opacity, setOpacity] = useState("");
    const { userStore: { user, logout } } = useStore();

    const isMobile = useMediaQuery({

        query: predicate !== 'admin' ? '(max-width: 576px)' : '(max-width: 1200px)'
    })

    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500)
            setOpacity("100%");
        else {
            if (!isMobile)
                setOpacity("60%");
        }


    }

    useEffect(() => {
        if (isMobile) setOpacity("100%");
    }, [isMobile])

    const renderLinks = (toogle: () => void) => {
        return <Container className="menu-wrapper">
            <Menu.Item
                onClick={toogle}
                name='logo'
                as={NavLink}
                to={predicate === 'user' ? '/' : '/admin/carousels'}
            >
                <img src="/assets/logo.png"
                    width="35px" height="35px" style={{ margin: "0 auto" }} alt="" />
            </Menu.Item>
            {
                predicate === 'admin' &&
                <>
                    <Menu.Item
                        name='ABOUT US'
                        as={NavLink}
                        onClick={toogle}
                        to={'/admin/aboutus'}
                    />
                    <Menu.Item
                        name='SERVICES'
                        as={NavLink}
                        onClick={toogle}
                        to={'/admin/services'}
                    />
                    <Menu.Item
                        name='ADD-ONS'
                        as={NavLink}
                        onClick={toogle}
                        to={'/admin/addons'}
                    />
                </>
            }
            <Menu.Item
                name='BOOKING'
                as={NavLink}
                onClick={toogle}
                to={predicate === 'user' ? '/booking' : '/admin/bookings'}
            />
            <Menu.Item
                name='GALLERIES'
                as={NavLink}
                onClick={toogle}
                to={predicate === 'user' ? '/gallery' : '/admin/galleries'}
            />
            <Menu.Item
                name='REVIEWS'
                as={NavLink}
                onClick={toogle}
                to={predicate === 'user' ? '/reviews' : '/admin/reviews'}
            />
            {user &&
                <Menu.Item position='right' onClick={toogle} as={Label}>
                    <Image src='/assets/user.png' avatar spaced='right' />
                    <Dropdown pointing='top left' text={user ? user.username : ""}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={NavLink} to={'/admin/carousels'}
                                text='Admin Panel' icon='setting' />
                            <Dropdown.Item as={NavLink} to={'/'}
                                text='User Page' icon='user' />
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>

                </Menu.Item>
            }
        </Container>
    }

    return (
        <div className='navbar-container' style={{ opacity: opacity }}>
            {isMobile ? <NavbarMb predicate={predicate} renderLinks={renderLinks} /> : <NavbarLg renderLinks={renderLinks} />}
        </div>
    )
}