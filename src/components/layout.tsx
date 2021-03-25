/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'
import Header from './header'
import Head from 'next/head'

interface Props {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Head>
                <title>Cooking Papa</title>
            </Head>
            <Header />
            <div css={ContentLayout}>{children}</div>
        </>
    )
}

const ContentLayout = css`
    padding-top: 48px;
`

export default Layout
