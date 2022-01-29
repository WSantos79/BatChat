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
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </Box>
    </>
  );
}
