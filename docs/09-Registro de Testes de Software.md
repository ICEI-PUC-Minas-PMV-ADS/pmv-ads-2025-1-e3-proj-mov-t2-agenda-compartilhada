# Registro de Testes de Software

**Informações Gerais:**

* **Data:** 09/05/2025
* **Responsável pelos Testes:** Yasmim Nunes
* **Versão da Aplicação Testada:** 1.0.0 (Frontend)
* **Backend:** Finalizado
* **Plano de Testes:** Home-dashboard, MyGroups, CreateGroup e GroupDetails

---

## Caso de Teste 1: Home-dashboard – Exibição de Eventos e Grupos

**Requisitos Referentes:** Tela Home-dashboard  
**Descrição:** Verificar se a tela inicial apresenta corretamente a saudação, os cards de “Próximos eventos” e os círculos de “Meus grupos”, usando dados do banco de dados, e se permite navegar para detalhes.  
**Objetivo do Teste:** Assegurar que o frontend exiba e navegue corretamente, integrado ao backend.

**Passos:**

1. Abrir o aplicativo e aguardar carregamento da Home-dashboard.
2. Confirmar exibição da saudação com nome do usuário.
3. Verificar cards de “Próximos eventos”.
4. Tocar em um card de evento.
5. Verificar círculos de “Meus grupos”.
6. Tocar em um círculo de grupo.

**Critérios de Êxito:**

* Saudação mostra corretamente o nome do usuário cadastrado.
* Cada card de evento exibe data, hora, título e grupo conforme evento cadastrado no banco de dados.
* Ao tocar no card, a navegação de frontend exibe um modal com os detalhes do evento.
* Cada círculo de grupo exibe iniciais e nome conforme dados cadastrados no sistema.
* Ao tocar no círculo, a navegação de frontend ocorre para GroupScreen.

**Resultados:**

* Passos 1–6: **Aprovado**
  
![Home-dashboard 2025-05-05 at 11.06.01.png](img/Home-dashboard%202025-05-05%20at%2011.06.01.png)

---

## Caso de Teste 2: MyGroups – Listagem, Busca e Criação de Grupos

**Requisitos Referentes:** Tela MyGroups  
**Descrição:** Verificar listagem das seções “Grupos que administro” e “Grupos que participo”, funcionamento da busca por nome, e botão “Criar Grupo” navegando ao formulário.  
**Objetivo do Teste:** Garantir que o frontend filtre, liste e navegue corretamente com backend.

**Passos:**

1. Navegar até a tela MyGroups.
2. Confirmar exibição dos grupos em ambas as seções.
3. Digitar parte do nome de um grupo na barra de busca.
4. Tocar no botão “Criar Grupo”.
5. Tocar em um card de grupo listado.

**Critérios de Êxito:**

* Ambas as seções mostram corretamente os grupos que o usuário faz parte.
* A lista filtra conforme o termo digitado.
* “Criar Grupo” navega para CreateGroup.
* Tocar em grupo navega para GroupScreen.

**Resultados:**

* Passos 1–5: **Aprovado** (busca, listagem e navegação do frontend e backend OK)
  
![MeusGrupos 2025-05-05 at 11.06.56.png](img/MeusGrupos%202025-05-05%20at%2011.06.56.png)

---

## Caso de Teste 3: CreateGroup – Formulário de Criação de Grupo

**Requisitos Referentes:** Tela CreateGroup
**Descrição:** Verificar campos do formulário de criação de grupo (nome, descrição, convite e foto opcional), submissão e retorno à MyGroups, salvando so dados no banco de dados.  
**Objetivo do Teste:** Assegurar funcionalidade completa do formulário no frontend e backend funcionando perfeitamente.

**Passos:**

1. Navegar até a tela CreateGroup.
2. Preencher “Nome do grupo” com texto válido.
3. Preencher “Descrição” com até 4 linhas.
4. Inserir email ou usuário em “Convidar membros”.
5. (Opcional) Tocar em “Adicionar foto” e escolher imagem.
6. Tocar em “Criar Grupo”.

**Critérios de Êxito:**

* Todos os campos aceitam e exibem corretamente os valores.
* Preview de imagem aparece quando escolhido.
* Após “Criar Grupo”, o frontend navega de volta para MyGroups.

**Resultados:**

