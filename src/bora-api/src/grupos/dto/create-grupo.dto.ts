import { CreateEventoDto } from '../../eventos/dto/create-evento.dto'

export class CreateGrupoDto {
  readonly nome: string;
  descricao: string;
  membros: string[];
  eventos: CreateEventoDto[];
}
