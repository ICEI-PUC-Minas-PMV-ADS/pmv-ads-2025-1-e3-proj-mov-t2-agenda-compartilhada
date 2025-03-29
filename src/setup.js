// Criação de coleções e validação do esquema

// 1. Coleção de Usuários
db.createCollection("usuarios", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["email", "senha"],
            properties: {
                email: {
                    bsonType: "string",
                    description: "Campo obrigatório. Deve ser uma string."
                },
                senha: {
                    bsonType: "string",
                    description: "Campo obrigatório. Deve ser uma string."
                }
            }
        }
    }
});

// 2. Coleção de Perfis
db.createCollection("perfis", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nome", "foto", "donoId", "tipoDono"],
            properties: {
                nome: {
                    bsonType: "string",
                    description: "Nome do perfil."
                },
                foto: {
                    bsonType: "string",
                    description: "Caminho ou URL da imagem do perfil."
                },
                donoId: {
                    bsonType: "objectId",
                    description: "Referência ao dono do perfil (usuário ou grupo)."
                },
                tipoDono: {
                    bsonType: "string",
                    enum: ["usuario", "grupo"],
                    description: "Determina se o perfil pertence a um usuário ou a um grupo."
                }
            }
        }
    }
});

// 3. Coleção de Notificações
db.createCollection("notificacoes", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["tipo", "descricao", "dataEnvio", "usuario_id"],
            properties: {
                tipo: {
                    bsonType: "string",
                    description: "Tipo da notificação."
                },
                descricao: {
                    bsonType: "string",
                    description: "Descrição da notificação."
                },
                dataEnvio: {
                    bsonType: "date",
                    description: "Data e hora do envio."
                },
                usuario_id: {
                    bsonType: "objectId",
                    description: "Referência ao usuário destinatário."
                }
            }
        }
    }
});

// 4. Coleção de Eventos
db.createCollection("eventos", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nome", "descricao", "dataCriacao", "tipoEvento"],
            properties: {
                nome: {
                    bsonType: "string",
                    description: "Nome do evento."
                },
                descricao: {
                    bsonType: "string",
                    description: "Descrição do evento."
                },
                dataCriacao: {
                    bsonType: "date",
                    description: "Data de criação do evento."
                },
                tipoEvento: {
                    bsonType: "string",
                    enum: ["individual", "grupo"],
                    description: "Define se o evento é individual ou de grupo."
                }
            }
        }
    }
});

// 5. Coleção de Eventos Individuais
db.createCollection("eventos_individuais", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["evento_id", "visibilidade", "usuario_id"],
            properties: {
                evento_id: {
                    bsonType: "objectId",
                    description: "Referência ao documento na coleção 'eventos'."
                },
                visibilidade: {
                    bsonType: "bool",
                    description: "Indica se o evento é público ou privado."
                },
                usuario_id: {
                    bsonType: "objectId",
                    description: "Referência ao usuário criador do evento."
                }
            }
        }
    }
});

// 6. Coleção de Eventos de Grupo
db.createCollection("eventos_grupo", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["evento_id", "grupo_id"],
            properties: {
                evento_id: {
                    bsonType: "objectId",
                    description: "Referência ao documento na coleção 'eventos'."
                },
                grupo_id: {
                    bsonType: "objectId",
                    description: "Referência ao grupo organizador do evento."
                }
            }
        }
    }
});

// 7. Coleção de Grupos
db.createCollection("grupos", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nome"],
            properties: {
                nome: {
                    bsonType: "string",
                    description: "Nome do grupo."
                }
            }
        }
    }
});

// 8. Coleção de Relacionamento Usuário-Grupo
db.createCollection("usuarios_grupo", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["usuario_id", "grupo_id", "cargoOuPapel"],
            properties: {
                usuario_id: {
                    bsonType: "objectId",
                    description: "Referência ao usuário."
                },
                grupo_id: {
                    bsonType: "objectId",
                    description: "Referência ao grupo."
                },
                cargoOuPapel: {
                    bsonType: "string",
                    description: "Papel do usuário no grupo (ex.: 'admin' ou 'membro')."
                }
            }
        }
    }
});
