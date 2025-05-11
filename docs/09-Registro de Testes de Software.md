# Registro de Testes de Software


**Ajustando o Registro de Testes**

O usuário quer que o Registro de Testes de Software seja revisado, com a inclusão de uma observação informando que o backend ainda está sendo desenvolvido em todas as telas já feitas para o frontend. Para cada caso de teste, vamos adicionar uma nota, como "APIs de backend ainda em desenvolvimento" ou "Backend ainda em desenvolvimento; testes de integração pendentes". Dessa forma, o registro manterá a estrutura, mas refletirá o status atual do backend para os testes.



# Registro de Testes de Software

**Informações Gerais:**

* **Data:** 09/05/2025
* **Responsável pelos Testes:** Yasmim Nunes
* **Versão da Aplicação Testada:** 1.0.0 (Frontend)
* **Backend:** em desenvolvimento 
* **Plano de Testes:** Home-dashboard, MyGroups, CreateGroup e GroupDetails

---

## Caso de Teste 1: Home-dashboard – Exibição de Eventos e Grupos

**Requisitos Referentes:** Tela Home-dashboard (frontend apenas)<br/>
**Descrição:**
Verificar se a tela inicial apresenta corretamente a saudação, os cards de “Próximos eventos” e os círculos de “Meus grupos”, usando dados mockados, e se permite navegar para detalhes.<br/>
**Objetivo do Teste:**
Assegurar que o frontend exiba e navegue corretamente, mesmo sem integração com o backend final.

**Passos:**

1. Abrir o aplicativo e aguardar carregamento da Home-dashboard.
2. Confirmar exibição da saudação com nome do usuário (mock).
3. Verificar cards de “Próximos eventos” (dados mockados).
4. Tocar em um card de evento.
5. Verificar círculos de “Meus grupos” (dados mockados).
6. Tocar em um círculo de grupo.

**Critérios de Êxito:**

* Saudação mostra corretamente o nome mockado.
* Cada card de evento exibe data, hora, título e grupo conforme mock.
* Ao tocar no card, a navegação de frontend ocorre para GroupDetails.
* Cada círculo de grupo exibe iniciais e nome conforme mock.
* Ao tocar no círculo, a navegação de frontend ocorre para GroupDetails.

**Resultados:**

* Passos 1–6: **Aprovado** (frontend exibiu e navegou conforme esperado)
  
![Home-dashboard 2025-05-05 at 11.06.01.png](img/Home-dashboard%202025-05-05%20at%2011.06.01.png)

**Observações de Backend:**

* Integração com APIs de eventos e grupos pendente; 

---

## Caso de Teste 2: MyGroups – Listagem, Busca e Criação de Grupos

**Requisitos Referentes:** Tela MyGroups (frontend apenas)<br/>
**Descrição:**
Verificar listagem das seções “Grupos que administro” e “Grupos que participo”, funcionamento da busca por nome, e botão “Criar Grupo” navegando ao formulário, tudo com dados mockados.<br/>
**Objetivo do Teste:**
Garantir que o frontend filtre, liste e navegue corretamente sem backend.

**Passos:**

1. Navegar até a tela MyGroups.
2. Confirmar exibição dos grupos mockados em ambas as seções.
3. Digitar parte do nome de um grupo na barra de busca.
4. Tocar no botão “Criar Grupo”.
5. Tocar em um card de grupo listado.

**Critérios de Êxito:**

* Ambas as seções mostram corretamente os grupos mockados.
* A lista filtra conforme o termo digitado (mock).
* “Criar Grupo” navega para CreateGroup.
* Tocar em grupo navega para GroupDetails.

**Resultados:**

* Passos 1–5: **Aprovado** (busca, listagem e navegação do frontend OK)
  
![MeusGrupos 2025-05-05 at 11.06.56.png](img/MeusGrupos%202025-05-05%20at%2011.06.56.png)

**Observações de Backend:**

* API de listagem e busca de grupos está em desenvolvimento; 

---

## Caso de Teste 3: CreateGroup – Formulário de Criação de Grupo

**Requisitos Referentes:** Tela CreateGroup (frontend apenas)<br/>
**Descrição:**
Verificar campos do formulário de criação de grupo (nome, descrição, convite e foto opcional), submissão e retorno à MyGroups, usando mocks de submissão.<br/>
**Objetivo do Teste:**
Assegurar funcionalidade completa do formulário no frontend, apesar da API de criação ainda não estar pronta.

**Passos:**

1. Navegar até a tela CreateGroup.
2. Preencher “Nome do grupo” com texto válido.
3. Preencher “Descrição” com até 4 linhas.
4. Inserir email ou usuário em “Convidar membros”.
5. (Opcional) Tocar em “Adicionar foto” e escolher imagem mockada.
6. Tocar em “Criar Grupo”.

**Critérios de Êxito:**

* Todos os campos aceitam e exibem corretamente os valores.
* Preview de imagem aparece quando escolhido.
* Após “Criar Grupo”, o frontend navega de volta para MyGroups.

**Resultados:**

* Passos 1–6: **Aprovado** (formulário e navegação OK)
* 
![CriarGrupo 2025-05-05 at 11.07.12.png](img/CriarGrupo%202025-05-05%20at%2011.07.12.png)

**Observações de Backend:**

* Endpoint POST /groups em desenvolvimento; 

---

## Caso de Teste 4: GroupDetails – Visualização e Ações de Grupo

**Requisitos Referentes:** Tela GroupDetails (frontend apenas)<br/>
**Descrição:**
Verificar exibição de detalhes do grupo (avatar, nome, membros), listas de eventos e membros, menu de contexto e botão “Novo Evento”, com dados mockados.<br/>
**Objetivo do Teste:**
Garantir que o frontend apresente todas as informações e ações, mesmo sem backend disponível.

