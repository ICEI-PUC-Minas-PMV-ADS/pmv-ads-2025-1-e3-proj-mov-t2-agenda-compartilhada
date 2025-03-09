# Especificações do Projeto

## 1. Introdução

No cenário atual, a falta de tempo e a falta de planejamento adequado têm se tornado obstáculos recorrentes para que as pessoas possam se reunir com seus amigos de maneira fácil e eficiente. Muitos indivíduos recorrem a aplicativos para tentar organizar esses encontros, mas frequentemente esses aplicativos não foram desenvolvidos com esse propósito específico, o que resulta em uma experiência de uso limitada e insatisfatória.

Visando resolver essa lacuna, nosso grupo propôs o desenvolvimento de um **aplicativo para dispositivos móveis** simples, intuitivo e eficiente, que permita aos usuários planejar encontros de forma prática e organizada. O aplicativo buscará atender a três necessidades principais:

- **Facilidade em encontrar um horário para se reunir com o grupo de amigos.**
- **Facilidade em definir datas e organizar a distribuição de tarefas para o evento.**
- **Facilidade em definir locais e agendar momentos de descontração com amigos de trabalho.**

Este documento de especificação descreve os requisitos e as diretrizes para o desenvolvimento deste aplicativo.

## 2. Objetivo do Projeto

O objetivo principal deste projeto é criar um aplicativo para dispositivos móveis que permita aos usuários organizar encontros com amigos de maneira prática, rápida e eficiente. O aplicativo deve ser intuitivo, fácil de usar e atender às seguintes funcionalidades principais:

- **Gestão de Agenda**: Permitir aos usuários sugerir datas e horários para o encontro, facilitando a escolha da melhor opção para todos os participantes.
- **Distribuição de Tarefas**: Facilitar a organização e atribuição de tarefas para os membros do grupo (como quem vai levar o que, quem irá cuidar do transporte, etc.).
- **Sugestão de Locais**: Auxiliar na definição de locais para encontros, permitindo a interação com serviços de geolocalização.

## 3. Tecnologias Utilizadas

- **Front-End**: O aplicativo será desenvolvido utilizando **React Native**, garantindo compatibilidade entre as plataformas Android e iOS e permitindo um desenvolvimento ágil e eficiente.
- **Back-End**: Para o desenvolvimento do servidor e da lógica de negócios, será utilizado **NestJS**, uma estrutura robusta e escalável para aplicações backend em Node.js.
- **Banco de Dados**: O banco de dados escolhido será **MongoDB**, um banco de dados NoSQL que garante flexibilidade e escalabilidade para o armazenamento das informações dos usuários, eventos e tarefas.

## 4. Conclusão

Este projeto visa entregar uma solução prática e eficaz para os usuários que desejam organizar encontros de forma mais simples, reduzindo a complexidade e o tempo gasto em processos de planejamento. Ao utilizar tecnologias modernas como React Native, NestJS e MongoDB, o aplicativo será escalável, eficiente e fácil de usar, garantindo uma experiência agradável para todos os envolvidos.


## Personas

Identificamos três personas que representam os principais usuários e stakeholders do sistema de agenda compartilada. Cada persona possui necessidades e expectativas específicas em relação ao sistema:

| ![image](https://github.com/user-attachments/assets/eb4edf81-2953-4368-b416-249c3f9a2e3f) | Marcos Rocha<br>Idade: 30<br>Descrição: Trabalha e faz faculdade  |
|--------|----------------------------------------------------------------------------------------|
| Background | Marcos possui uma vida muito atarefada e adora encontrar com os amigos sempre que possível. |
| Frustrações | Dificuldade em encontrar com grupo de amigos. |
| Expectativas | Um sistema que auxilie na marcação de eventos e encontro com os amigos e que forneça um feedback visual visual simples da agenda de eventos. |

| ![image](https://github.com/user-attachments/assets/1622aee0-f4fe-4550-9e9f-37aae45e74c9) | Silvia Fagundes<br>Idade: 53<br>Descrição: Mulher madura, dedicada ao lar e à família |
|--------|----------------------------------------------------------------------------------------|
| Background | Silvia é casada, trabalha cuidando da casa e adora promover encontros e almoços em família. |
| Frustrações | Dificuldade em definir datas e organizar a distribuição das tarefas para o encontro. |
| Expectativas | Um sistema que facilite a definição da data do encontro e forneça uma forma de informar os detalhes necessários. |

| ![image](https://github.com/user-attachments/assets/9e5a4029-3267-48b8-90be-4341e9d43e49) | Natalia Martins<br>Idade: 27<br>Descrição: Profissional com muitos amigos no trabalho |
|--------|----------------------------------------------------------------------------------------|
| Background | Natalia trabalha em uma grande empresa, possui muitos amigos no trabalho e entende como importante manter um relacionamento saudável com os amigos fora do ambiente profissional. |
| Frustrações | Dificuldade em encontrar datas e definir locais para momentos descontraídos com os amigos do trabalho |
| Expectativas | Um sistema que facilite a definição de data para eventos e que possua um sistema que facilite a definição do próximo local. |

## Histórias de Usuários


# Histórias de Usuário para o App de Agenda Compartilhada

| COMO...                               | QUERO...                                                | PARA...                                                      |
|:--------------------------------------|:--------------------------------------------------------|:-------------------------------------------------------------|
| Usuário não cadastrado                | Criar uma conta usando email ou redes sociais (Google)  | Acessar as funcionalidades do sistema                         |
| Usuário cadastrado                    | Fazer login no sistema                                  | Visualizar minhas agendas e eventos                          |
| Usuário                               | Personalizar meu perfil com foto e nome                 | Ser identificado facilmente pelos outros participantes        |
| Usuário                               | Ver meu calendário em formatos diário, semanal e mensal | Organizar melhor meus compromissos                           |
| Usuário                               | Indicar meus horários livres e ocupados                 | Facilitar o planejamento de eventos em grupo                 |
| Usuário                               | Criar eventos pessoais detalhados                       | Gerenciar minha agenda individual                            |
| Usuário                               | Criar agendas para diferentes grupos sociais            | Separar eventos por círculos sociais específicos             |
| Usuário                               | Convidar pessoas para uma agenda compartilhada          | Planejar eventos coletivamente                               |
| Administrador da agenda compartilhada | Configurar permissões para os membros                   | Controlar quem pode ver ou editar a agenda                   |
| Usuário                               | Ver todos os eventos nas agendas compartilhadas         | Acompanhar os compromissos coletivos                         |
| Membro da agenda compartilhada        | Adicionar eventos com todas as informações necessárias  | Convidar os demais membros para um encontro                  |
| Convidado para um evento              | Informar se poderei comparecer                          | Ajudar na organização e planejamento do evento               |
| Organizador de evento                 | Ver sugestões de datas conforme disponibilidade geral   | Escolher o melhor momento para reunir mais pessoas           |
| Usuário                               | Ser alertado ao ser incluído em agendas compartilhadas  | Saber quando fui adicionado a um novo grupo                  |
| Membro da agenda compartilhada        | Receber avisos sobre novos eventos                      | Ficar por dentro das atividades programadas                  |
| Participante confirmado               | Receber lembretes de eventos próximos                   | Não esquecer dos compromissos agendados                      |
| Participante de evento                | Ser informado sobre mudanças nos eventos                | Atualizar minha agenda pessoal conforme necessário           |


Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

> **Links Úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
> - [User Stories: requisitos que humanos entendem](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/)
> - [Histórias de Usuários: mais exemplos](https://www.reqview.com/doc/user-stories-example.html)
> - [9 Common User Story Mistakes](https://airfocus.com/blog/user-story-mistakes/)

## Modelagem do Processo de Negócio 

### Análise da Situação Atual
Atualmente, a organização de eventos e compromissos entre grupos de pessoas enfrenta diversos desafios que comprometem a eficiência e praticidade:

-**Fragmentação de informações: As pessoas utilizam diferentes ferramentas para gerenciar suas agendas (Google Calendar, Outlook, agenda física, notas em papel), dificultando a visualização integrada de disponibilidades.  
-**Comunicação ineficiente: A marcação de eventos em grupo geralmente ocorre por trocas de mensagens em aplicativos como WhatsApp ou e-mail, gerando longas conversas com informações dispersas e de difícil acompanhamento.  
-**Processo manual de conciliação: Encontrar horários compatíveis para todos os participantes exige que alguém pergunte individualmente sobre disponibilidades e faça manualmente a conciliação das agendas.  
-**Falta de centralização: Não há um repositório central onde todos os participantes possam visualizar eventos compartilhados, resultando em esquecimentos e confusões sobre datas e horários.  
-**Dificuldade de atualização: Alterações em eventos exigem nova rodada de comunicações, muitas vezes causando desalinhamento de informações entre os participantes.  
-**Confirmação de presença informal: Não existe um mecanismo padronizado para confirmar presença, resultando em incertezas sobre quem realmente participará de determinado evento.  

Esse cenário atual faz com que a organização de eventos entre grupos (familiares, amigos, colegas de trabalho) seja trabalhosa, propensa a erros e ineficiente.

### Descrição Geral da Proposta
O aplicativo de gerenciamento de eventos pessoais e compartilhados propõe uma solução integrada para facilitar a organização de compromissos em grupo, conectando agendas individuais e permitindo a visualização compartilhada de disponibilidades.

Limites da Proposta:

-**O aplicativo foca na gestão de eventos e compartilhamento de disponibilidades, não abrangendo outras funcionalidades como planejamento financeiro de eventos ou gerenciamento de tarefas.
-**A solução é voltada para usuários individuais e pequenos grupos, não sendo projetada para uso corporativo em larga escala.
-**O sistema não substitui plataformas especializadas em gestão de eventos profissionais ou conferências.

Ligações com Estratégias e Objetivos do Negócio:

-**Simplificar e otimizar a organização do tempo pessoal e em grupo
-**Reduzir o tempo gasto em coordenação de agendas
-**Minimizar conflitos de horários e esquecimentos de compromissos
-**Facilitar a visualização integrada de disponibilidades

Oportunidades de Melhorias:

-**Centralização de informações: Unificação de calendários pessoais e compartilhados em uma única plataforma.  
-**Automação de conciliação: Sugestão automática de horários com base nas disponibilidades dos participantes.  
-**Comunicação simplificada: Redução da necessidade de trocas de mensagens em outros canais para marcação de eventos.  
-**Transparência de disponibilidades: Visualização clara de horários disponíveis de todos os participantes.  
-**Confirmação estruturada: Sistema formalizado para confirmar presença em eventos.  
-**Notificações automáticas: Alertas sobre novos eventos, alterações e lembretes de compromissos.  
-**Adaptabilidade a diferentes grupos: Possibilidade de criar múltiplas agendas para diferentes círculos sociais (trabalho, família, amigos).  

### Processo 1 - Gestão da Agenda Pessoal
![Processo 1 - Gestão da Agenda Pessoal](https://github.com/user-attachments/assets/b2307b52-8ace-4b0d-b19c-f616e5465995)

### Processo 2 - Organização de Eventos Compartilhados
![Processo 2 - Organização de Eventos Compartilhados](https://github.com/user-attachments/assets/b035a434-ca36-4945-b587-41fcbaee61cc)

## Indicadores de Desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Colocar no mínimo 5 indicadores. 

Usar o seguinte modelo: 

![Indicadores de Desempenho](img/02-indic-desemp.png)
Obs.: todas as informações para gerar os indicadores devem estar no diagrama de classe a ser apresentado a posteriori. 

# Requisitos do Aplicativo de Gerenciamento de Eventos

## Requisitos Funcionais

| ID | Descrição | Prioridade |
|----|-----------|------------|
| RF01 | Sistema de cadastro e login de usuários (email/senha ou redes sociais) | Alta |
| RF02 | Criação e edição de perfil de usuário (nome e foto) | Média |
| RF03 | Visualização de calendário individual em formatos diário, semanal e mensal | Alta |
| RF04 | Marcação de disponibilidade e indisponibilidade de horários | Alta |
| RF05 | Criação, edição e exclusão de eventos pessoais (título, data, hora, local, descrição) | Alta |
| RF06 | Criação e gerenciamento de agendas compartilhadas (amigos, família, trabalho) | Alta |
| RF07 | Compartilhamento de agendas com outros usuários via email ou nome de usuário | Alta |
| RF08 | Configuração de permissões por agenda compartilhada (visualização/edição) | Média |
| RF09 | Visualização de eventos em agendas compartilhadas | Alta |
| RF10 | Criação, edição e exclusão de eventos em agendas compartilhadas | Alta |
| RF11 | Sistema de confirmação de presença em eventos (sim/não/talvez) | Média |
| RF12 | Sugestão automática de datas baseada na disponibilidade dos participantes | Baixa |
| RF13 | Sistema de notificações para inclusão em agendas compartilhadas | Média |
| RF14 | Sistema de lembretes para eventos | Alta |
| RF15 | Notificações de novos eventos compartilhados | Média |
| RF16 | Notificações de alterações em eventos existentes | Média |

## Requisitos Não Funcionais

| ID | Descrição | Prioridade |
|----|-----------|------------|
| RNF01 | Desenvolvimento do frontend em React Native para suporte multiplataforma (iOS/Android) | Alta |
| RNF02 | Desenvolvimento do backend com NestJS | Alta |
| RNF03 | Utilização de MongoDB como banco de dados | Alta |
| RNF04 | Estrutura de componentes reutilizáveis no frontend | Média |
| RNF05 | Gerenciamento de estado global com Context API | Média |
| RNF06 | Interface de usuário utilizando React Native Paper | Média |
| RNF07 | Sistema de navegação com React Navigation | Alta |
| RNF08 | Implementação de biblioteca de calendário (react-native-calendars) | Alta |
| RNF09 | Sistema de notificações push | Média |
| RNF10 | Arquitetura modular no backend (controladores e serviços) | Média |
| RNF11 | Autenticação segura via JWT | Alta |
| RNF12 | Comunicação frontend-backend via REST API | Alta |
| RNF13 | Serviço de notificações e lembretes | Média |
| RNF14 | Modelagem de dados com Mongoose para MongoDB | Alta |
| RNF15 | Implementação de índices para otimização de consultas frequentes | Baixa |

## Restrições

| ID | Descrição | Prioridade |
|----|-----------|------------|
| R01 | O aplicativo deve ser desenvolvido utilizando React Native, NestJS e MongoDB | Alta |
| R02 | O sistema de autenticação deve utilizar JWT | Alta |
| R03 | A comunicação entre frontend e backend deve ser realizada via REST API | Alta |
| R04 | O gerenciamento de estado no frontend deve utilizar Context API | Média |
| R05 | O aplicativo deve suportar apenas os métodos de login mencionados (email/senha e redes sociais) | Média |
| R06 | O banco de dados deve seguir a estrutura de coleções para usuários, agendas e eventos | Alta |
| R07 | O sistema de notificações e lembretes deve ser implementado de forma simplificada | Média |
| R08 | As permissões por agenda compartilhada limitam-se a visualização e edição | Média |
| R09 | A confirmação de presença em eventos possui apenas três opções (sim/não/talvez) | Baixa |

## Diagrama de Casos de Uso

O diagrama de casos de uso será elaborado para ilustrar as interações entre as personas e o sistema de agenda compartilhada. Cada persona terá casos de uso específicos que refletem suas necessidades e interações com o sistema.

### Diagrama de Casos de Uso Detalhado

#### Personas e Seus Casos de Uso:

1. **Marcos Rocha - Jovem que trabalha e estuda**
    - **Encontrar com amigos**: Acessar agenda compartilhada para verificar a data do próximo evento
    - **Definir mais facilmente a data para evento com os amigos**: Acessar agenda compartilhada e verificar as datas indicadas pelo sistema
    - **Decidir qual o melhor local para o próximo evento com os amigos**: Acessar agenda compartilhada e criar uma enquete

2. **Silvia Fagundes - Mulher madura, dedicada ao lar e à família**
    - **Organizar encontros familiares**: Criar agenda compartilhada e convidar membros da família
    - **Marcar encontro familiar**: Acessar agenda compartilhada e agendar um encontro
	- **Definir o que será necessário para o encontro**: Detalhar informações do encontro no momento do agendamento

3. **Natalia Martins - Profissional com muitos amigos no trabalho**
    - **Consultar data e horário dos próximos happy hours**: Acessar área de notificações e verificar eventos marcados
    - **Confirmar presença no próximo almoço com os colegas**: Acessar evento na agenda compartilhada e confirmar presença


### Diagrama Gráfico

![UseCaseDiagram](https://github.com/user-attachments/assets/f865bbd3-aa0c-431b-9d28-14f3ac0c8b79)

# Matriz de Rastreabilidade

A matriz de rastreabilidade é uma ferramenta usada para facilitar a visualização dos relacionamento entre requisitos e outros artefatos ou objetos, permitindo a rastreabilidade entre os requisitos e os objetivos de negócio. 

A matriz deve contemplar todos os elementos relevantes que fazem parte do sistema, conforme a figura meramente ilustrativa apresentada a seguir.

![Exemplo de matriz de rastreabilidade](img/02-matriz-rastreabilidade.png)

> **Links Úteis**:
> - [Artigo Engenharia de Software 13 - Rastreabilidade](https://www.devmedia.com.br/artigo-engenharia-de-software-13-rastreabilidade/12822/)
> - [Verificação da rastreabilidade de requisitos usando a integração do IBM Rational RequisitePro e do IBM ClearQuest Test Manager](https://developer.ibm.com/br/tutorials/requirementstraceabilityverificationusingrrpandcctm/)
> - [IBM Engineering Lifecycle Optimization – Publishing](https://www.ibm.com/br-pt/products/engineering-lifecycle-optimization/publishing/)


# Gerenciamento de Projeto

De acordo com o PMBoK v6 as dez áreas que constituem os pilares para gerenciar projetos, e que caracterizam a multidisciplinaridade envolvida, são: Integração, Escopo, Cronograma (Tempo), Custos, Qualidade, Recursos, Comunicações, Riscos, Aquisições, Partes Interessadas. Para desenvolver projetos um profissional deve se preocupar em gerenciar todas essas dez áreas. Elas se complementam e se relacionam, de tal forma que não se deve apenas examinar uma área de forma estanque. É preciso considerar, por exemplo, que as áreas de Escopo, Cronograma e Custos estão muito relacionadas. Assim, se eu amplio o escopo de um projeto eu posso afetar seu cronograma e seus custos.

## Gerenciamento de Tempo

Desenvolvemos um gráfico de Gantt utilizando o Power BI para otimizar o gerenciamento de tempo do nosso projeto de agenda compartilhada. Esta visualização permite acompanhar em tempo real o progresso de cada etapa do desenvolvimento, identificando tarefas finalizadas, em andamento e não iniciadas através de um código de cores intuitivo. A interface facilita o monitoramento do cronograma completo, desde a fase de brainstorming até a apresentação final, garantindo que todas as entregas e atividades críticas sejam concluídas dentro dos prazos estabelecidos para o período de 5 meses do projeto.

![image](https://github.com/user-attachments/assets/80496011-291a-4349-a8da-40f328de243e)


## Gerenciamento de Equipe

Foi utilizada a ferramenta Trello para a gestão da equipe e distribuição das tarefas. A comunicação aconteceu via grupo no Whatsapp e reuniões semanais através do Teams da equipe.
![image](https://github.com/user-attachments/assets/b05749e9-6d1a-4b07-af43-1f786ae5487a)

## Gestão de Orçamento
### Custos de Pessoal (Bolsas/Auxílios)

| Função | Número de Alunos | Valor Mensal (R$) | Duração (meses) | Custo Total (R$) |
|--------|------------------|-------------------|-----------------|------------------|
| Coordenador do Projeto | 1 | 800,00 | 5 | 4.000,00 |
| Desenvolvedor React Native | 2 | 700,00 | 5 | 7.000,00 |
| Designer UI/UX | 1 | 700,00 | 5 | 3.500,00 |
| Desenvolvedor Back-end | 1 | 700,00 | 5 | 3.500,00 |
| Tester/Documentação | 1 | 600,00 | 5 | 3.000,00 |
| **Subtotal Pessoal** | | | | **21.000,00** |

*Observação: Os valores representam possíveis bolsas de estudo/iniciação científica ou auxílio para os estudantes envolvidos no projeto.*

### Infraestrutura Tecnológica (Serviços em Nuvem e Ferramentas)

| Item | Quantidade | Valor Unitário (R$) | Duração (meses) | Custo Total (R$) | Observações |
|------|------------|---------------------|-----------------|------------------|-------------|
| Servidor na Nuvem (Tier Básico) | 1 | 150,00/mês | 5 | 750,00 | Para desenvolvimento/testes (AWS/Azure/GCP - tier gratuito pode ser utilizado) |
| Banco de Dados (MongoDB Atlas) | 1 | 0,00/mês | 5 | 0,00 | Plano gratuito para desenvolvimento |
| Firebase (Autenticação, Notificações) | 1 | 0,00/mês | 5 | 0,00 | Plano gratuito (Spark) |
| GitHub Pro (Repositório de Código) | 1 | 0,00/mês | 5 | 0,00 | GitHub Student Developer Pack (gratuito para estudantes) |
| GitHub Actions (CI/CD) | 1 | 0,00/mês | 5 | 0,00 | Gratuito para repositórios públicos ou com conta educacional |
| Figma (Design) | 1 | 0,00/mês | 5 | 0,00 | Versão educacional gratuita |
| **Subtotal Infraestrutura** | | | | **750,00** | |

### Espaço Físico

| Item | Quantidade | Valor Unitário (R$) | Duração (meses) | Custo Total (R$) |
|------|------------|---------------------|-----------------|------------------|
| Laboratório de Informática | 1 | 0,00 | 5 | 0,00 |
| Sala de Reuniões | 1 | 0,00 | 5 | 0,00 |
| **Subtotal Espaço Físico** | | | | **0,00** |

*Observação: Considera-se o uso dos espaços já disponíveis na universidade, sem custos adicionais.*

### Equipamentos

| Item | Quantidade | Valor Unitário (R$) | Custo Total (R$) | Observações |
|------|------------|---------------------|------------------|-------------|
| Smartphones para Teste | 2 | 1.200,00 | 2.400,00 | Android e iOS para testes |
| Cabo USB e Acessórios | 4 | 50,00 | 200,00 | Para conexão e testes |
| **Subtotal Equipamentos** | | | **2.600,00** | |

*Observação: Considera-se que os alunos utilizarão seus próprios notebooks/computadores para desenvolvimento.*

### Software e Licenças

| Item | Quantidade | Valor Unitário (R$) | Duração (meses) | Custo Total (R$) | Observações |
|------|------------|---------------------|-----------------|------------------|-------------|
| Apple Developer Program | 1 | 500,00/ano | - | 500,00 | Para publicação na App Store |
| Google Play Developer Account | 1 | 100,00 | - | 100,00 | Licença vitalícia |
| Bibliotecas Premium React Native | 1 | 300,00 | - | 300,00 | Componentes especializados (se necessário) |
| **Subtotal Software e Licenças** | | | | **900,00** | |

### Outros Custos

| Item | Valor (R$) | Observações |
|------|------------|-------------|
| Material de Consumo | 300,00 | Papelaria, impressões, etc. |
| Participação em Eventos | 1.500,00 | Inscrição em competições ou eventos de apresentação |
| Contingência (10%) | 2.705,00 | 10% do valor total dos outros itens |
| **Subtotal Outros** | **4.505,00** | |

### Resumo de Custos

| Categoria | Valor Total (R$) |
|-----------|------------------|
| 1. Custos de Pessoal (Bolsas) | 21.000,00 |
| 2. Infraestrutura Tecnológica | 750,00 |
| 3. Espaço Físico | 0,00 |
| 4. Equipamentos | 2.600,00 |
| 5. Software e Licenças | 900,00 |
| 6. Outros Custos | 4.505,00 |
| **CUSTO TOTAL DO PROJETO** | **29.755,00** |

### Observações Importantes

- O projeto considera desenvolvimento em React Native para aplicações móveis (Android e iOS)
- A duração estimada do projeto é de 5 meses
- Considera-se o uso de serviços em nuvem com planos gratuitos quando possível
- Projeto será desenvolvido de forma remota, sem necessidade de reuniões presenciais
