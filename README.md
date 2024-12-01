# <p align="center"> :star: BatChat</p>

## :mag: Veja o projeto online !

:link: <a href="https://bat-chat.vercel.app/" target="_blank">https://bat-chat.vercel.app/</a>

<br>
<p align="center">
 <a href="#heavy_check_mark-Descrição">Descrição</a> •
 <a href="#hammer-Tecnologias">Tecnologias</a> •
 <a href="#game_die-Rodando-localmente">Rodando projeto</a> •
 <a href="#smiley-autor">Autor</a>
</p>

<img src="https://github.com/WSantos79/BatChat/blob/main/public/screenshot.PNG?raw=true"><br><br>

## :heavy_check_mark: **Descrição**

Projeto desenvolvido durante a imersão React da Alura. Um chat em tempo real onde você entra informando um username do GitHub, sem autenticação, obtendo os dados da API do GitHub, podendo mandar mensagens e stickers que quando feito é emitido um efeito sonoro e ao receber é emitido outro efeito sonoro, podendo apagar somente a própria mensagem, além de quando clicado no perfil é aberto o github do usuário.

## :hammer: **Tecnologias**

<ul type="none">
<li>:small_blue_diamond: HTML</li>
<li>:small_blue_diamond: CSS</li>
<li>:small_blue_diamond: JavaScript</li>
<li>:small_blue_diamond: NextJs</li>
<li>:small_blue_diamond: ReactJs</li>
<li>:small_blue_diamond: Supabase</li>
<li>:small_blue_diamond: SkynexUI</li> 
</ul>

## :game_die: Rodando localmente

+ Clone este repositório.
+ Execute `yarn install` ou `npm install` para instalar as dependências.
+ Inicie o projeto `yarn dev` ou `npm run dev`.
+ Configure as variáveis de ambiente:

   Crie um arquivo .env na raiz do projeto

   Configure as seguintes variáveis no arquivo:
   ```bash
   SUPABASE_URL = "sua_url_supabase"
   SUPABASE_API_KEY = "sua_api_key"```

* Configure o SupaBase
   Crie uma Nova Tabela com o nome de mensagens
   Desabilite (RLS)
   Insira as colunas da tabela conforme descrito abaixo:
   Nome da Coluna	Tipo	Configuração
    id	int8	Primary Key (Marque como PK e Auto Increment)
    created_at	timestamptz	Default: now()
    from	text	Sem configuração adicional
    texto	text	Sem configuração adicional
    username	text	Sem configuração adicional
    img	text	Sem configuração adicional
## 🛡️ Segurança

Certifique-se de proteger seu arquivo .env e nunca publique credenciais sensíveis em repositórios públicos.


## :smiley: Autor

## <a href="https://github.com/WSantos79">Wellington Santos 🚀</a>

[![Linkedin Badge](https://img.shields.io/badge/-WellingtonSantos79-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/wellingtonsantos79/)](https://www.linkedin.com/in/wellingtonsantos79/) 
[![Gmail Badge](https://img.shields.io/badge/-WellingtonSantos7799@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:wellingtonsantos7799@gmail.com)](mailto:wellingtonsantos7799@gmail.com)