import React, { ReactElement, SyntheticEvent, useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { JsxElement } from 'typescript';

export default function NavbarLg({ renderLinks }: any) {
    return (
        <Segment inverted attached size='mini'>
            <Menu style={{opacity:"100%"}} inverted secondary>
                {renderLinks()}
            </Menu>
        </Segment>

    )
}