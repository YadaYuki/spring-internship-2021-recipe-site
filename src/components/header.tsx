import React from 'react'
import Logo from "./Logo.svg"

interface Props {}

const Header:React.FC<Props> = () => {
return (<div style={{"background":"black"}}><Logo /></div>)
}

export default Header