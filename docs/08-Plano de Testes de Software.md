# Plano de Testes de Software

| **Caso de Teste 1: Home-dashboard – Exibição de Eventos e Grupos** |                                                                                                                                                               |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Requisito Referente**                                            | RF 01 - Tela Home-dashboard                                                                                                                                           |
| **Descrição**                                                      | Verificar se a tela Home-dashboard exibe corretamente a saudação, os cards de “Próximos eventos” e a lista “Meus grupos”, e se permite navegar para detalhes. |
| **Objetivo do Teste**                                              | Assegurar que o usuário visualize e acesse eventos e grupos a partir da tela principal.                                                                       |
| **Passos**                                                         | **Critérios de Êxito**                                                                                                                                        |
| 1. Abrir o aplicativo e aguardar carregamento da Home-dashboard.   | 1. A saudação com o nome do usuário aparece corretamente.                                                                                                     |
| 2. Observar a seção “Próximos eventos” e seus cards.               | 2. Cada card mostra data, hora, título e nome do grupo.                                                                                                       |
| 3. Clicar em um card de evento.                                    | 3. O app navega para a tela GroupDetails (ou tela de detalhes equivalente) do evento selecionado.                                                             |
| 4. Observar a seção “Meus grupos” com círculos de grupo.           | 4. Cada círculo exibe iniciais e nome do grupo corretamente.                                                                                                  |
| 5. Clicar em um círculo de grupo.                                  | 5. O app navega para a tela GroupDetails com o parâmetro groupId correto.                                                                                     |

| **Caso de Teste 2: MyGroups – Listagem, Busca e Criação de Grupos** |                                                                                                                                              |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Requisito Referente**                                             | RF 02 - Tela MyGroups                                                                                                                                |
| **Descrição**                                                       | Verificar a listagem das seções “Grupos que administro” e “Grupos que participo”, o funcionamento da barra de busca e o botão “Criar Grupo”. |
| **Objetivo do Teste**                                               | Garantir filtragem, navegação e acesso ao fluxo de criação de grupos.                                                                        |
| **Passos**                                                          | **Critérios de Êxito**                                                                                                                       |
| 1. Navegar à tela MyGroups.                                         | 1. Ambas as seções (“administro” e “participo”) exibem cards de grupos.                                                                      |
| 2. Digitar parte do nome de um grupo na barra de busca.             | 2. A lista filtra apenas os grupos cujo nome contém o termo digitado.                                                                        |
| 3. Clicar no botão “Criar Grupo”.                                   | 3. O app navega para a tela CreateGroup.                                                                                                     |
| 4. Clicar em um card de grupo listado.                              | 4. O app navega para a tela GroupDetails com o groupId correto.                                                                              |

| **Caso de Teste 3: CreateGroup – Formulário de Criação de Grupo** |                                                                                                           |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Requisito Referente**                                           | RF 03 - Tela CreateGroup                                                                                          |
| **Descrição**                                                     | Verificar campos do formulário, validações e comportamento ao submeter a criação de um novo grupo.        |
| **Objetivo do Teste**                                             | Assegurar que o usuário preencha nome, descrição, convide membros e retorne à lista de grupos após criar. |
| **Passos**                                                        | **Critérios de Êxito**                                                                                    |
| 1. Preencher “Nome do grupo” com texto válido.                    | 1. Campo aceita e exibe o texto corretamente.                                                             |
| 2. Preencher “Descrição” com até 4 linhas de texto.               | 2. Texto aparece no campo multiline sem truncar.                                                          |
| 3. Inserir um email ou nome de usuário em “Convidar membros”.     | 3. Valor é aceito e mantido no input.                                                                     |
| 4. (Opcional) Tocar em “Adicionar foto” e selecionar imagem.      | 4. Seletor de imagem é exibido e preview aparece no placeholder.                                          |
| 5. Clicar em “Criar Grupo”.                                       | 5. Mensagem de sucesso (ou navegação silenciosa) e retorno à tela MyGroups.                               |

