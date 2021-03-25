import 'antd/dist/antd.css'
import React from 'react'

// This default export is required in a new `pages/_app.js` file.
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const MyApp = ({ Component, pageProps }) => {
    return <Component {...pageProps} />
}

export default MyApp
