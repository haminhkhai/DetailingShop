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
        query: '(max-width: 1200px)'
    })

    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500)
            setOpacity("100%");
        else {
            if (!isMobile && predicate !== 'admin')
                setOpacity("60%");
        }

    }

    useEffect(() => {
        if (isMobile || predicate === 'admin') {
            setOpacity("100%");
        }
    }, [isMobile, predicate])

    const renderLinks = (toogle: () => void) => {
        return <Container className="menu-wrapper">
            <Menu.Item
                onClick={toogle}
                name='logo'
                as={NavLink}
                to={predicate === 'user' ? '/' : '/admin/carousel'}
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
                        name='SERVICE'
                        as={NavLink}
                        onClick={toogle}
                        to={'/admin/service'}
                    />
                    <Menu.Item
                        name='ADD-ON'
                        as={NavLink}
                        onClick={toogle}
                        to={'/admin/addon'}
                    />
                </>
            }
            <Menu.Item
                name='BOOKING'
                as={NavLink}
                onClick={toogle}
                to={predicate === 'user' ? '/booking' : '/admin/booking'}
            />
            <Menu.Item
                name='GALLERY'
                as={NavLink}
                onClick={toogle}
                to={predicate === 'user' ? '/gallery' : '/admin/gallery'}
            />
            <Menu.Item
                name='BLOG'
                as={NavLink}
                onClick={toogle}
                to={predicate === 'user' ? '/blog' : '/admin/blog'}
            />
            <Menu.Item
                name='REVIEW'
                as={NavLink}
                onClick={toogle}
                to={predicate === 'user' ? '/review' : '/admin/review'}
            />
            {user &&
                <Menu.Item position='right' onClick={toogle} as={Label}>
                    <Image src='/assets/user.png' avatar spaced='right' />
                    <Dropdown pointing='top left' text={user ? user.username : ""}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={NavLink} to={'/admin/carousel'}
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