| **Caso de Teste 4: GroupDetails – Visualização e Ações de Grupo** |                                                                                                                                      |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Requisito Referente**                                           | RF 04 - Tela GroupDetails                                                                                                                    |
| **Descrição**                                                     | Verificar exibição dos detalhes do grupo, lista de eventos e de membros, funcionamento do menu de contexto e do botão “Novo Evento”. |
| **Objetivo do Teste**                                             | Garantir que o usuário veja informações completas do grupo e realize as ações esperadas.                                             |
| **Passos**                                                        | **Critérios de Êxito**                                                                                                               |
| 1. Abrir GroupDetails para um grupo existente.                    | 1. Avatar, nome do grupo e contagem de membros aparecem corretamente.                                                                |
| 2. Observar seção “Próximos Eventos” com cards de evento.         | 2. Cada card mostra data, nome e local; ao tocar, navega para detalhes do evento.                                                    |
| 3. Observar seção “Membros” com cards de membro e status.         | 3. Cada membro exibe iniciais, nome e “Administrador” ou “Membro” corretamente.                                                      |
| 4. Tocar no ícone de menu (⋮) para abrir o menu de contexto.      | 4. Modal exibe opções: “Editar grupo”, “Adicionar membros”, “Silenciar notificações” e “Sair do grupo”.                              |
| 5. Selecionar cada opção de menu e confirmar navegação/ação.      | 5. Cada ação leva à tela ou executa a operação esperada (ex.: abrir edição, abrir convite, silenciar, sair).                         |
| 6. Clicar em “Novo Evento”.                                       | 6. O app navega para a tela de criação de evento correspondente.                                                                     |


| **Caso de Teste 5: GroupDetails – Visualização de Perfil** |                                                                                                                                      |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Requisito Referente**                                           | RF 05 - Exibição do perfil de usuário                                                                                                                    |
| **Descrição**                                                     | Verificar se a tela de perfil exibe corretamente o nome do usuário, foto de perfil e demais informações cadastradas. |
| **Objetivo do Teste**                                             | Assegurar que o usuário visualize corretamente seus dados de perfil.                                             |
| **Passos**                                                        | **Critérios de Êxito**                                                                                                               |
| 1. Fazer login no aplicativo.                    | 1. Login é realizado com sucesso.                                                               |
| 2. Navegar até a seção de perfil através do menu principal.       | 2. A tela de perfil é carregada sem erros.                                      |
| 3. Observar as informações exibidas na tela de perfil.            | 3. Nome do usuário é exibido corretamente.                                      |
| 4. Observar as demais informações do perfil.                      | 4. Todas as informações cadastradas são exibidas conforme esperado.             |               


| **Caso de Teste 6: Edição de Informações do Perfil** |                                                                                                                                      |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Requisito Referente**                                           | RF 06 - Edição de perfil de usuário                                                                                                                    |
| **Descrição**                                                     | Verificar se o usuário consegue editar suas informações de perfil e se as alterações são salvas corretamente. |
| **Objetivo do Teste**                                             | Assegurar que o usuário consiga modificar seus dados de perfil sem problemas.                                             |
| **Passos**                                                        | **Critérios de Êxito**                                                                                                               |
| 1.  Fazer login no aplicativo.                                    | 1. Login é realizado com sucesso.                               |
| 2. Navegar até a seção de perfil.         | 2.  A tela de perfil é carregada sem erros.                                           |
| 3. Clicar no botão de edição escrito: "Editar Perfil".     | 3. A tela de edição de perfil é aberta.                             |
| 4. Alterar o nome do usuário para um novo nome.      | 4. Campo aceita a digitação do novo valor.                              |
| 5. Salvar as alterações.      | 5. Uma mensagem de confirmação é exibida.                         |
| 6.  Retornar à tela de visualização do perfil.               | 6. O nome atualizado é exibido corretamente.                     |

| **Caso de Teste 7: Upload de Foto de Perfil** |                                                                                                                                      |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Requisito Referente**                                           | RF 07 - Upload de foto de perfil                                                                                                                    |
| **Descrição**                                                     | Verificar se o usuário consegue fazer upload e salvar uma nova foto de perfil. |
| **Objetivo do Teste**                                             | Assegurar que o usuário consiga atualizar sua foto de perfil.                                        |
| **Passos**                                                        | **Critérios de Êxito**                                                                                                               |
| 1.  Fazer login no aplicativo.                                    | 1. Login é realizado com sucesso.                               |
| 2. Navegar até a seção de perfil.         | 2.  A tela de perfil é carregada sem erros.                                           |
| 3. Tocar na área da foto de perfil ou no botão de alteração de foto.    | 3. Menu de opções de upload é exibido.                           |
| 4. Selecionar a opção "Galeria".      | 4. O seletor de imagens do dispositivo é aberto.                              |
| 5. Escolher uma nova imagem.    | 5. A imagem é selecionada e exibida para confirmação.                 |
| 6. Confirmar a seleção da imagem.          | 6. A nova foto é processada e salva como foto de perfil.                    |
| 7. Verificar a tela de perfil.          | 7. A nova foto é exibida no perfil do usuário.            |

