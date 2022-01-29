import { Image, Box } from "@skynexui/components";
import Head from "next/head";

export default function PagNotFound() {
  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
        }}
      >
        <Image alt="Página não encontrada" src="404.jpg" />
        <Head>
          <title>BatChat</title>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
          <link rel="manifest" href="/site.webmanifest"/>
        </Head>
      </Box>
    </>
  );
}
