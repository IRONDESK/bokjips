import React from "react";
import { Header, Footer } from "./";
import { Title } from "./partials/Title";

export const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Title title="복지편살" />
      <Header />
      {children}
      <Footer />
    </>
  );
};
