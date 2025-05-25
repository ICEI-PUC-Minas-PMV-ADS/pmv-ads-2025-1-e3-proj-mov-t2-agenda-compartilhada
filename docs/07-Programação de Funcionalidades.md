# Programação de Funcionalidades

O Agenda Compartilhada é um aplicativo móvel para organização colaborativa de eventos e encontros coletivos. A solução centraliza o planejamento de compromissos entre grupos de pessoas, eliminando a dispersão de informações em múltiplos canais de comunicação.
Desenvolvido com React Native (frontend), NestJS (backend) e MongoDB (banco de dados), o aplicativo oferece funcionalidades como criação de grupos, agendamento colaborativo, confirmação de presença e notificações em tempo real.
Os requisitos foram definidos com base na análise de necessidades dos usuários e seguem padrões de qualidade da ISO 9126, organizados por prioridade para desenvolvimento incremental usando metodologia SCRUM. 

**Requisitos Funcionais**

|ID    | Descrição do Requisito                                | Prioridade |
|------|-------------------------------------------------------|------------|
|RF-01| Sistema de cadastro e login de usuários (email/senha) | Alta |
|RF-02| O sistema deve permitir o usuário criação e edição de perfil de usuário (nome e foto) | Alta |
|RF-03| Visualização de calendário individual em formatos mensal| Alta |
|RF-04| Marcação de disponibilidade e indisponibilidade de horários| Alta |
|RF-05| Criação, edição e exclusão de eventos pessoais | Alta |
|RF-06| Criação e gerenciamento de agendas compartilhadas (amigos, família, trabalho) | Alta |
|RF-07| Compartilhamento de agendas com outros usuários via email ou nome de usuário | Média |
|RF-08|Visualização de eventos em agendas compartilhadas  | Alta |
|RF-09| Criação, edição e exclusão de eventos em agendas compartilhadas | Média |
|RF-10| Sugestão automática de datas baseada na disponibilidade dos participantes | Média |
|RF-11| Notificações de novos eventos compartilhados | Baixa |
|RF-12| Gerenciamento de membros de grupos (adicionar/remover) | Média |
|RF-13| Sistema de alteração de senha | Alta |
|RF-14| Funcionalidade de busca por usuários para convites | Média |


**Requisitos Não Funcionais**
|ID    | Descrição do Requisito                                | Prioridade |
|------|-------------------------------------------------------|------------|
|RNF-01| Desenvolvimento do frontend em React Native para suporte multiplataforma (iOS/Android) | Alta |
|RNF-02|Desenvolvimento do backend com NestJS  | Alta |
|RNF-03|Utilização de MongoDB como banco de dados  | Alta |
|RNF-04|Comunicação frontend-backend via REST API  | Alta |
|RNF-05|Sistema de navegação com React Navigation | Alta |
|RNF-06|Implementação de biblioteca de calendário (react-native-calendars)  | Alta |
|RNF-07|Tempo de resposta da aplicação não deve exceder 5 segundos  | Alta |
|RNF-08|Interface intuitiva e fácil de usar  | Alta |
|RNF-09|Compatibilidade com diferentes tamanhos de tela móvel  | Média |
|RNF-10|Sistema de notificações  | Média |




> **Links Úteis**:
>
> - [Trabalhando com HTML5 Local Storage e JSON](https://www.devmedia.com.br/trabalhando-com-html5-local-storage-e-json/29045)
> - [JSON Tutorial](https://www.w3resource.com/JSON)
> - [JSON Data Set Sample](https://opensource.adobe.com/Spry/samples/data_region/JSONDataSetSample.html)
> - [JSON - Introduction (W3Schools)](https://www.w3schools.com/js/js_json_intro.asp)
> - [JSON Tutorial (TutorialsPoint)](https://www.tutorialspoint.com/json/index.htm)
