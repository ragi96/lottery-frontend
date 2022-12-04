import React from 'react'
import styled from 'styled-components'
import { Logo, Button } from './'

const Wrapper = styled.header`
    width: 100%;
    max-width: 1280px;
    height: 75px;
    margin: 0 auto 0 auto;
    padding-top: 35px;
    a:first-child {
        float: left;
    }
    a:last-child {
        float: right;
        margin-top: 19px;
    }
`

export default function Header() {
    return (
        <Wrapper role="header">
            <Logo />
            <Button primary={true} to="/lottery" label="Go To Lottery" />
        </Wrapper>
    )
}
