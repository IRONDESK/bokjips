import Head from "next/head";
import { useRouter } from "next/router";

export const Title = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <Head>
      <title>
        {router.pathname === "/"
          ? "복지편살 ─ 복잡한 복지 정보, 편하게 살펴보자"
          : `${title && `${title} | `}복지편살`}
      </title>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="Description" content="" />
      <link rel="icon" type="image/x-icon" href="./favicon.ico" />
      <meta property="og:title" content="복지편살" />
      <meta property="og:type" content="website" />
      <meta
        property="og:site_name"
        content="복지편살 ─ 복잡한 복지 정보, 편하게 살펴보자"
      />
      <meta property="og:description" content="" />
      <meta property="og:image" content="./images/ogimage.jpg" />
    </Head>
  );
};
