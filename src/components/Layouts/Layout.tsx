import React from "react";
import Footer from "./partials/Footer";
import Header from "./partials/Header";

export const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
