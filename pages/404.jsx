import { Image, Box } from "@skynexui/components";
import Head from "next/head";

export default function PagNotFound() {
  // Renderiza a página de erro 404
  return (
    <>
      {/* Cria um container centralizado com fundo preto */}
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
        }}
      >
        {/* Exibe a imagem de erro 404 */}
        <Image alt="Página não encontrada" src="404.jpg" />
        {/* Define o título e os favicons da página */}
        <Head>
          <title>BatChat</title>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
      </Box>
    </>
  );
}