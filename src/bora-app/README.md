# bora-app

- Esse é o diretório onde está contido o front-end do projeto feito em React Native js.

## Estrutura de Pastas

```bash
bora-app/
├── src/                           # Código da aplicação
│   ├── assets/                    # Imagens, fontes, ícones, sons, etc.
│   ├── components/                # Componentes reutilizáveis
│   ├── screens/                   # Telas completas do app
│   ├── navigation/                # Configurações de rotas
│   ├── services/                  # Comunicação com o backend (ex: axios)
│   ├── store/                     # Gerenciamento de estado (Context API, Redux, Zustand)
│   ├── utils/                     # Funções utilitárias/ajudantes
│   ├── constants/                 # Cores, strings, tamanhos, caminhos fixos
│   └── App.js                     # Arquivo principal do app (registrado no index.js)
│
├── .expo/                         # Configurações locais criadas pelo Expo (não mexer aqui)
├── .gitignore                     # Arquivos/pastas que o Git deve ignorar
├── app.json                       # Configurações do app no Expo (nome, ícone, splash screen)
├── index.js                       # Ponto de entrada que carrega o App.js
├── package.json                   # Declara dependências e scripts do projeto
├── babel.config.js                # Configuração para a utilização de arquivos .env
└── package-lock.json              # Travamento das versões das dependências
```

## Utilização

### Instalação de dependências

```bash
$ npm install
```

### Configuração do .env**

- Renomeio o arquivo '.env.example' para '.env', na raiz do diretório bora-app, e substitua o texto '(coloque-o-seu-ip-aqui)' por seu IP de rede.

### Rodando o projeto
- Abra um terminal na pasta raiz do diretório bora-app e execute o comando 'npm expo start'. Abra o sistema em seu emulador ou em seu dispositivo móvel.

