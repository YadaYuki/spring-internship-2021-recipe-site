/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import Logo from "./Logo.svg";

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <div css={css`background:black;"`}>
      <Logo />
    </div>
  );
};

export default Header;
