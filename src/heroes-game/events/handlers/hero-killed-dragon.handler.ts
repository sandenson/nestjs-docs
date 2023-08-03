import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { HeroRepository } from 'src/heroes-game/repository/hero.repository';
import { HeroKilledDragonEvent } from '../impl/hero-killed-dragon.event';

@EventsHandler(HeroKilledDragonEvent)
export class HeroKilledDragonHandler
  implements IEventHandler<HeroKilledDragonEvent>
{
  constructor(private repository: HeroRepository) {}

  handle(event: HeroKilledDragonEvent) {
    console.log(
      `Hero of id ${event.heroId} killed dragon of id ${event.dragonId}`,
    );
  }
}
