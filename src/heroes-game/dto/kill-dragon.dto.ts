import { IsNotEmpty, IsNumberString } from 'class-validator';

export class KillDragonDto {
  @IsNotEmpty()
  @IsNumberString()
  dragonId: string;
}
