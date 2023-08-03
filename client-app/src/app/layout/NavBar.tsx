import { useMediaQuery } from 'react-responsive';
import NavbarLg from './NavbarLg';
import NavbarMb from './NavbarMb';
import { useState } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

interface Props {
    predicate: string;
}

export default function NavBar({ predicate }: Props) {
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
                to={predicate === 'user' ? '/' : '/admin/carousels'}
            >
                <img src="../assets/logo.png"
                    width="35px" height="35px" style={{ margin: "0 auto" }} alt="" />
            </Menu.Item>
            {
                predicate === 'admin' &&
                <>
                    <Menu.Item
                        name='about us'
                        as={NavLink}
                        to={'/admin/aboutus'}
                    />
                    <Menu.Item
                        name='services'
                        as={NavLink}
                        to={'/admin/services'}
                    />
                    <Menu.Item
                        name='AddOns'
                        as={NavLink}
                        to={'/admin/addons'}
                    />
                </>
            }
            <Menu.Item
                name='booking'
                as={NavLink}
                to={predicate === 'user' ? '/booking' : '/admin/bookings'}
            />
            <Menu.Item
                name='galleries'
                as={NavLink}
                to={predicate === 'user' ? '/gallery' : '/admin/galleries'}
            />
            <Menu.Item
                name='reviews'
                as={NavLink}
                to={predicate === 'user' ? '/reviews' : '/admin/reviews'}
            />
        </Container>
    }

    return (
        <div className='navbar-container' style={{ opacity: opacity }}>
            {isMobile ? <NavbarMb renderLinks={renderLinks} /> : <NavbarLg renderLinks={renderLinks} />}
        </div>
    )
}