| **Caso de Teste 8: Alteração de Senha** |                                                                                                                                      |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Requisito Referente**                                           | RF 08 - Alteração de Senha com Sucesso                                                                                                                |
| **Descrição**                                                     | Verificar se o usuário consegue alterar a senha se acesso ao perfil. |
| **Objetivo do Teste**                                             | Assegurar que o usuário consiga alterar a senha com sucesso.                                        |
| **Passos**                                                        | **Critérios de Êxito**                                                                                                               |
| 1.  Acessar o menu de perfil do usuário.    |1. Menu de perfil é exibido                      |
| 2. Selecionar a opção "Configurações" e em seguida "Alterar Senha"  | 2.  Tela de alteração de senha é carregada.                                       |
| 3. Inserir a senha atual no campo "Senha Atual"    | 3. Campo aceita a entrada.                      |
| 4. Inserir nova senha válida no campo "Nova Senha".      | 4. Campo aceita a entrada.                              |
| 5. Confirmar a nova senha no campo "Confirmar Nova Senha".   | 5. Campo aceita a entrada.                |
| 6. Clicar no botão "Alterar Senha".         | 6. Sistema processa a solicitação.            |
| 7. Verificar mensagem de confirmação.         | Mensagem "Senha alterada com sucesso" é exibida.   |
| 8. Fazer logout e tentar login com a nova senha.       | 8. Login realizado com sucesso.   |


| **Caso de Teste 9: Envio de Convite de Grupo por Nome de Usuário** |                                                                                                                                      |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Requisito Referente**                                           | RF 09 - Compartilhamento de agendas com outros usuários via email ou nome de usuário.     |
| **Descrição**                                                     | Verificar se o sistema permite enviar convites para novos membros buscando por nome de usuário. |
| **Objetivo do Teste**                                             | Assegurar que a funcionalidade de convite por nome de usuário funcione corretamente.   |
| **Passos**                                                        | **Critérios de Êxito**    |
| 1.  Navegar até a seção de convidar pessoas para grupos.          | 1. O botão "Selecionar Grupo" é exibido.                       |
| 2. Selecionar a opção "Selecionar Grupo"                          | 2.  Os detalhes do grupo existentes são carregados.                         |
| 3. Selecionar um grupo exixtente.     | 3. Os detalhes do grupo selecionado é exibido.'                             |
| 4. Selecionar a opção "Buscar Usuário".      | 4. Campo de busca é exibido.                          |
| 5. Digitar parte do nome de um usuário existente.     | 5. Sistema exibe resultados de busca correspondentes.     |
| 6.  Selecionar o usuário desejado na lista de resultados.             | 6. Usuário é selecionado.                     |
| 7.  Clicar no botão "Enviar Convites.             | 7. O Cconvite é enviado.                     |
| 8.  Clicar no botão "Enviar Convites.             | 8. Sistema confirma envio do convite com uma mensagem de sucesso.                    |



| **Caso de Teste 10: Visualizar eventos em agendas compartilhadas** |                                                                                                                                      |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Requisito Referente**                                           | RF 09 - Visualização de eventos em agendas compartilhadas     |
| **Descrição**                                                     | Verificar se o sistema permite a visualização dos eventos presentes na agenda compartilhada |
| **Objetivo do Teste**                                             | Verificar se todos os eventos estarão visíveis na tela de grupo   |
| **Passos**                                                        | **Critérios de Êxito**    |
| 1.  Acessar a tela de um grupo                                    | 1. A tela do grupo deve exibir os eventos e datas marcadas de eventos criados no grupo |
| 2. Verificar datas marcadas no grupo                              | 2. Caso existam vários eventos no mesmo dia, o scroll deve funcionar para que todos os eventos sejam visíveis   |
| 3. Selecionar datas diversas                                      | 3. Ao selecionar um evento deve-se exibir informações do evento  |
| 4. Analisar informações dos cards de eventos exibidos ao clicar em datas marcadas no grupo                          
| 5. Clicar no card de eventos marcados no grupo
| 6. Verificar informações do evento clicado


