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
└── package-lock.json              # Travamento das versões das dependências