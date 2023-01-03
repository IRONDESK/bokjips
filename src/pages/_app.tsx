import "../styles/font.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "jotai";
import { Layout } from "../components/Layouts/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