* Passos 1–6: **Aprovado** (formulário e navegação OK, grupo criado com sucesso no backend)

![CriarGrupo 2025-05-05 at 11.07.12.png](img/CriarGrupo%202025-05-05%20at%2011.07.12.png)

---

## Caso de Teste 4: GroupDetails – Visualização e Ações de Grupo

**Requisitos Referentes:** Tela GroupDetails  
**Descrição:** Verificar exibição de detalhes do grupo (avatar, nome, membros), listas de eventos e membros, menu de contexto e botão “Novo Evento”.  
**Objetivo do Teste:** Garantir que o frontend apresente todas as informações e ações do backend  disponível.

**Passos:**

1. Abrir GroupDetails de algum dos grupos.
2. Confirmar exibição de avatar, nome e quantidade de membros.
3. Verificar cards de “Próximos Eventos” e tocar em um.
4. Verificar lista de membros e status.
5. Tocar no ícone de menu (⋮) e visualizar opções.
6. Selecionar cada opção do menu e analisar navegação ou ação de frontend.
7. Tocar em “Novo Evento”.

**Critérios de Êxito:**

* Avatar, nome e membros exibidos conforme backend.
* Cards de eventos exibem dados corretos e exibem o modal.
* Membros mostram status (Administrador/Membro).
* Menu de contexto abre com todas as opções e cada opção dispara a ação de frontend (navegação/modal).
* “Novo Evento” navega para formulário de evento.

**Resultados:**

* Passos 1–7: **Aprovado** (frontend e backend exibiu e executou ações )
  
![DetalhesGrupos 2025-05-05 at 11.07.23.png](img/DetalhesGrupos%202025-05-05%20at%2011.07.23.png)

* Vídeo de registro de teste mostrando as seguintes telas Home-dashboard, meus grupos,criar grupo e detalhes do grupo;  

https://github.com/user-attachments/assets/00862bd8-db0b-4ce8-8af6-69886bd8d457

---

**Informações Gerais:**

* **Data:** 10/05/2025 e 25/05/2025
* **Responsável pelos Testes:** Grace Santos
* **Versão da Aplicação Testada:** 1.0.0
* **Plano de Testes:** Perfil e Convite de Grupo

---

## Caso de Teste 5: Visualização de Perfil

**Requisitos Referentes:** Tela Perfil.  
**Descrição:** A tela de perfil deve exibir corretamente todas as informações do usuário, incluindo nome e foto de perfil.  
**Objetivo do Teste:** Garantir que o usuário visualize corretamente seus dados de perfil.  

**Critérios de Êxito:**

* A tela deve exibir a foto ou imagem circular com iniciais do usuário caso não tenha foto.
* A tela deve exibir corretamente o nome do usuário.
* A aba Perfil deve exibir as informações do usuário e o botão de edição.

**Resultados:**
**Aprovado**

<img width="426" alt="perfil1" src="https://github.com/user-attachments/assets/b4ed7620-5506-4035-b0a7-cbad700cfd17" />

---

## Caso de Teste 6: Edição de Informações do Perfil

**Requisitos Referentes:** Tela Perfil  
**Descrição:** A funcionalidade de edição de perfil permitiu alterar o nome do usuário corretamente. Após salvar, as alterações foram refletidas na tela de visualização do perfil.  
**Objetivo do Teste:** Assegurar que o usuário consiga modificar seus dados de perfil sem problemas.

**Critérios de Êxito:**

* A mensagem de confirmação após salvar as alterações é clara e informativa.

**Resultados:**
**Aprovado**

https://github.com/user-attachments/assets/e1bb9d6d-0210-42d6-9f1a-6a1f2f120ff9

---

## Caso de Teste 7: Upload de foto de perfil  

**Requisitos Referentes:** Tela Perfil  
**Descrição:** A funcionalidade de edição de perfil permitiu alterar a foto do usuário corretamente. Após salvar, as alterações foram refletidas na tela de visualização do perfil.  
**Objetivo do Teste:** Assegurar que o usuário consiga atualizar sua foto de perfil.

**Critérios de Êxito:**

* A mensagem de confirmação após salvar as alterações é clara e informativa.

**Resultados:**
**Aprovado**

https://github.com/user-attachments/assets/ef92d294-544d-4463-98ae-1c4fffee0cd1

---

## Caso de Teste 8: Alteração de Senha

