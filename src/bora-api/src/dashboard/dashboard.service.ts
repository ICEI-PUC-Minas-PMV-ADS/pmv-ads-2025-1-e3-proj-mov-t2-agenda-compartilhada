import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { GruposService } from '../grupos/grupos.service';
import { EventosService } from '../eventos/eventos.service';
import { ParticipacoesEventoService } from '../participacoes-evento/participacoes-evento.service';
import { UsersService } from '../users/users.service';
import { EventDto } from './dto/event.dto';
import { GroupDto } from './dto/group.dto';
import { Document } from 'mongoose';

// Interfaces para trabalhar com os documentos do MongoDB
interface GrupoWithId extends Document {
  nome: string;
  descricao?: string;
  membros: string[];
  grupoAdmins: string[];
  _id: {
    toString(): string;
  };
}

interface EventoWithId extends Document {
  titulo: string;
  dataEvento: Date;
  tipo: 'grupo' | 'individual';
  grupoId?: {
    toString(): string;
  };
  _id: {
    toString(): string;
  };
}

@Injectable()
export class DashboardService {
  constructor(
    private readonly gruposService: GruposService,
    private readonly eventosService: EventosService,
    private readonly participacoesEventoService: ParticipacoesEventoService,
    private readonly usersService: UsersService,
  ) {}

  /** Retorna os grupos do usuário */
  async findUserGroups(userId: string): Promise<GroupDto[]> {
    try {
      // Primeiro obtemos o usuário para conseguir o email
      const user = await this.usersService.findOne(userId);
      if (!user) {
        throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
      }

      // Busca os grupos usando o email do usuário
      const grupos = await this.gruposService.findByUserEmail(user.email);

      // Mapeia para o formato esperado pelo frontend
      return grupos.map((grupo) => {
        // Trata o grupo como documento do MongoDB com _id
        const grupoDoc = grupo as unknown as GrupoWithId;

        // Extrai o ID como string de forma segura
        const id = grupoDoc._id ? grupoDoc._id.toString() : '';

        // Extrai o nome e computa as iniciais
        const nome = grupoDoc.nome || '';
        const initials = nome
          .split(' ')
          .map((part) => part.charAt(0))
          .join('')
          .slice(0, 2)
          .toUpperCase();

        return {
          id,
          name: nome,
          initials,
        };
      });
    } catch (error) {
      // Tratamento seguro do erro
      const errorMessage =
        error instanceof Error ? error.message : 'Erro ao buscar grupos';
      throw new NotFoundException(errorMessage);
    }
  }

  /** Retorna próximos eventos de grupos e individuais */
  async findUpcomingEvents(userId: string): Promise<EventDto[]> {
    try {
      // Primeiro obtemos o usuário para conseguir o email
      const user = await this.usersService.findOne(userId);
      if (!user) {
        throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
      }

      // Busca os grupos do usuário
      const grupos = await this.gruposService.findByUserEmail(user.email);
      const gruposWithId = grupos as unknown as GrupoWithId[];

      // Extrai os IDs dos grupos de forma segura
      const grupoIds = gruposWithId
        .map((grupo) => {
          return grupo._id ? grupo._id.toString() : '';
        })
        .filter((id) => id !== '');

      // Busca todos os eventos
      const allEvents = await this.eventosService.findAll();
      const eventsWithId = allEvents as unknown as EventoWithId[];

      // Filtra eventos futuros dos grupos que o usuário participa
      const now = new Date();
      const grupoEvents = eventsWithId.filter((evento) => {
        return (
          evento.tipo === 'grupo' &&
          evento.grupoId != null &&
          grupoIds.includes(String(evento.grupoId)) &&
          evento.dataEvento instanceof Date &&
          evento.dataEvento.getTime() >= now.getTime()
        );
      });

      // Busca participações em eventos
      const participations = await this.participacoesEventoService.findAll();

      // Filtra eventos que o usuário participa
      const myEventIds = participations
        .filter((p) => p.usuarioId === userId)
        .map((p) => String(p.eventoId));

      // Filtra eventos individuais que o usuário participa
      const indivEvents = eventsWithId.filter((evento) => {
        return (
          evento.tipo === 'individual' &&
          evento._id &&
          myEventIds.includes(evento._id.toString()) &&
          evento.dataEvento instanceof Date &&
          evento.dataEvento.getTime() >= now.getTime()
        );
      });

      // Combina e ordena os eventos
      const merged = [...grupoEvents, ...indivEvents].sort((a, b) => {
        if (a.dataEvento instanceof Date && b.dataEvento instanceof Date) {
          return a.dataEvento.getTime() - b.dataEvento.getTime();
        }
        return 0;
      });

      // Mapeia para o formato esperado pelo frontend
      return merged.map((evento) => {
        // Extrai ID do evento
        const eventId = evento._id ? evento._id.toString() : '';

        // Busca o grupo associado ao evento (se houver)
        const grupo = gruposWithId.find((g) => {
          return (
            g._id &&
            evento.grupoId &&
            g._id.toString() === evento.grupoId.toString()
          );
        });

        // Conta participantes
        const count = participations.filter((p) => {
          return p.eventoId.toString() === eventId;
        }).length;

        // Formata o DTO
        return {
          id: eventId,
          title: evento.titulo || '',
          group: grupo ? grupo.nome : null,
          date: evento.dataEvento,
          time: evento.dataEvento,
          participants: count,
          colorCode: evento.tipo === 'grupo' ? '#7839EE' : '#53E88B',
        };
      });
    } catch (error) {
      // Tratamento seguro do erro
      const errorMessage =
        error instanceof Error ? error.message : 'Erro ao buscar eventos';
      throw new InternalServerErrorException(errorMessage);
    }
  }
}
