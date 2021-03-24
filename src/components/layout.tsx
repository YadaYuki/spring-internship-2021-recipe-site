/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import Header from "./header";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <div css={ContentLayout}>{children}</div>
    </>
  );
};

const ContentLayout = css`
  padding-top: 48px;
`;

export default Layout;
