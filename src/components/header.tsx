/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import Logo from "./Logo.svg";
import { Button } from 'antd';

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <div css={css`background:black;"`}>
      <Logo />
      <Button type="primary">hogehgoe</Button>
    </div>
  );
};

export default Header;
