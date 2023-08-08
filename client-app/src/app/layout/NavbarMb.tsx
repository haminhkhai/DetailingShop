import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Sidebar } from 'semantic-ui-react'

interface Props {
    predicate: string;
    renderLinks: any;
}

export default function NavbarMb({ predicate, renderLinks }: Props) {

    function Overlay() {
        return (
            <div style={{
                backgroundColor: "rgba(0, 0, 0, 0.795)",
                position: "fixed",
                height: "110vh",
                width: "100%",
            }} />
        )
    }

    function HamIcon() {
        return (<i className="big bars icon inverted" />)
    }

    function CloseIcon() {
        return (<i className="big close red icon" />)
    }
    const [visible, setVisible] = useState(false)
    const [icon, setIcon] = useState(HamIcon)

    const hideSidebar = () => {
        setIcon(HamIcon)
        setVisible(false)
    }
    const showSidebar = () => {
        setIcon(CloseIcon)
        setVisible(true)
    }
    const toggleSidebar = () => {
        visible ? hideSidebar() : showSidebar()
    }
    return (
        <>
            {visible && <Overlay />}
            <Menu inverted
                size="large"
                borderless
                attached
            >
                <Menu.Item
                    as={Link}
                    to={predicate === 'user' ? '/' : '/admin/carousels'}
                >
                    <img src="/assets/logo.png" width="35px" height="35px" alt="" />
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item onClick={toggleSidebar}>
                        {icon}
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            <Sidebar as={Menu}
                style={{ width: '280px' }}
                animation='overlay'
                icon='labeled'
                inverted
                vertical
                visible={visible}
                width='thin'
            >
                {renderLinks(toggleSidebar)}
            </Sidebar>
        </>
    )
}

