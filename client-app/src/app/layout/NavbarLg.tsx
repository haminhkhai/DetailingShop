import { Menu, Segment } from 'semantic-ui-react';

export default function NavbarLg({ renderLinks }: any) {
    return (
        <Segment inverted attached size='mini'>
            <Menu style={{opacity:"100%"}} inverted secondary>
                {renderLinks()}
            </Menu>
        </Segment>

    )
}