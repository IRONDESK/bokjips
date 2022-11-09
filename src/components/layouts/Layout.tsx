import React from "react";
import Footer from "./partials/Footer";
import Header from "./partials/Header";
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
