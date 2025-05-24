// setup_node.js
import { config } from 'dotenv';
import { MongoClient } from 'mongodb';

config(); // carrega variáveis do .env

async function runSetup() {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/bora-db";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("bora-db"); // substitua pelo nome do seu banco de dados

    // 1. Coleção de Usuários
    await db.createCollection("usuarios", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "email", "password"], // Modificado para os nomes que o código usa
          properties: {
            name: { bsonType: "string" },        // 'nome' alterado para 'name'
            email: { bsonType: "string" },
            password: { bsonType: "string" },    // 'senha' alterado para 'password'
            // Remova ou torne opcionais os campos que o código não inclui quando cria usuários
            dataCriacao: { bsonType: "date", description: "Campo opcional" },
            dataAtualizacao: { bsonType: "date", description: "Campo opcional" }
          }
        }
      }
    });
    console.log("Coleção 'usuarios' criada.");

    // 2. Coleção de Perfis
    await db.createCollection("perfis", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["usuario_id", "tema", "idioma", "preferenciaNotificacao", "foto"],
          properties: {
            usuario_id: { bsonType: "objectId" },
            tema: { bsonType: "string" },
            idioma: { bsonType: "string" },
            preferenciaNotificacao: { bsonType: "string" },
            foto: { bsonType: "string" }
          }
        }
      }
    });
    console.log("Coleção 'perfis' criada.");

    // 3. Coleção de Notificações
    await db.createCollection("notificacoes", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["titulo", "descricao", "dataHora", "usuario_id", "lida"],
          properties: {
            titulo: { bsonType: "string" },
            descricao: { bsonType: "string" },
            dataHora: { bsonType: "date" },
            usuario_id: { bsonType: "objectId" },
            lida: { bsonType: "bool" }
          }
        }
      }
    });
    console.log("Coleção 'notificacoes' criada.");

    // 4. Coleção de Eventos
    await db.createCollection("eventos", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["titulo", "descricao", "dataCriacao", "dataInicio", "dataFim", "tipo", "criador_id"],
          properties: {
            titulo: { bsonType: "string" },
            descricao: { bsonType: "string" },
            dataCriacao: { bsonType: "date" },
            dataInicio: { bsonType: "date" },
            dataFim: { bsonType: "date" },
            tipo: { bsonType: "string", enum: ["individual", "grupo"] },
            criador_id: { bsonType: "objectId" },
            visibilidade: {
              bsonType: "string",
              enum: ["privado", "compartilhado"],
              description: "Opção de visibilidade do evento (opcional)"
            }
          }
        }
      }
    });
    console.log("Coleção 'eventos' criada.");

    // Continue com as outras coleções seguindo o mesmo padrão...
    // Coleção de eventos_individuais
    await db.createCollection("eventos_individuais", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["evento_id", "visibilidade", "usuario_id"],
          properties: {
            evento_id: { bsonType: "objectId" },
            visibilidade: { bsonType: "string", enum: ["privado", "compartilhado"] },
            usuario_id: { bsonType: "objectId" }
          }
        }
      }
    });
    console.log("Coleção 'eventos_individuais' criada.");

    // Coleção de eventos_grupo
    await db.createCollection("eventos_grupo", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["evento_id", "grupo_id"],
          properties: {
            evento_id: { bsonType: "objectId" },
            grupo_id: { bsonType: "objectId" }
          }
        }
      }
    });
    console.log("Coleção 'eventos_grupo' criada.");

    // Coleção de grupos
    await db.createCollection("grupos", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["nome", "descricao", "dataCriacao"],
          properties: {
            nome: { bsonType: "string" },
            descricao: { bsonType: "string" },
            dataCriacao: { bsonType: "date" }
          }
        }
      }
    });
    console.log("Coleção 'grupos' criada.");

    // Coleção de associacoes_grupo
    await db.createCollection("associacoes_grupo", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["usuario_id", "grupo_id", "papel", "dataEntrada"],
          properties: {
            usuario_id: { bsonType: "objectId" },
            grupo_id: { bsonType: "objectId" },
            papel: { bsonType: "string" },
            dataEntrada: { bsonType: "date" }
          }
        }
      }
    });
    console.log("Coleção 'associacoes_grupo' criada.");

    // Coleção de participacoes_evento
    await db.createCollection("participacoes_evento", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["evento_id", "usuario_id", "status"],
          properties: {
            evento_id: { bsonType: "objectId" },
            usuario_id: { bsonType: "objectId" },
            status: { bsonType: "string", enum: ["invited", "confirmed", "declined"] }
          }
        }
      }
    });
    console.log("Coleção 'participacoes_evento' criada.");

    // Coleção de calendarios
    await db.createCollection("calendarios", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["nome", "tipo", "dono_id"],
          properties: {
            nome: { bsonType: "string" },
            tipo: { bsonType: "string", enum: ["usuario", "grupo"] },
            dono_id: { bsonType: "objectId" }
          }
        }
      }
    });
    console.log("Coleção 'calendarios' criada.");

    // Coleção de calendarios_eventos
    await db.createCollection("calendarios_eventos", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["calendario_id", "evento_id"],
          properties: {
            calendario_id: { bsonType: "objectId" },
            evento_id: { bsonType: "objectId" }
          }
        }
      }
    });
    console.log("Coleção 'calendarios_eventos' criada.");

    // Coleção de recuperacao_senha
    await db.createCollection("recuperacao_senha", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["usuario_id", "token", "data_expiracao"],
          properties: {
            usuario_id: { bsonType: "objectId" },
            token: { bsonType: "string" },
            data_expiracao: { bsonType: "date" }
          }
        }
      }
    });
    console.log("Coleção 'recuperacao_senha' criada.");

  } catch (error) {
    console.error("Erro ao criar coleções:", error);
  } finally {
    await client.close();
  }
}

runSetup();
