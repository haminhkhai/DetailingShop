import { useMediaQuery } from 'react-responsive';
import NavbarLg from './NavbarLg';
import NavbarMb from './NavbarMb';
import { SyntheticEvent, useState } from 'react';
import { Container, Menu } from 'semantic-ui-react';

export default function NavBar() {
    const [activeItem, setactiveItem] = useState("logo");
    function handleItemClick(e: SyntheticEvent, name: string) {
        setactiveItem(name);
    }

    const renderLinks = () => {
        return <Container>
            <Menu.Item
                name='logo'
                active={activeItem === 'logo'}
                onClick={(e, { name }) => handleItemClick(e, name!)}
            >
                <img src="./assets/logo.png" width="35px" height="35px" style={{ margin: "0 auto" }} alt="" />
            </Menu.Item>
            <Menu.Item
                name='booking'
                active={activeItem === 'booking'}
                onClick={(e, { name }) => handleItemClick(e, name!)}
            />
            <Menu.Item
                name='servicePack'
                active={activeItem === 'servicePack'}
                onClick={(e, { name }) => handleItemClick(e, name!)}
            />
            <Menu.Item
                name='gallery'
                active={activeItem === 'gallery'}
                onClick={(e, { name }) => handleItemClick(e, name!)}
            />
            <Menu.Item
                name='reviews'
                active={activeItem === 'reviews'}
                onClick={(e, { name }) => handleItemClick(e, name!)}
            />
            <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={(e, { name }) => handleItemClick(e, name!)}
                position='right'
            />
            <Menu.Item
                name='register'
                active={activeItem === 'register'}
                onClick={(e, { name }) => handleItemClick(e, name!)}
            />
        </Container>
    }

    const none = useMediaQuery({ query: "(max-width:576px)" })
    const sm = useMediaQuery({ query: "(min-width:576px)" })
    const md = useMediaQuery({ query: "(min-width:768px)" })
    const lg = useMediaQuery({ query: "(min-width:992px)" })
    const xl = useMediaQuery({ query: "(min-width:1200px)" })
    const xxl = useMediaQuery({ query: "(min-width:1400px)" })
    const size = { none, sm, md, lg, xl, xxl }

    return (
        <div>
            {size.sm ? <NavbarLg renderLinks={renderLinks} /> : <NavbarMb renderLinks={renderLinks}/>}
        </div>
    )
}