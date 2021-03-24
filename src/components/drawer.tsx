/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { Drawer } from "antd";
import { Input } from "antd";
import Link from "next/link";

const { Search } = Input;

interface Props {
  handleClose: () => void;
  visible: boolean;
}

const SearchDrawer: React.FC<Props> = ({ handleClose, visible }) => {
  return (
    <Drawer
      placement="right"
      closable={false}
      onClose={handleClose}
      visible={visible}
      getContainer={false}
      css={DrawerStyle}
    >
      <Search placeholder="料理名・食材名" style={{ width: 200 }} onSearch={(q:string)=>{
        location.href=`/?q=${q}`
      }}/>   
      <div>
        <p>ここに春が旬の食材一覧が入る予定</p>
        <p>ここに春が旬の食材一覧が入る予定</p>
        <p>ここに春が旬の食材一覧が入る予定</p>
        <p>ここに春が旬の食材一覧が入る予定</p>
        <p>ここに春が旬の食材一覧が入る予定</p>
      </div>
    </Drawer>
  );
};

const DrawerStyle = css`
  > .ant-drawer-content-wrapper {
    width: 80% !important;
  }
  .ant-drawer-body {
    > span {
      width: 100% !important;
    }
    > div {
      margin-top: 16px;
    }
  }
`;

export default SearchDrawer;
