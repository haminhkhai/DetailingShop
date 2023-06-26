import { useMediaQuery } from 'react-responsive';
import NavbarLg from './NavbarLg';
import NavbarMb from './NavbarMb';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    const [opacity, setOpacity] = useState("");

    const isMobile = useMediaQuery({ query: '(max-width: 576px)' })

    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500)
            setOpacity("100%");
        else
            if (isMobile === false)
                setOpacity("60%");

    }

    const renderLinks = () => {
        return <Container className="menu-wrapper">
            <Menu.Item
                name='logo'
                as={NavLink}
                to={'/'}
            >
                <img src="./assets/logo.png" width="35px" height="35px" style={{ margin: "0 auto" }} alt="" />
            </Menu.Item>
            <Menu.Item
                name='booking'
                as={NavLink}
                to={'/booking'}
            />
            <Menu.Item
                name='servicePack'
                as={NavLink}
                to={'/servicePack'}
            />
            <Menu.Item
                name='gallery'
                as={NavLink}
                to={'/gallery'}
            />
            <Menu.Item
                name='reviews'
                as={NavLink}
                to={'/reviews'}
            />
        </Container>
    }

    return (
        <div className='navbar-container' style={{ opacity: opacity }}>
            {isMobile ? <NavbarMb renderLinks={renderLinks} /> : <NavbarLg renderLinks={renderLinks} />}
        </div>
    )
}