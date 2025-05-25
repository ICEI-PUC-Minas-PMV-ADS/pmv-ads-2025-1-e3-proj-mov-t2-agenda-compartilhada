import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class AddMembersDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  members: string[]; // Array de emails ou IDs
}
