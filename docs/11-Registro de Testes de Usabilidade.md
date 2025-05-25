# Registro de Testes de Usabilidade

Após realizar os testes de usabilidade, obtém-se um relatório a partir das análises realizadas. Este documento apresenta os resultados dos testes de usabilidade realizados no aplicativo Agenda Compartilhada. Os testes foram conduzidos com usuários representando as três personas do projeto, avaliando a facilidade de uso, intuitividade e eficiência das principais funcionalidades do aplicativo.

| Caso de Teste |UT-01 – Testar a usabilidade da interface de cadastro e login |
| :---- | :---- |
| **Requisito Associado** | RF-01 (Sistema de cadastro e login de usuários - email/senha) |
| **Objetivo do Teste** |Avaliar a facilidade de cadastro e login no aplicativo para novos usuários. |
| **Passos** | 1. Simular o primeiro acesso ao aplicativo com cada persona. <br> 2. Realizar cadastro usando email/senha. <br> 3. Testar login com as credenciais criadas. <br> 4. Verificar clareza das mensagens de erro e sucesso.|
| **Critério de Êxito** | Todos os perfis de usuário devem completar o cadastro e login em até 3 minutos sem dificuldades significativas.|
| **Resultado** | Todos os usuários completaram o cadastro e login em média de 2 minutos e 15 segundos. Interface clara e intuitiva. |
| **Evidência** | colar link do arquivo aqui |


| Caso de Teste |UT-02 – Testar compatibilidade entre dispositivos Android e iOS |
| :---- | :---- |
| **Requisito Associado** | RNF-01 (Desenvolvimento do frontend em React Native para suporte multiplataforma) |
| **Objetivo do Teste** |Verificar se o aplicativo funciona corretamente em dispositivos Android e iOS. |
| **Passos** | 1. Instalar e executar o aplicativo em dispositivo Android. <br> 2. Navegar por diferentes telas e verificar funcionalidades principais. <br> 3. Repetir o processo em dispositivo iOS. <br> 4. Comparar a consistência da interface entre plataformas.|
| **Critério de Êxito** |O aplicativo deve funcionar corretamente e manter a mesma funcionalidade em ambas as plataformas.|
| **Resultado** | O aplicativo apresentou consistência visual e funcional em ambas as plataformas, com pequenas diferenças nas animações. |
| **Evidência** | colar link do arquivo aqui |


| Caso de Teste |UT-03 – Testar fluxo de criação do primeiro evento |
| :---- | :---- |
| **Requisito Associado** |RF-05 (Criação de eventos pessoais) + RF-03 (Visualização do calendário) |
| **Objetivo do Teste** |Verificar se o usuário consegue criar seu primeiro evento de forma intuitiva. |
| **Passos** |1. Usuário acessa o calendário principal. <br> 2. Procura e encontra a opção de criar evento. <br> 3. Preenche todas as informações necessárias. <br> 4. Salva o evento e verifica se aparece no calendário. |
| **Critério de Êxito** |Usuário cria evento pessoal em até 5 minutos sem solicitar ajuda e o evento é exibido corretamente no calendário.|
| **Resultado** | |
| **Evidência** | colar link do arquivo aqui |

| Caso de Teste |UT-04 – Avaliar criação e configuração de grupo colaborativo  |
| :---- | :---- |
| **Requisito Associado** |RF-06 (Criação de agendas compartilhadas) + RF-12 (Gerenciamento de membros) |
| **Objetivo do Teste** |Testar a facilidade de criar grupos e adicionar membros. |
| **Passos** |1. Usuário navega para área de grupos. <br> 2. Cria novo grupo com nome e descrição. <br> 3. Adiciona pelo menos 2 membros usando busca. <br> 4. Configura permissões básicas do grupo. |
| **Critério de Êxito** |Processo completado em até 5 minutos com grupo funcional e membros adicionados com sucesso.|
| **Resultado** |Todos os usuários completaram a criação de grupos. Fluxo considerado intuitivo. |
| **Evidência** | colar link do arquivo aqui |

