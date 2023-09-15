import React, { useLayoutEffect } from "react";
import { useRouter } from "next/router";

import Footer from "./partials/Footer";
import Header from "./partials/Header";

export const Layout = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [router.asPath]);

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
