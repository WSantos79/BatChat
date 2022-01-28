import {
  Box,
  Text,
  TextField,
  Image,
  Button,
  Icon,
} from "@skynexui/components";
import React, { useEffect, useState } from "react";
import appConfig from "../config.json";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMyMjE4OCwiZXhwIjoxOTU4ODk4MTg4fQ.0CUNCKzptu_jnI1AMmqQz1UfM5YtVWdp5ukosh2k-y8";
const SUPABASE_URL = "https://ijzsexiwhccnepwwhlmt.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
  const [msg, setMsg] = useState("");
  const [listaDeMensagens, setListaDeMensagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const usuario = appConfig.nome;

  useEffect(() => {
    supabaseClient
      .from("mensagens")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        // usa o { data } para pegar o dado direto q precisa ou apenas (dados)
        setListaDeMensagens(data);
        setLoading(false);
      });
  }, [listaDeMensagens]); // se a 'listaDeMensagens' mudar, ele executa

  function handleNovaMsg(digitado) {
    const mensagem = {
      // id: listaDeMensagens.length,
      from: usuario,
      texto: digitado,
    };

    supabaseClient
      .from("mensagens") // nome do bd
      .insert([
        // tem .delete
        mensagem, // nome const da const da handlenovamsg
      ])
      .then(({ data }) => {
        setListaDeMensagens([data[0], ...listaDeMensagens]); // adcionando nova msg no bd
      });

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

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(background1.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],          
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          {/* <MessageList mensagens={[]} /> */}
          <MessageList
            mensagens={listaDeMensagens}
           // handleDeletMsg={handleDeletMsg}
            loading={loading}
            setListaDeMensagens={setListaDeMensagens}
          />

          <Box
            as="form"
            styleSheet={{
              display: "flex",
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
            <Button
              iconName="arrowRight"
              onClick={() => {
                handleNovaMsg(msg);
              }}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
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
        <Text variant="heading5">Chat</Text>
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
    if (mensagem.from == appConfig.username) {
      // deletar msg

      //console.log(mensagem.id)
      supabaseClient
        .from("mensagens")
        .delete()
        .match({ id: mensagem.id })
        .then(({ data }) => {
          const messageListFiltered = props.mensagens.filter(
            (messageFiltered) => {
              return messageFiltered.id != data[0].id;
            }
          );
          props.setListaDeMensagens(messageListFiltered);
        });
    }
  }

  //const handleDeletMsg = props.handleDeletMsg;
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
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
            alt="Carregando"
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
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${mensagem.from}.png`}
              />
              <Text tag="strong">{mensagem.from}</Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>

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
                  mainColor: appConfig.theme.colors.neutrals["000"],
                }}
                // quando clicar vai chamar a função de excluir a mensagem
                onClick={() => {
                  //e.preventDefault();
                  deleteMessage(mensagem);
                }}
              />
            </Box>
            {mensagem.texto}
          </Text>
        );
      })}
    </Box>
  );
}
