export class EventDto {
  id: string;
  title: string;
  group: string | null;
  date: Date;
  time: Date;
  participants: number;
  colorCode: string;
  confirmados: string[];
  recusas: string[];
}
