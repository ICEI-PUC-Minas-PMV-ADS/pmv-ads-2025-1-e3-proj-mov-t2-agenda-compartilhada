# Instruções de utilização

## Instalação do aplicativo

O projeto em [React Native](https://reactnative.dev/) é um aplicativo de calendário coletivo. O aplicativo objetiva proporcionar aos usuários a possibilidade de criação de grupos e, a partir desses grupos criar eventos que serão compartilhados por todos no grupo.

## Histórico de versões

### [1.0.0] - 01/06/2025

#### Instalação do projeto:
O aplicativo funciona conectado a um banco de dados [MongoDB](https://www.mongodb.com/) e utiliza o [NestJS](https://nestjs.com/) como API de comunicação com o banco. É necessário a instalação do banco de dados localmente para testar a aplicação. O banco de dados foi construído utilizando [docker](https://www.docker.com/).

##### Configuração do ambiente:
É necessário possuir instalados e configurados o [Node.js](https://nodejs.org/) e o docker. No Windows considere utilizar o [docker desktop](https://docs.docker.com/desktop/), uma vez que além de proporcionar boa visualização e gerenciamento dos containers, imagens e volumes criados ao instalá-lo ele realizara as configurações de WSL necessárias.
No momento o código fonte da aplicação está na branch ["develop"](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-1-e3-proj-mov-t2-agenda-compartilhada/tree/develop) do projeto no github. É necessário baixar o código da aplicação, seja clonando o repositório ou baixando diretamente o zip da branch "develop" no github:

![image](https://github.com/user-attachments/assets/8ac3427f-c961-4465-8117-75b296652f71)

![image](https://github.com/user-attachments/assets/ea856708-832b-4054-a380-d40d12a3acba)

Com o projeto salvo localmente (e extraído, se for o caso), é preciso configurar as variáveis de ambiente para a comunicação do aplicativo com o banco de dados. Para isso bata criar um arquivo chamado .env dentro da pasta ```src\bora-api```, e nesse arquivo, definir as seguintes variáveis:

```
MONGO_URI='mongodb://SEUIPLOCAL:27017/bora-db'
API_IP='http://SEUIPLOCAL:3000'
```

Logo após, na pasta ```src\bora-app``` é necessário criar outro arquivo com o mesmo nome (.env) e definir a seguinte variável:

```
API_IP='http://SEUIPLOCAL:3000'
```

Caso não saiba como obter seu ip local [essse artigo](https://canaltech.com.br/internet/como-descobrir-o-numero-de-ip/) pode ajudar.

##### Instalação e execução do projeto:

Com o ambiente pronto o passo seguinte é a instalação das dependências do projeto. Para isso é necessário, utilizando um terminal (prompt de comando ou powershell), navegar até a pasta do projeto. Nas pastas ```src\bora-api``` e ```src\bora-app``` é necessário rodar o comando ```npm install``` que realizará o download de todas as dependências necessárias do projeto. Ainda no terminal, na pasta raiz do projeto deve-se executar o comando ```docker-compose up -d```, esse comando realizará a instalação e criação do banco de dados no container docker.

Agora, com todas as dependências e o banco de dados instalado e configurado conseguimos executar a aplicação. Para rodar o aplicativo são necessários dois terminais abertos. O primeiro na pasta ```src\bora-api``` deve executar o comando ```npm run start:dev```, esse comando irá inicializar o NestJS, utilizado como API de comunicação, é necessário manter o terminal aberto. O segundo terminal, na pasta ```src\bora-app``` deve executar o comando ```npx expo start``` , esse é o comando que inicia o aplicativo através do [Expo Go](https://expo.dev/go), o terminal também deve permanecer aberto. Com ambos os terminais rodando é possível utilizar a aplicação através de um emulador Android / iOS (apenas Mac), ou ainda diretamente de um celular utilizando o aplicativo [Expo Go (PlayStore)](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&pli=1) / [ExpoGo (AppStore)](https://apps.apple.com/br/app/expo-go/id982107779). Para utilizar o aplicativo no celular basta escanear o qrcode que será gerado no terminal rodando em ```src\bora-app```.
