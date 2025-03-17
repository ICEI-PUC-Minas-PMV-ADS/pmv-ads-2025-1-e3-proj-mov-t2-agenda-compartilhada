
# Metodologia

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Documentação de Especificação</a></span>

Descreva aqui a metodologia de trabalho do grupo para atacar o problema. Definições sobre os ambiente de trabalho utilizados pela  equipe para desenvolver o projeto. Abrange a relação de ambientes utilizados, a estrutura para gestão do código fonte, além da definição do processo e ferramenta através dos quais a equipe se organiza (Gestão de Times).

## Relação de Ambientes de Trabalho

Os artefatos do projeto são desenvolvidos a partir de diversas plataformas e a relação dos ambientes com seu respectivo propósito deverá ser apresentada em uma tabela que especifica que detalha Ambiente, Plataforma e Link de Acesso. 
Nota: Vide documento modelo do estudo de caso "Portal de Notícias" e defina também os ambientes e frameworks que serão utilizados no desenvolvimento de aplicações móveis.

## Controle de Versão

A ferramenta de controle de versão adotada no projeto foi o
[Git](https://git-scm.com/), sendo que o [Github](https://github.com)
foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branches:

- `main`: versão estável já testada do software
- `unstable`: versão já testada do software, porém instável
- `testing`: versão em testes do software
- `dev`: versão de desenvolvimento do software

Quanto à gerência de issues, o projeto adota a seguinte convenção para
etiquetas:

- `documentation`: melhorias ou acréscimos à documentação
- `bug`: uma funcionalidade encontra-se com problemas
- `enhancement`: uma funcionalidade precisa ser melhorada
- `feature`: uma nova funcionalidade precisa ser introduzida

Discuta como a configuração do projeto foi feita na ferramenta de versionamento escolhida. Exponha como a gerência de tags, merges, commits e branchs é realizada. Discuta como a gerência de issues foi realizada.

> **Links Úteis**:
> - [Microfundamento: Gerência de Configuração](https://pucminas.instructure.com/courses/87878/)
> - [Tutorial GitHub](https://guides.github.com/activities/hello-world/)
> - [Git e Github](https://www.youtube.com/playlist?list=PLHz_AreHm4dm7ZULPAmadvNhH6vk9oNZA)
>  - [Comparando fluxos de trabalho](https://www.atlassian.com/br/git/tutorials/comparing-workflows)
> - [Understanding the GitHub flow](https://guides.github.com/introduction/flow/)
> - [The gitflow workflow - in less than 5 mins](https://www.youtube.com/watch?v=1SXpE08hvGs)

## Gerenciamento de Projeto

Com o objetivo de garantir a eficiência no planejamento e execução do desenvolvimento do aplicativo Agenda Compartilhada, foi adotada uma abordagem híbrida baseada nos princípios das metodologias ágeis, combinando elementos do Scrum e do Kanban, que permite integrar o planejamento iterativo do Scrum com a flexibilidade do Kanban, proporcionando um fluxo contínuo de trabalho e uma gestão mais dinâmica das tarefas.

A utilização do Trello como ferramenta de gestão visual possibilita a organização do backlog de atividades, distribuindo as tarefas em colunas como To Do, Doing e Done. Esse modelo permite um acompanhamento claro do progresso, priorizando a transparência e a eficiência na execução das demandas. 

Além disso, foram implementadas reuniões semanais via Microsoft Teams, garantindo alinhamento contínuo entre os membros da equipe. Essas reuniões desempenham um papel semelhante às daily meetings do Scrum, permitindo a identificação e resolução de desafios, bem como o acompanhamento do progresso das atividades em andamento.

Para monitoramento do cronograma e controle das entregas, foi utilizado um gráfico de Gantt. Essa ferramenta auxilia no rastreamento das etapas do projeto, permitindo uma visualização clara dos marcos e prazos estabelecidos.

Portanto, a metodologia ágil escolhida pelo grupo favorece a previsibilidade no desenvolvimento do software, otimizando a produtividade e promovendo uma execução eficiente e colaborativa. 


### Divisão de Papéis

Para garantir a organização e eficiência no desenvolvimento do aplicativo Agenda Compartilhada, a equipe foi estruturada de acordo com os princípios da metodologia ágil Scrum. A divisão de papéis seguiu uma abordagem que favorece a colaboração, a agilidade na tomada de decisões e a entrega incremental do produto.

Scrum Master: Nikolas Victor Mota.
Responsável por garantir a aplicação da metodologia ágil Scrum, facilitando a comunicação entre os membros da equipe.

Product Owner: Nikolas Victor Mota.
Responsável pela definição e priorização do backlog do produto, garantindo que os requisitos atendam às necessidades dos usuários e que a equipe de desenvolvimento esteja alinhada com os objetivos do projeto.

Equipe de Desenvolvimento:
Yasmim Emmeline Brandão Nunes
Milton Roberto Garcia Ventura
Grace Kelly Santos e Silva
Daianne Moreira
Letícia Moreira
Responsáveis pela implementação das funcionalidades do sistema, desenvolvimento do código-fonte, integração de tecnologias e garantia da qualidade técnica do produto.

Equipe de Design: 
Daianne Moreira
Letícia Moreira
Responsáveis pela concepção da interface do usuário e experiência do usuário, garantindo um design intuitivo e acessível, alinhado às necessidades dos usuários finais.

### Processo

Conforme especificado anteriormente, o Scrum foi definido como a metodologia ágil para o desenvolvimento do Agenda Compartilhada, garantindo um fluxo de trabalho iterativo e eficiente. A seguir, detalhamos a implementação do Scrum no projeto.

A equipe Scrum é composta pelo Scrum Master e Product Owner Nikolas Victor Mota, e pela equipe de desenvolvimento e design, formada por Yasmim Emmeline Brandão Nunes, Milton Roberto Garcia Ventura, Grace Kelly Santos e Silva, Daianne Moreira e Letícia Moreira.

O Scrum Master é responsável por garantir que a equipe siga as práticas do Scrum, facilitando o trabalho dos desenvolvedores e designers, removendo impedimentos e promovendo a melhoria contínua do processo. Além disso, acumulando a função de Product Owner, Nikolas Victor Mota é responsável por definir e priorizar o backlog do produto, assegurando que as funcionalidades desenvolvidas estejam alinhadas às necessidades dos usuários.

A equipe de desenvolvimento e design tem a responsabilidade de entregar as funcionalidades do sistema dentro dos períodos definidos em cada Sprint. Um Sprint é um ciclo fixo de trabalho no qual a equipe deve desenvolver e entregar um conjunto de funcionalidades predefinidas no backlog do produto.

Durante o projeto, foram realizadas reuniões semanalmente para acompanhar o progresso do trabalho e garantir que todos os membros estivessem alinhados com os objetivos da Sprint. As reuniões foram estruturadas da seguinte maneira: 
- 	Reunião de acompanhamento: Cada membro da equipe compartilha as atividades realizadas desde o último encontro, as próximas tarefas planejadas e eventuais impedimentos que possam impactar o desenvolvimento.
- 	Reunião para revisão do Sprint: Nesse encontro, a equipe apresenta as funcionalidades concluídas ao final da Sprint. O Product Owner e outras partes interessadas fornecem feedback sobre o trabalho desenvolvido e revisam o backlog do produto, ajustando as prioridades para as próximas entregas.

A utilização do Scrum no desenvolvimento do Agenda Compartilhada proporcionou um fluxo de trabalho estruturado, permitindo entregas incrementais e ajustáveis de acordo com as necessidades do projeto. Como o Scrum é uma metodologia flexível, adaptações foram feitas ao longo do processo para garantir maior alinhamento com os desafios e demandas específicas da equipe e do produto.

### Ferramentas

As ferramentas empregadas no projeto são:

-Repositório de Código Fonte: Github;
-Gerenciamento do Projeto: Trello;
-Ferramenta de Comunicação: Microsoft Teams;
-Desenvolvimento e Implementação: React Native;
-Banco de dados NoSQL: MongoDB;
-Editor de Código: Visual Studio v.2019;
-Ferramentas de desenho de tela: Figma.


