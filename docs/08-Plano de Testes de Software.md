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



| **Caso de Teste 7: Envio de Convite de Grupo por Nome de Usuário** |                                                                                                                                      |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Requisito Referente**                                           | RF 07 - Compartilhamento de agendas com outros usuários via email ou nome de usuário.     |
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



| **Caso de Teste 8: Visualizar eventos em agendas compartilhadas** |                                                                                                                                      |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Requisito Referente**                                           | RF 09 - Visualização de eventos em agendas compartilhadas     |
| **Descrição**                                                     | Verificar se o sistema permite a visualização dos eventos presentes na agenda compartilhada |
| **Objetivo do Teste**                                             | Verificar se todos os eventos estarão visíveis na tela de grupo   |
| **Passos**                                                        | **Critérios de Êxito**    |
| 1.  Acessar a tela de um grupo                                    | 1. A tela do grupo deve exibir os eventos e datas marcadas de eventos criados no grupo |
| 2. Verificar datas marcadas no grupo                              | 2. Caso existam vários eventos no mesmo dia, o scroll deve funcionar para que todos os eventos sejam visíveis   |
| 3. Selecionar datas diversas                                      | 3. Ao selecionar um evento deve-se exibir informações do evento  |
| 4. Analisar informações dos eventos exibidos ao clicar e datas marcadas no grupo                           
| 5. Clicar em eventos marcados no grupo                 
                          
























 
## Ferramentas de Testes (Opcional)

Comente sobre as ferramentas de testes utilizadas.
 
> **Links Úteis**:
> - [IBM - Criação e Geração de Planos de Teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Práticas e Técnicas de Testes Ágeis](http://assiste.serpro.gov.br/serproagil/Apresenta/slides.pdf)
> -  [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e Geração de Planos de Teste de Software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)
