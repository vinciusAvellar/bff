import { IsString, IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCaronaDto {
  @IsString()
  origem: string;

  @IsString()
  destino: string;

  @IsDate()
  @Type(() => Date)
  dataHora: Date;

  @IsNumber()
  valor: number;
}
