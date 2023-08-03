import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DropAncienItemHandler } from './commands/handlers/drop-ancient-item.handler';
import { KillDragonHandler } from './commands/handlers/kill-dragon.handler';
import { HeroFoundItemHandler } from './events/handlers/hero-found-item.handler';
import { HeroKilledDragonHandler } from './events/handlers/hero-killed-dragon.handler';
import { HeroesGameController } from './heroes-game.controller';
import { GetHeroesHandler } from './queries/handlers/get-heroes.handler';
import { HeroRepository } from './repository/hero.repository';
import { HeroesGameSagas } from './sagas/heroes-game.saga';

export const CommandHandlers = [KillDragonHandler, DropAncienItemHandler];
export const EventHandlers = [HeroKilledDragonHandler, HeroFoundItemHandler];
export const QueryHandlers = [GetHeroesHandler];

@Module({
  imports: [CqrsModule],
  controllers: [HeroesGameController],
  providers: [
    HeroesGameSagas,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    HeroRepository,
  ],
})
export class HeroesGameModule {}