**Requisitos Referentes:** Tela Perfil.
**Descrição:** A funcionalidade de edição de perfil permitiu alterar a senha do usuário. Após salvar, a mensagem "Sua senha foi alterada com sucesso!" foi exibida.
**Objetivo do Teste:** Assegurar que o usuário consiga atualizar a senha para acesso ao aplicativo corretamente.

**Critérios de Êxito:**

* Após fazer logout e tentar login com a nova senha, o login realizado com sucesso.

**Resultados:**
**Aprovado**

https://github.com/user-attachments/assets/8c35504b-215b-420b-9601-8fa24770da5a

---

## Caso de Teste 9: Envio de Convite de Grupo por Nome de Usuário

**Requisitos Referentes:** Tela Perfil (frontend apenas)  
**Descrição:** A busca de usuários por nome funcionou corretamente. O usuário pôde ser selecionado e o convite foi enviado com sucesso.  
**Objetivo do Teste:** Assegurar que a funcionalidade de convite por nome de usuário funcione corretamente.

**Critérios de Êxito:**

* A busca é rápida e os resultados são precisos, mesmo com buscas parciais do nome.

**Resultados:**
**Aprovado**

https://github.com/user-attachments/assets/0d8a29da-ee75-4ff4-ad85-21f8cb1f2590

---

**Informações Gerais:**

* **Data:** 01/06/2025
* **Responsável pelos Testes:** Milton Ventura
* **Versão da Aplicação Testada:** 1.0.0
* **Plano de Testes:** Visualização da agenda compartilhada

---

## Caso de Teste 10: Visualizar eventos em agendas compartilhadas

**Requisitos Referentes:** RF 09 - Visualização de eventos em agendas compartilhadas  
**Descrição:** Verificar se o sistema permite a visualização dos eventos presentes na agenda compartilhada  
**Objetivo do Teste:** Garantir que os eventos do grupo serão exibidos de forma clara

**Passos:**

1. Acessar a tela de um grupo
2. Verificar datas marcadas no grupo
3. Selecionar datas diversas
4. Analisar informações dos cards de eventos exibidos ao clicar em datas marcadas no grupo
5. Clicar no card de eventos marcados no grupo
6. Verificar informações do evento clicado

**Critérios de Êxito:**

* A tela do grupo deve exibir marcações para as datas que possuem eventos.
* Datas com vários eventos marcados no grupo devem estar sinalizadas
* Ao selecionar datas com eventos, os cards dos eventos devem ser exibidos
* O clique no card de um evento deve trazer um modal com os detalhes do evento

**Resultados:**

* Passos 1-4: **Aprovado** (frontend exibiu informações cadastradas no banco de dados e navegou conforme esperado)

https://github.com/user-attachments/assets/74383bac-32ed-4258-b8c2-9df378c562cc

---

## Caso de Teste 11: Criar e editar eventos e agendas compartilhadas

**Requisitos Referentes:** RF 10 - Criação, edição e exclusão de eventos em agendas compartilhadas  
**Descrição:** Verificar se o sistema permite a criação e edição de eventos em agendas compartilhadas  
**Objetivo do Teste:** Verificar se as criações e edições de evento ocorrerão normalmente  

**Passos:**

1. Acessar a tela de um grupo
2. Clicar no botão "+" para criação de novo evento de grupo
3. Preencher informações do evento
4. Clicar no botão para cadastrar o evento de grupo
5. Clicar sobre o card do evento cadastrado
6. Clicar no botão para editar o evento
7. Editar o evento e salvar
8. Checar se alterações serão exibidas após edição do evento de grupo

**Critérios de Êxito:**

* Deve-se exibir uma mensagem de confirmação de evento de grupo criado
* O evento de grupo deve aparecer marcado no calendário do grupo
* Ao selecionar um evento deve-se exibir informações do evento
* As alterações realizadas no evento devem ser mostradas ao clicar no card do evento de grupo

**Resultados:**

* Passos 1-4: **Aprovado** (cadastro de evento de grupo realizado normalmente, frontend exibiu informações e navegou conforme esperado)

https://github.com/user-attachments/assets/74383bac-32ed-4258-b8c2-9df378c562cc

* Passos 5-8: **Reprovado** (frontend não exibiu os botões para editar e excluir as informações do evento)

---

## Caso de Teste 12: Sugerir datas baseada na disponibilidade dos participantess

