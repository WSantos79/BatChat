export default function MyApp ({ Component, pageProps}) {
  // roda em todas as páginas !

  return (
  <>
       <GlobalStyle/>
      <Component {...pageProps} />
  </>
)}

function GlobalStyle() {
  return (
      <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: 'Open Sans', sans-serif;
      }
      /* App fit Height */ 
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
      /* ./App fit Height */ 
      
      /* ./scroll bar do chat */ 
      * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      list-style:none;
      -ms-overflow-style: none;
  }    
    ::-webkit-scrollbar-thumb {
      background: rgba(19, 24, 38);
      }
      ::-webkit-scrollbar {
        background: #29333D ;
    }

    /* ./link do chat */ 

    a {
      color: #FFF;
      text-decoration: none;
    }

    `}</style>
  );
}