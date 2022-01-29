import appConfig from "../config.json";
import Head from "next/head";
import {
  Box,
  Button,
  Text,
  TextField,
  Image,
  Icon,
} from "@skynexui/components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function AgaDois(props) {
  const Tag = props.tag || "h2";
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>
        {`
          ${Tag} {
            color: ${appConfig.theme.colors.neutrals["101"]};
            font-size: 24px;
            font-weight: 600;
          }
        `}
      </style>
    </>
  );
}

export default function PaginaInicial() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState({});
  const [x, setX] = useState("y");
  const rota = useRouter();
  const gitHubUrl = `https://api.github.com/users/${username}`;

  const getUserData = async () => {
    const response = await fetch(gitHubUrl);
    const jsonData = await response.json();
    if (jsonData && jsonData.message !== "Not Found") {
      setUserData(jsonData);
      setX("y");
    } else if (username !== "") {
      console.log("usuario não existe");
      setX("n");
    } else {
      setUserData({});
    }
  };

  useEffect(() => {
    getUserData();
  }, [username]);

  return (
    <>
      <Head>
        <title>BatChat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          //backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: "url(background1.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            borderRadius: "8px",
            padding: "32px",
            margin: "16px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0" + appConfig.theme.colors.primary[100],
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/*console.log(typeof userData.name === "undefined")*/}
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={(e) => {
              e.preventDefault();
              if (typeof userData.name === "undefined") {
                rota.push(`/chat?username=Batman`);
              } else {
                rota.push(`/chat?username=${userData.name}`);
              }
            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <AgaDois>Boas vindas de volta ao BatChat!</AgaDois>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[300],
              }}
            ></Text>

            <TextField
              fullWidth
              placeholder="Seu usuário GitHub"
              onChange={(e) => {
                const digitado = e.target.value;
                setUsername(digitado);
                appConfig.username = digitado;
              }}
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200], // inpt
                  mainColor: appConfig.theme.colors.primary[600], //borda input
                  mainColorHighlight: appConfig.theme.colors.primary[100],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals[101], // icon de dentro
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: "1px solid",
              borderColor: appConfig.theme.colors.primary[100],
              borderRadius: "10px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              styleSheet={{
                borderRadius: "50%",
                marginBottom: "16px",
              }}
              src={
                username.length > 2 && x != "n"
                  ? `https://github.com/${username}.png`
                  : `https://avatars.githubusercontent.com/u/98439765?v=4`
              }
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              {username.length > 2 && x != "n" ? userData.login : `Batman`}
            </Text>
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "1000px",
                marginTop: "8px",
              }}
            >
              {username.length > 2 && x != "n"
                ? userData.location
                : `Gotham City`}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