| **Caso de Teste 11: Criar e editar eventos e agendas compartilhadas** |                                                                                                                                      |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Requisito Referente**                                           | RF 10 - Criação, edição e exclusão de eventos em agendas compartilhadas     |
| **Descrição**                                                     | Verificar se o sistema permite a criação e edição de eventos em agendas compartilhadas |
| **Objetivo do Teste**                                             | Verificar se as criações e edições de evento ocorrerão normalmente   |
| **Passos**                                                        | **Critérios de Êxito**    |
| 1.  Acessar a tela de um grupo                                    | 1. Deve-se exibir uma mensagem de confirmação de evento de grupo criado |
| 2. Clicar no botão "+" para criação de novo evento de grupo       | 2. O evento de grupo deve aparecer marcado no calendário do grupo   |
| 3. Preencher informações do evento                                | 3. Ao selecionar um evento deve-se exibir informações do evento  |
| 4. Clicar no botão para cadastrar o evento de grupo  | 4. As alterações realizadas no evento devem ser mostradas ao clicar no card do evento de grupo                         
| 5. Clicar sobre o card do evento cadastrado
| 6. Clicar no botão para editar o evento
| 7. Editar o evento e salvar
| 8. Checar se alterações serão exibidas após edição do evento de grupo


| **Caso de Teste 12: Sugerir datas baseada na disponibilidade dos participantes** |                                                                                                                                      |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Requisito Referente**                                           | RF 12 - Sugestão automática de datas baseada na disponibilidade dos participantes	     |
| **Descrição**                                                     | Verificar se o sistema sugere melhores datas para marcação de eventos em agendas compartilhadas |
| **Objetivo do Teste**                                             | Verificar se ao acessar a tela de um grupo, as melhores datas para marcação de eventos serão perceptíveis   |
| **Passos**                                                        | **Critérios de Êxito**    |
| 1.  Acessar a tela de um grupo                                    | 1. O calendário do grupo deve auxiliar na escolha de uma data para marcação de evento utilizando cores para distinguir as datas |
| 2. Observar se o calendário do grupo sugere melhores datas para marcação de evento   |


| **Caso de Teste 13: Cadastro** |    
| **Requisito Referente**                                                            | RF 01 - Sistema de cadastro e login de usuários (email/senha ou redes sociais)                                                                                                                |
| ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descrição**                                                                      | O usuário deve conseguir criar uma nova conta no sistema através da tela de cadastro                                                                                                          |
| **Objetivo do Teste**                                                              | Garantir que o sistema de cadastro esteja funcionando corretamente                                                                                                                            |
| **Passos**                                                                         | **Critérios de Êxito**                                                                                                                                                                        |
| 1. Acessar a tela de Cadastro  2. Inserir suas credenciais  3. Clicar em cadastrar | 1. Um novo usuário e um novo perfil são criados no banco de dados.  2. O usuário é direcionado para a tela de login.  3. O usuário consegue realizar login usando as credenciais cadastradas. |


| **Caso de Teste 14: Login** | 
| **Requisito Referente**                                                                       | RF 01 - Sistema de cadastro e login de usuários (email/senha ou redes sociais)                                                        |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Descrição**                                                                                 | O usuário deve conseguir criar uma sessão e acessar os seus dados ao inserir suas credenciais na tela de login                        |
| **Objetivo do Teste**                                                                         | Garantir que o usuário consiga realizar login no sistema                                                                              |
| **Passos**                                                                                    | **Critérios de Êxito**                                                                                                                |
| 1. Acessar a tela de login  2. Inserir seu email  3. Inserir sua senha  4. Clicar em conectar | 1. Uma sessão é criada.  2. O usuário é direcionado para a tela home.  3. O usuário tem acesso aos seus dados registrados no sistema. |


| **Caso de Teste 15: Notificações** | 
| **Requisito Referente**                                                                      | RF15 - Notificações de novos eventos compartilhados e RF16 - Notificações de alterações em eventos existentes                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descrição**                                                                                | O usuário deve ter acesso a suas notificações geradas pelo sistema                                                                                 |
| **Objetivo do Teste**                                                                        | Garantir que o usuário consiga visualizar e gerenciar suas notificações                                                                            |
| **Passos**                                                                                   | **Critérios de Êxito**                                                                                                                             |
| 1. Acessar a tela de notificações  2. Visualizar uma notificação  3. Excluir uma notificação | 1. O usuário consegue receber notificações.  2. O usuário consegue visualizar suas notificações.  3. O usuário consegue excluir suas notificações. |


