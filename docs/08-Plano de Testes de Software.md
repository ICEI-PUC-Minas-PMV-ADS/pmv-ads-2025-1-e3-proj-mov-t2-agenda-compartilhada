# Plano de Testes de Software

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>

**Gerando plano de testes para telas específicas**

O usuário quer casos de teste exclusivamente para as telas: Home-dashboard, MyGroups, CreateGroup e GroupDetails. A resposta anterior incluiu 10 casos, mas eles devem ser filtrados para essas quatro telas. Vou gerar um plano de testes especificamente para "HomeDashboard", "MyGroups", "CreateGroup" e "GroupDetails", seguindo a estrutura do exemplo anterior. Isso inclui mapear os requisitos funcionais para cada tela, como a "HomeDashboard", que exibe eventos futuros e os meus grupos.

**Gerando casos de teste para telas específicas**

O usuário quer casos de teste para as telas Home-dashboard, MyGroups, CreateGroup e GroupDetails, sem a necessidade de mapear os requisitos para IDs. Vou criar os casos de teste com base nas telas mencionadas. Para cada uma, vou definir um caso de teste, como "Tela HomeDashboard – Exibição de eventos e grupos", e usar requisitos como RF03 (visualização de calendário individual) e RF06 (agendas compartilhadas), ou simplesmente se referir às telas. O importante é focar apenas nas telas que o usuário especificou.

**Criando casos de teste para as telas**

O usuário quer um plano de teste para as telas Home-dashboard, MyGroups, CreateGroup e GroupDetails. Eu sugiro estruturar os casos de teste apenas para estas telas com a descrição, objetivo, passos e critérios de êxito. A primeira tela pode ser dividida em "exibição de eventos" e "exibição de grupos", criando dois casos de teste. Mas como o usuário não especificou quantos casos deseja, vou criar um para cada tela, seguindo a estrutura de exemplo. Assim, teremos 4 casos no total, com descrição e objetivos claros.


Pensou por 36 segundos


| **Caso de Teste 1: Home-dashboard – Exibição de Eventos e Grupos** |                                                                                                                                                               |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Requisito Referente**                                            | Tela Home-dashboard                                                                                                                                           |
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
| **Requisito Referente**                                             | Tela MyGroups                                                                                                                                |
| **Descrição**                                                       | Verificar a listagem das seções “Grupos que administro” e “Grupos que participo”, o funcionamento da barra de busca e o botão “Criar Grupo”. |
| **Objetivo do Teste**                                               | Garantir filtragem, navegação e acesso ao fluxo de criação de grupos.                                                                        |
| **Passos**                                                          | **Critérios de Êxito**                                                                                                                       |
| 1. Navegar à tela MyGroups.                                         | 1. Ambas as seções (“administro” e “participo”) exibem cards de grupos.                                                                      |
| 2. Digitar parte do nome de um grupo na barra de busca.             | 2. A lista filtra apenas os grupos cujo nome contém o termo digitado.                                                                        |
| 3. Clicar no botão “Criar Grupo”.                                   | 3. O app navega para a tela CreateGroup.                                                                                                     |
| 4. Clicar em um card de grupo listado.                              | 4. O app navega para a tela GroupDetails com o groupId correto.                                                                              |

| **Caso de Teste 3: CreateGroup – Formulário de Criação de Grupo** |                                                                                                           |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Requisito Referente**                                           | Tela CreateGroup                                                                                          |
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
| **Requisito Referente**                                           | Tela GroupDetails                                                                                                                    |
| **Descrição**                                                     | Verificar exibição dos detalhes do grupo, lista de eventos e de membros, funcionamento do menu de contexto e do botão “Novo Evento”. |
| **Objetivo do Teste**                                             | Garantir que o usuário veja informações completas do grupo e realize as ações esperadas.                                             |
| **Passos**                                                        | **Critérios de Êxito**                                                                                                               |
| 1. Abrir GroupDetails para um grupo existente.                    | 1. Avatar, nome do grupo e contagem de membros aparecem corretamente.                                                                |
| 2. Observar seção “Próximos Eventos” com cards de evento.         | 2. Cada card mostra data, nome e local; ao tocar, navega para detalhes do evento.                                                    |
| 3. Observar seção “Membros” com cards de membro e status.         | 3. Cada membro exibe iniciais, nome e “Administrador” ou “Membro” corretamente.                                                      |
| 4. Tocar no ícone de menu (⋮) para abrir o menu de contexto.      | 4. Modal exibe opções: “Editar grupo”, “Adicionar membros”, “Silenciar notificações” e “Sair do grupo”.                              |
| 5. Selecionar cada opção de menu e confirmar navegação/ação.      | 5. Cada ação leva à tela ou executa a operação esperada (ex.: abrir edição, abrir convite, silenciar, sair).                         |
| 6. Clicar em “Novo Evento”.                                       | 6. O app navega para a tela de criação de evento correspondente.                                                                     |

 
## Ferramentas de Testes (Opcional)

Comente sobre as ferramentas de testes utilizadas.
 
> **Links Úteis**:
> - [IBM - Criação e Geração de Planos de Teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Práticas e Técnicas de Testes Ágeis](http://assiste.serpro.gov.br/serproagil/Apresenta/slides.pdf)
> -  [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e Geração de Planos de Teste de Software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)
