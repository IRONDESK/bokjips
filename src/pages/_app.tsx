import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { Provider } from "jotai";
import { Layout } from "../components/Layouts/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </Provider>
  );
}
