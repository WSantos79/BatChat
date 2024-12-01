import 'dotenv/config';
import {
  Box,
  Text,
  TextField,
  Image,
  Button,
  Icon,
} from "@skynexui/components";
import React, { useEffect, useState, useRef } from "react";
import appConfig from "../config.json";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { ButtonSendSticker } from "../src/components/ButtonSendSticker";
import Head from "next/head";

const SUPABASE_ANON_KEY = (process.env.NEXT_PUBLIC_SUPABASE_API_KEY);
const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL);
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function novaMsgSom() {
  var som = new Audio();
  som.src ="audio/nova-msgm.mp3";
  som.play();
}
function enviarMsgSom() {
  var somB = new Audio();
  somB.src = "audio/enviar-msgm.mp3";
  somB.play();
}

function escutaMsgRealTime(addMsg) {
  return supabaseClient
    .from("mensagens")
    .on("INSERT", (resposta) => {
      if (resposta.new.username != appConfig.username) {
        novaMsgSom();
        scrollToBottom();
      }
      addMsg(resposta.new);
    })
    .subscribe();
}

export default function ChatPage() {
  const roteamento = useRouter();
  const userlogged = roteamento.query.username;
  const [msg, setMsg] = useState("");
  const [listaDeMensagens, setListaDeMensagens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabaseClient
      .from("mensagens")
      .select("*")
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        // usa o { data } para pegar o dado direto q precisa ou apenas (dados)
        setListaDeMensagens(data);
        setLoading(false);
      });

    escutaMsgRealTime((newMsg) => {
      setListaDeMensagens((valorAtualDaLista) => {
        return [newMsg, ...valorAtualDaLista];
      });
    });
  }, [listaDeMensagens]); // se a 'listaDeMensagens' mudar, ele executa

  function handleNovaMsg(digitado) {
    if (!digitado.trim()) return; //evitar mensagem vazia
    enviarMsgSom();
    const mensagem = {
      // id: listaDeMensagens.length,
      from: userlogged,
      texto: digitado,
      username: appConfig.username,
      img: appConfig.img,
    };

    supabaseClient
      .from("mensagens") // nome do bd
      .insert([
        // tem .delete
        mensagem, // nome const da const da handlenovamsg
      ])
      .then(({ data }) => {});

    setMsg("");
  }

  /*function handleDeletMsg(msg) {
    // id da msg
    const id = msg.id;
    // lista filtrada
    const msgFiltrada = listaDeMensagens.filter((msg) => {
      return msg.id != id;
    });
    setListaDeMensagens(msgFiltrada);
  }*/

  function NovaData(time) {
    const day = new Date().getDate();
    const dayDiff = day - parseInt(time.substring(8, 10));
    var date = "";
    switch (dayDiff) {
      case 0:
        date = "Hoje, " + time.substring(11, 16);
        break;
      case 1:
        date = "Ontem, " + time.substring(11, 16);
        break;
      default:
        date =
          time.substring(8, 10) +
          "/" +
          time.substring(5, 7) +
          "/" +
          time.substring(0, 4);
    }
    return date;
  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(background1.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["101"],
      }}
    >
      <Head>
        <title>BatChat</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: {
            xs: "95%",
            sm: "60%",
          },
          maxHeight: "95vh",
          padding: "32px",
          boxShadow: "0 2px 10px 0" + appConfig.theme.colors.primary[100],
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[601],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
            wordBreak: "break-word",
            overflowY: "auto",
            overflowWrap: "break-word",
          }}
        >
          {/* <MessageList mensagens={[]} /> */}
          <MessageList
            mensagens={listaDeMensagens}
            // handleDeletMsg={handleDeletMsg}
            loading={loading}
            setListaDeMensagens={setListaDeMensagens}
            listaDeMensagens={listaDeMensagens}
            userlogged={userlogged}
            NovaData={NovaData}            
          />
          <Box
            as="form"
            styleSheet={{
              display: {
                xs: "inline",
                sm: "flex",
              },
              alignItems: "center",
            }}
          >
            <TextField
              value={msg}
              onChange={(e) => {
                setMsg(e.target.value);
                if (e.target.key == 9) {
                  e.target.value = "";
                }
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleNovaMsg(msg);             
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            {/* CallBack do buttonSendSticker em onclick*/}
            <Box
              styleSheet={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <ButtonSendSticker
                onStickerClick={(sticker) => {
                  handleNovaMsg(`:sticker: ${sticker}`);
                  enviarMsgSom();
                }}
              />
              <Button
                iconName="arrowRight"
                onClick={() => {
                  handleNovaMsg(msg);
                  enviarMsgSom();
                }}
                styleSheet={{
                  marginLeft: "12px",
                  marginBottom: "8px",
                  minWidth: "50px",
                  minHeight: "50px",
                }}
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals[101],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">BatChat - {appConfig.username}</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  function deleteMessage(mensagem) {
    // deletar msg

    //console.log(mensagem.id)
    supabaseClient
    .from("mensagens")
    .delete()
    .match({ id: mensagem.id })
    .then(({ data }) => {
      if (data.length > 0) {
        const messageListFiltered = props.mensagens.filter(
          (messageFiltered) => messageFiltered.id !== data[0].id
        );
        props.setListaDeMensagens(messageListFiltered);
      }
    })
    .catch((error) => {
      console.error("Erro ao deletar mensagem:", error);
    });
}

  function icondelete(mensagem) {
    if (mensagem.from == props.userlogged) {
      return (
        <Button
          /* botão para excluir a mensagem */
          styleSheet={{
            borderRadius: "25%",
            width: "12px",
            marginLeft: "8px",
          }}
          variant="tertiary"
          colorVariant="dark"
          label={<Icon label="icon trash" name="FaRegTrashAlt" />}
          buttonColors={{
            mainColor: appConfig.theme.colors.neutrals[101],
          }}
          // quando clicar vai chamar a função de excluir a mensagem
          onClick={() => {
            //e.preventDefault();
            deleteMessage(mensagem);
          }}
        />
      );
    }
  }
  const messagesEndRef = useRef(null);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

 /* useEffect(() => {
    let rollToBottom = setTimeout(() => scrollToBottom(), 400);
    return () => {
      clearTimeout(rollToBottom);
    };
  }, [props.mensagens]);
*/
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "auto",
        scrollbarColor: appConfig.theme.colors.neutrals[101],
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals[101],
        marginBottom: "16px",
      }}
    >
      <div ref={messagesEndRef} />
      {props.loading && (
        <Box
          styleSheet={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Image
            styleSheet={{
              borderRadius: "30%",

              maxWidth: "150px",
              align: "center",
            }}
            alt="Carregando..."
            src="batload.gif"
          />
        </Box>
      )}
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
                alignItems: "center",
                display: "flex",
              }}
            >
              <a
                target="_blank"
                href={`https://github.com/${mensagem.username}`}

              >                
                <Image
                  title={`Ver GitHub ${mensagem.username}`}
                  styleSheet={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    display: "inline-block",
                    marginRight: "8px",
                    hover: {
                      cursor: "pointer",
                      width: "35px",
                      height: "35px",
                    },
                  }}
                  src={`${mensagem.img}`}
                />
              </a>

              <a
                target="_blank"
                href={`https://github.com/${mensagem.username}`}
              >
                <Text
                  styleSheet={{
                    hover: {
                      fontSize: "18px",
                    },
                  }}
                  title={`Ver GitHub ${mensagem.username}`}
                  tag="strong"
                >
                  {mensagem.from}
                </Text>
              </a>

              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {props.NovaData(mensagem.created_at)}
                {/* new Date().toLocaleDateString()  */}
              </Text>
              {icondelete(mensagem)}
            </Box>
            {mensagem.texto.startsWith(":sticker:") ? (
              <Image
                styleSheet={{
                  width: "150px",
                  height: "100px",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={mensagem.texto.replace(":sticker:", "")}
              />
            ) : (
              mensagem.texto
            )}
          </Text>
        );
      })}
    </Box>
  );
}
