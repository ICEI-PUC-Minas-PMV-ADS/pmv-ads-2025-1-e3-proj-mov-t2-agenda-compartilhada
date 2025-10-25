# Referências

|Requisito   | Implementação                                         | Artefatos relacionados |Observações |
|----------|-------------------------------------------------------|--------------------|-------------------|
|RF-010 – Criar grupo e convidar usuários| Endpoint REST/legacy para criação com validações de membros e administradores | group.controller.ts, group.service.ts, DTOs (create-group.dto.ts, update-group-members.dto.ts) |Garante que todo administrador também seja membro e inicializa finanças vazias para novas integrações |
|RF-011 – Configuração do grupo (participantes) |Serviços para atualizar membros (add/remove) e administração, reaproveitados no controller | group.controller.ts, group.service.ts | Respostas padronizadas via ApiResponseDto; erros detalham violações (ex.: remover último admin)| 
|RF-012 – Listagem de grupos do usuário  | Hook React Query consumindo use case que invoca repositório HTTP |useGroups.ts, list-user-groups.use-case.ts, group-api.repository.ts | Atualização automática do cache ao criar grupos; logs ajudam troubleshooting| 
|RF-013 – Remover usuário de grupo |Serviço remove membro, reatribui admin e, se vazio, exclui o grupo |group.service.ts | Garante consistência nos administradores remanescentes | 
|RF-016 – Definir novos administradores|Rotas para adicionar/remover administradores com validações |group.controller.ts, group.service.ts | Impede duplicidade, obriga membro prévio e mantém pelo menos um admin ativo| 



**Documentação Oficial React Native**
 - https://reactnative.dev/docs/getting-started?utm_source=chatgpt.com

**Tutorial "Learn the Basics**
 - https://reactnative.dev/docs/tutorial?utm_source=chatgpt.com

**Documentação oficial – First steps Nest JS**
 - https://docs.nestjs.com/first-steps?utm_source=chatgpt.com

**Guia GeeksforGeeks tutorial NestJS**
 - https://www.geeksforgeeks.org/javascript/nestjs/?utm_source=chatgpt.com

**Awesome NestJS – exemplos**
 - https://awesome-nestjs.com/resources/examples.html?utm_source=chatgpt.com

**Sling Academy – NestJS Tutorials (básico ao avançado)**
 - https://www.slingacademy.com/series/nest-js-tutorials-from-basics-to-advanced/?utm_source=chatgpt.com

**NestJS and MongoDB: The Perfect Stack**
 - https://codingcops.com/nestjs-and-mongodb/?utm_source=chatgpt.com

**DEV Community – Mongoose/NestJS Complete Guide**
 - https://dev.to/munisekharudavalapati/mongoose-with-nestjs-and-mongodb-a-complete-guide-by-munisekhar-udavalapati-57b5?utm_source=chatgpt.com

**best practices NestJS + MongoDB**
 - https://www.linkedin.com/pulse/building-scalable-applications-nestjs-mongodb-best-practices-yasin-bo17f/

**LogRocket – article full‑stack NestJS + React**
 - https://blog.logrocket.com/full-stack-app-tutorial-nestjs-react/?utm_source=chatgpt.com