**Requisitos Referentes:** RF 12 - Sugestão automática de datas baseada na disponibilidade dos participantes  
**Descrição:** Verificar se o sistema sugere melhores datas para marcação de eventos em agendas compartilhadas  
**Objetivo do Teste:** Verificar se ao acessar a tela de um grupo, as melhores datas para marcação de eventos serão perceptíveis

**Passos:**

1. Acessar a tela de um grupo
2. Observar se o calendário do grupo sugere melhores datas para marcação de evento

**Critérios de Êxito:**

* O calendário do grupo deve auxiliar na escolha de uma data para marcação de evento utilizando cores para distinguir as datas

**Resultados:**

* Passos 1-2: **Aprovado** (tela de grupo exibe marcações vermelhas e amarelas para dias onde o os membros possuem compromissos marcados fora do grupo)

https://github.com/user-attachments/assets/74383bac-32ed-4258-b8c2-9df378c562cc

---
**Informações Gerais:**

* **Data:** 31/05/2025
* **Responsável pelos Testes:** Nikolas Victor Mota
* **Versão da Aplicação Testada:** 1.0.0  
* **Plano de Testes:** Cadastro, Login e Notificações

---

## Caso de Teste 13: Cadastro

**Requisitos Referentes:** RF 01 - Sistema de cadastro e login de usuários (email/senha ou redes sociais)  
**Descrição:** O usuário deve conseguir criar uma nova conta no sistema através da tela de cadastro  
**Objetivo do Teste:** Garantir que o sistema de cadastro esteja funcionando corretamente  

**Passos:**

1. Acessar a tela de Cadastro
2. Inserir suas credenciais
3. Clicar em cadastrar

**Critérios de Êxito:**

* Um movo usuário e um novo perfil são criados no banco de dados.
* O usuário é direcionado para a tela de login.
* O usuário consegue realizar login usando as credenciais cadastradas.  

**Resultados:**

* Passos 1-3: **Aprovado**
  
https://github.com/user-attachments/assets/c67ee91a-dce3-40a8-8f53-f5b2ddf21414

---

## Caso de Teste 14: Login

**Requisitos Referentes:** RF 01 - Sistema de cadastro e login de usuários (email/senha ou redes sociais) <br/>
**Descrição:**
O usuário deve conseguir criar uma sessão e acessar os seus dados ao inserir suas credenciais na tela de login<br/>
**Objetivo do Teste:**
Garantir que o usuário consiga realizar login no sistema<br/>

**Passos:**

1. Acessar a tela de login
2. Inserir seu email
3. Inserir sua senha
4. Clicar em conectar

**Critérios de Êxito:**

* Uma sessão é criada.
* O usuário é direcionado para a tela home.
* O usuário tem acesso aos seus dados registrados no sistema.

**Resultados:**

* Passos 1-4: **Aprovado**
  
https://github.com/user-attachments/assets/fba4ba51-9280-468e-ad63-2cae975d49af

---

## Caso de Teste 15: Notificações

**Requisitos Referentes:** RF15 - Notificações de novos eventos compartilhados e RF16 - Notificações de alterações em eventos existentes <br/>
**Descrição:**
O usuário deve ter acesso a suas notificações geradas pelo sistema<br/>
**Objetivo do Teste:**
Garantir que o usuário consiga visualizar e gerenciar suas notificações<br/>

**Passos:**

1. Acessar a tela de notificações
2. Visualizar uma notificação
3. Excluir uma notificação

**Critérios de Êxito:**

* O usuário consegue receber notificações.
* O usuário consegue visualizar suas notificações.
* O usuário consegue excluir suas notificações.

**Resultados:**

* Passos 1-3: **Aprovado**

https://github.com/user-attachments/assets/79574b53-613b-4733-9ee3-3c91d97292f2

**Informações Gerais:**

* **Data:** 01/06/2025
* **Responsável pelos Testes:** Daianne Paula Moreira Pinto
* **Versão da Aplicação Testada:** 1.0.0 (Frontend)
* **Backend:** em desenvolvimento 
* **Plano de Testes:** Visualização do Calendário Individual e criação de evento
  
---

## Caso de Teste 16: Calendário individual

**Requisitos Referentes:** Visualização de Calendário individual em formato mensal <br/>
**Descrição:**
O usuário deve conseguir visualizar os eventos em um calendário individual em formato mensal ao clicar no dia<br/>
**Objetivo do Teste:**
Garantir que o usuário consiga visualizar os eventos em seu calendário individual, logado em seu perfil<br/>

