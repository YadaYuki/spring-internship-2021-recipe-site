/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React,{useState,useCallback} from "react";
import TitleLogo from "../../public/title.svg";
import SearchLogo from "../../public/search.svg";
import { Button } from "antd";
import SearchDrawer from "./drawer"

interface Props {}

const Header: React.FC<Props> = () => {
  const [drawerIsOpen,setDrawerIsOpen] = useState<boolean>(false)
  const handleOpen = useCallback(()=>{
    setDrawerIsOpen(true)
  },[])
  const handleClose = useCallback(()=>{
    setDrawerIsOpen(false)
  },[])
  return (
    <div css={HeaderStyle}>
      <TitleLogo />
      <Button onClick={handleOpen} type="text" shape="circle" icon={<SearchLogo />} />
      <SearchDrawer handleClose={handleClose} visible={drawerIsOpen} />
    </div>
  );
};

const HeaderStyle = css`
  background: #e3c006;
  height: 48px;
  position: fixed;
  width: 100%;
  > svg {
    margin-top: 8px;
    margin-left: 8px;
  }
  >button{
    position: fixed;
    right:8px;
    top:8px;
  }
`;

export default Header;
