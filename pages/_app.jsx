export default function MyApp({ Component, pageProps }) {
  // Este componente é o componente principal da nossa aplicação Next.js.
  // Ele é responsável por envolver todos os componentes da página com estilos globais e outras configurações.

  return (
    <>
      {/* Aplicando estilos globais a toda a aplicação */}
      <GlobalStyle />
      {/* Renderizando o componente da página atual */}
      <Component {...pageProps} />
    </>
  );
}

function GlobalStyle() {
  return (
    <style global jsx>{`
      /* Estilos globais para todos os elementos */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }

      /* Estilos para o corpo do documento */
      body {
        font-family: 'Open Sans', sans-serif;
      }

      /* Estilos para ajustar a altura da aplicação */
      html, body, #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }

      /* Estilos para a barra de rolagem do chat */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
        -ms-overflow-style: none; /* Ocultar a barra de rolagem padrão do IE */
      }
      ::-webkit-scrollbar-thumb {
        background: rgba(19, 24, 38); /* Cor da barra de rolagem */
      }
      ::-webkit-scrollbar {
        background: #29333D; /* Cor do fundo da barra de rolagem */
      }

      /* Estilos para links */
      a {
        color: #FFF;
        text-decoration: none;
      }
    `}</style>
  );
}