| **Caso de Teste 16: Calendário Individual** | 
| **Requisito Referente**                                                                                                                                                                            | Visualização de Calendário individual em formato mensal                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descrição**                                                                                                                                                                                      | O usuário deve conseguir visualizar os eventos em um calendário individual em formato mensal ao clicar no dia                                                                                                                                                                                                                                                                                                                   |
| **Objetivo do Teste**                                                                                                                                                                              | Garantir que o usuário consiga visualizar os eventos em seu calendário individual, logado em seu perfil                                                                                                                                                                                                                                                                                                                         |
| **Passos**                                                                                                                                                                                         | **Critérios de Êxito**                                                                                                                                                                                                                                                                                                                                                                                                          |
| 1. Acessar a tela de calendário na tab navigator  2. Clicar em um dia que possua evento  3. Visualizar na mesma tela o evento agendado para aquele dia, que estará destacado com um pontinho verde | 1. O calendário deve ser exibido em formato mensal, com os eventos do usuário logado carregados automaticamente.  2. Dias com eventos devem ser destacados com um pontinho verde.  3. Ao clicar em um dia com evento, ele deve ser exibido na mesma tela, sem redirecionamento.  4. Os eventos exibidos devem ser exclusivos do usuário logado.  5. A resposta ao clique deve ser rápida (sem travamentos) e sem erros visuais. |


| **Caso de Teste 17: Criação, edição e exclusão de eventos individuais** | 
| **Requisito Referente**                                                                                                                                                                                                                                                                                                                       | Criação, edição e exclusão de eventos individuais                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descrição**                                                                                                                                                                                                                                                                                                                                 | O usuário deve conseguir criar eventos individuais, que constarão apenas em sua agenda, editar estes eventos e excluir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Objetivo do Teste**                                                                                                                                                                                                                                                                                                                         | Garantir que o usuário consiga criar, editar e excluir eventos individuais, logado em seu perfil                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Passos**                                                                                                                                                                                                                                                                                                                                    | **Critérios de Êxito**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 1. Acessar a tela de eventos na tab navigator  2. Preencher o título, descrição, data, hora e duração do evento  3. Clicar em "próximo". Procedimento que criará o evento no banco de dados e alimentará a listagem de eventos e também o calendário individual  4. Possibilidade de edição do evento  5. Possibilidade de exclusão do evento | 1. Criação bem-sucedida: O evento foi salvo corretamente no banco de dados após o clique em "próximo"  2. Persistência e listagem: O evento criado apareceu na listagem de eventos do usuário logado  3. Integração com o calendário: O evento refletiu corretamente no calendário individual, com marcação visual na data correspondente (ex: pontinho verde)  4. Edição funcional: O usuário deve conseguir editar o evento, e as alterações devem ser refletidas tanto na listagem quanto no calendário  5. Exclusão funcional: O usuário deve conseguir excluir o evento, e ele deve ser removido tanto da listagem quanto do calendário  6. Escopo individual: O evento deve estar vinculado exclusivamente ao usuário logado, sem aparecer para outros usuários |


| **Caso de Teste 18: Criação, edição e exclusão de eventos individuais** | 
| **Requisito Referente**                                                                                                                                                                                                                                                                                            | Visualização de eventos em agendas individuais e compartilhadas                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descrição**                                                                                                                                                                                                                                                                                                      | O usuário deve conseguir visualizar eventos individuais e de grupos                                                                                                                                                                                                                           |
| **Objetivo do Teste**                                                                                                                                                                                                                                                                                              | Garantir que o usuário visualize uma lista de eventos individuais e de grupos, logado em seu perfil                                                                                                                                                                                           |
| **Passos**                                                                                                                                                                                                                                                                                                         | **Critérios de Êxito**                                                                                                                                                                                                                                                                        |
| 1. Acessar a tela de eventos na tab navigator  2. Preencher o título, descrição, data, hora e duração do evento  3. Clicar em "próximo". Procedimento que criará o evento no banco de dados e alimentará a listagem de eventos e também o calendário individual  4. Visualizar o evento criado na lista de eventos | 1. O usuário logado visualiza corretamente seus eventos individuais e de grupos  2. Os eventos são identificáveis por tipo (ícone)  3. A listagem exibe título, data, hora e tipo  4. O evento aparece na lista após ser criado, sem erros  5. Os dados são recuperados corretamente do banco |






 
## Ferramentas de Testes (Opcional)

Comente sobre as ferramentas de testes utilizadas.
 
> **Links Úteis**:
> - [IBM - Criação e Geração de Planos de Teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Práticas e Técnicas de Testes Ágeis](http://assiste.serpro.gov.br/serproagil/Apresenta/slides.pdf)
> -  [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e Geração de Planos de Teste de Software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)