**Passos:**

1. Acessar a tela de calendário na tab navigator
2. Clicar em um dia que possua evento;
3. Visualizar na mesma tela o evento agendado para aquele dia, que estará destacado com um pontinho verde

**Critérios de Êxito:**

* O calendário deve ser exibido em formato mensal, com os eventos do usuário logado carregados automaticamente.
* Dias com eventos devem ser destacados com um pontinho verde.
* Ao clicar em um dia com evento, ele deve ser exibido na mesma tela, sem redirecionamento.
* Os eventos exibidos devem ser exclusivos do usuário logado.
* A resposta ao clique deve ser rápida (sem travamentos) e sem erros visuais.

**Resultados:**

* Passos 1-3: **Aprovado**
  
https://github.com/user-attachments/assets/13f65c23-a060-44b1-a5f1-3d891ee877ae

---

## Caso de Teste 17: Criação, edição e exclusão de de eventos individuais

**Requisitos Referentes:** Criação, edição e exclusão de eventos individuais <br/>
**Descrição:**
O usuário deve conseguir criar eventos individuais, que constarão apenas em sua agenda, editar estes eventos e excluir.<br/>
**Objetivo do Teste:**
Garantir que o usuário consiga criar, editar e excluir eventos individuais, logado em seu perfil<br/>

**Passos:**

1. Acessar a tela de eventos na tab navigator;
2. Preencher o título, descrição, data, hora e duração do evento;
3. Clicar em "próximo". Procedimento que criará o evento no banco de dados e alimentará a listagem de eventos e também o calendário individual;
4. Possibilidade de edição do evento;
5. Possibilidade de exclusão do evento.

**Critérios de Êxito:**

* Criação bem-sucedida:  
O evento foi salvo corretamente no banco de dados após o clique em "próximo".
* Persistência e listagem:  
O evento criado apareceu na listagem de eventos do usuário logado.
* Integração com o calendário:  
O evento refletiu corretamente no calendário individual, com marcação visual na data correspondente (ex: pontinho verde).
* Edição funcional:  
O usuário deve conseguir editar o evento, e as alterações devem ser refletidas tanto na listagem quanto no calendário.
* Exclusão funcional:  
O usuário deve conseguir excluir o evento, e ele deve ser removido tanto da listagem quanto do calendário.
* Escopo individual:  
O evento deve estar vinculado exclusivamente ao usuário logado, sem aparecer para outros usuários.

**Resultados:**

* Passos 1-3: **Aprovado**

* Passos 4-5: Não há implementação dessas duas funcionalidades **Reprovado**
  
https://github.com/user-attachments/assets/13f65c23-a060-44b1-a5f1-3d891ee877ae

---

**Informações Gerais:**

* **Data:** 01/06/2025
* **Responsável pelos Testes:** Leticia Moreira Pinto
* **Versão da Aplicação Testada:** 1.0.0 (Frontend)
* **Backend:** em desenvolvimento  
* **Plano de Testes:** Visualização  

---

## Caso de Teste 18: Listagem de eventos

**Requisitos Referentes:** Visualização de eventos em agendas individuais e compartilhadas <br/>
**Descrição:**
O usuário deve conseguir visualizar eventos individuais e de grupos.<br/>
**Objetivo do Teste:**
Garantir que o usuário visualizar uma lista de eventos individuais e de grupos, logado em seu perfil<br/>

**Passos:**

1. Acessar a tela de eventos na tab navigator;
2. Preencher o título, descrição, data, hora e duração do evento;
3. Clicar em "próximo". Procedimento que criará o evento no banco de dados e alimentará a listagem de eventos e também o calendário individual;
4. Visualizar o evento criado na lista de eventos.

**Critérios de Êxito:**

* O usuário logado visualiza corretamente seus eventos individuais e de grupos;
* Os eventos são identificáveis por tipo (ícone);
* A listagem exibe título, data, hora e tipo;
* O evento aparece na lista após ser criado, sem erros;
* Os dados são recuperados corretamente do banco.

**Resultados:**

* Passos 1-4: **Aprovado**

https://github.com/user-attachments/assets/d6918f0b-8ee4-47a6-a407-46475d3d0616