| Caso de Teste |UT-05 – Testar colaboração em eventos de grupo |
| :---- | :---- |
| **Requisito Associado** |RF-09 (Criação de eventos compartilhados) + RF-08 (Visualização de eventos compartilhados) |
| **Objetivo do Teste** |Avaliar a experiência de criação e visualização de eventos colaborativos. |
| **Passos** |1. Usuário acessa grupo existente. <br> 2. Cria evento para o grupo. <br> 3. Verifica se outros membros podem visualizar. <br> 4. Testa edição de evento compartilhado. |
| **Critério de Êxito** |Evento criado e compartilhado com sucesso, visível para todos os membros em tempo real.|
| **Resultado** |Eventos foram criados e sincronizados corretamente entre todos os membros. Diferenciação clara entre eventos pessoais e compartilhados. |
| **Evidência** | colar link do arquivo aqui |

| Caso de Teste |UT-06 – Testar gestão de disponibilidade pessoal |
| :---- | :---- |
| **Requisito Associado** |RF-04 (Marcação de disponibilidade) + RF-10 (Sugestão automática de datas) |
| **Objetivo do Teste** |Verificar se o sistema de disponibilidade é compreensível e útil. |
| **Passos** | 1. Usuário marca horários como disponível/indisponível. <br> 2. Verifica como isso afeta sugestões de horários. <br> 3. Testa diferentes cenários de disponibilidade. <br> 4. Observa sugestões automáticas do sistema.|
| **Critério de Êxito** |Sistema fornece sugestões relevantes baseadas na disponibilidade e usuário compreende o funcionamento.|
| **Resultado** | |
| **Evidência** | colar link do arquivo aqui |

| Caso de Teste |UT-07 – Avaliar sistema de convites e notificações |
| :---- | :---- |
| **Requisito Associado** |RF-07 (Compartilhamento de agendas) + RF-11 (Notificações) + RF-14 (Busca de usuários) |
| **Objetivo do Teste** |Testar a eficácia do sistema de convites e comunicação. |
| **Passos** |1. Usuário busca e convida novos membros. <br> 2. Verifica recebimento de notificações. <br> 3. Testa diferentes tipos de notificações. <br> 4. Avalia clareza das mensagens recebidas. |
| **Critério de Êxito** |Convites enviados com sucesso, notificações claras e recebidas no tempo adequado.|
| **Resultado** | |
| **Evidência** | colar link do arquivo aqui |


**Avaliação**

Pontos Fortes:

Interface de cadastro e login intuitiva, permitindo acesso rápido e fácil ao aplicativo.
Compatibilidade multiplataforma eficiente, mantendo consistência entre Android e iOS.
Sistema de criação de grupos e eventos bem estruturado e compreensível.
Sincronização em tempo real dos eventos compartilhados funcionando corretamente.
Performance dentro dos parâmetros estabelecidos, com carregamento rápido das telas.
Sistema de convites e notificações eficaz, com entrega rápida das mensagens.

Pontos Fracos:
Necessidade de ajustes na responsividade para garantir visualização ideal em diferentes tamanhos de tela.


Conclusão:
Os testes de usabilidade demonstram que o aplicativo Agenda Compartilhada possui uma base sólida de usabilidade. As funcionalidades principais (cadastro, criação de eventos e grupos) funcionam de forma intuitiva. Os problemas identificados são de severidade baixa a média e podem ser corrigidos com ajustes pontuais. O aplicativo está aprovado para lançamento com as melhorias recomendadas sendo implementadas na próxima versão.


As referências abaixo irão auxiliá-lo na geração do artefato “Registro de Testes de Usabilidade”.
> **Links Úteis**:
> - [Ferramentas de Testes de Usabilidade](https://www.usability.gov/how-to-and-tools/resources/templates.html)