**Passos:**

1. Abrir GroupDetails para um grupo mockado.
2. Confirmar exibição de avatar, nome e quantidade de membros (mock).
3. Verificar cards de “Próximos Eventos” (mock) e tocar em um.
4. Verificar lista de membros e status (mock).
5. Tocar no ícone de menu (⋮) e visualizar opções.
6. Selecionar cada opção do menu e analisar navegação ou ação de frontend.
7. Tocar em “Novo Evento”.

**Critérios de Êxito:**

* Avatar, nome e membros exibidos conforme mock.
* Cards de eventos exibem dados corretos e navegam no frontend.
* Membros mostram status (Administrador/Membro).
* Menu de contexto abre com todas as opções e cada opção dispara a ação de frontend (navegação/modal).
* “Novo Evento” navega para formulário de evento.

**Resultados:**
* Passos 1–7: **Aprovado** (frontend exibiu e executou ações mockadas)
* 
![DetalhesGrupos 2025-05-05 at 11.07.23.png](img/DetalhesGrupos%202025-05-05%20at%2011.07.23.png)

**Observações de Backend:**

* Endpoints de detalhes de grupo, eventos e membros pendentes; 

---

# Registro de Testes de Software

**Informações Gerais:**

* **Data:** 10/05/2025
* **Responsável pelos Testes:** Grace Santos
* **Versão da Aplicação Testada:** 1.0.0 (Frontend)
* **Backend:** em desenvolvimento 
* **Plano de Testes:** Perfil e Convite de Grupo

---

## Caso de Teste 5: Visualização de Perfil

**Requisitos Referentes:** Tela Perfil (frontend apenas)<br/>
**Descrição:**
A tela de perfil exibiu corretamente todas as informações do usuário, incluindo nome e foto de perfil. A interface está de acordo com o design proposto.<br/>
**Objetivo do Teste:**
Garantir que o usuário visualize corretamente seus dados de perfil.

**Critérios de Êxito:**
* Todos os critérios de êxito foram atendidos sem problemas.

**Resultados:**
**Aprovado**

<img width="251" alt="Gerenciamento do perfil do usuário3" src="https://github.com/user-attachments/assets/cfb3f919-1421-4e87-af3e-b73c4af1ea2c" />


## Caso de Teste 6: Edição de Informações do Perfil

**Requisitos Referentes:** Tela Perfil (frontend apenas)<br/>
**Descrição:**
A funcionalidade de edição de perfil permitiu alterar o nome do usuário corretamente. Após salvar, as alterações foram refletidas na tela de visualização do perfil.<br/>
**Objetivo do Teste:**
Assegurar que o usuário consiga modificar seus dados de perfil sem problemas.

**Critérios de Êxito:**
* A mensagem de confirmação após salvar as alterações é clara e informativa.

**Resultados:**
**Aprovado**


https://github.com/user-attachments/assets/695887af-f20b-48dc-8db4-712668ba1b9a



## Caso de Teste 7: Envio de Convite de Grupo por Nome de Usuário

**Requisitos Referentes:** Tela Perfil (frontend apenas)<br/>
**Descrição:**
A busca de usuários por nome funcionou corretamente. O usuário pôde ser selecionado e o convite foi enviado com sucesso.<br/>
**Objetivo do Teste:**
Assegurar que a funcionalidade de convite por nome de usuário funcione corretamente.

**Critérios de Êxito:**
* A busca é rápida e os resultados são precisos, mesmo com buscas parciais do nome.

**Resultados:**
**Aprovado**


https://github.com/user-attachments/assets/0d8a29da-ee75-4ff4-ad85-21f8cb1f2590

---

# Registro de Testes de Software

**Informações Gerais:**

* **Data:** 11/05/2025
* **Responsável pelos Testes:** Milton Ventura
* **Versão da Aplicação Testada:** 1.0.0 (Frontend)
* **Backend:** em desenvolvimento 
* **Plano de Testes:** Visualização da agenda compartilhada

---

## Caso de Teste 8: Visualizar eventos em agendas compartilhadas

**Requisitos Referentes:** RF 09 - Visualização de eventos em agendas compartilhadas (frontend apenas) <br/>
**Descrição:**
Verificar se o sistema permite a visualização dos eventos presentes na agenda compartilhada<br/>
**Objetivo do Teste:**
Garantir que os eventos do grupo serão exibidos de forma clara

**Passos:**
1. Acessar a tela de um grupo
2. Verificar datas marcadas no grupo
3. Selecionar datas diversas
4. Analisar informações dos cards de eventos exibidos ao clicar em datas marcadas no grupo
5. Clicar no card de eventos marcados no grupo
6. Verificar informações do evento clicado

**Critérios de Êxito:**

* A tela do grupo exibe marcações para as datas que possuem eventos.
* Datas com vários eventos marcados no grupo são sinalizadas
* Ao selecionar datas com eventos, os cards dos eventos são exibidos
* O clique no card de um evento não exibe as informações do evento

**Resultados:**

* Passos 1-4: **Aprovado** (frontend exibiu informações e navegou conforme esperado)
  
![image](https://github.com/user-attachments/assets/8dbf3ff7-50c4-4553-8de8-3e94350477bf)

![image](https://github.com/user-attachments/assets/8e5c5239-a7c2-4798-b465-1f3fd5945cb1)

* Passos 5-6: **Reprovado** (frontend não exibiu informações do evento clicado)

**Observações de Backend:**

* Integração com APIs de eventos e grupos pendente; 



















