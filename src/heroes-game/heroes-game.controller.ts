import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { KillDragonCommand } from './commands/impl/kill-dragon.command';
import { KillDragonDto } from './dto/kill-dragon.dto';
import { Hero } from './models/hero.model';
import { GetHeroesQuery } from './queries/impl/get-heroes.query';

@Controller('heroes-game')
export class HeroesGameController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post(':id/kill')
  @UsePipes(ValidationPipe)
  async killDragon(
    @Param('id') id: string,
    @Body() dto: KillDragonDto,
  ): Promise<void> {
    try {
      return this.commandBus.execute(new KillDragonCommand(id, dto.dragonId));
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  async findAll(): Promise<Hero[]> {
    return this.queryBus.execute(new GetHeroesQuery());
  }
}
