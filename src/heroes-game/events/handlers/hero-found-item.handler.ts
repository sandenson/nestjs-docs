import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { HeroRepository } from 'src/heroes-game/repository/hero.repository';
import { HeroFoundItemEvent } from '../impl/hero-found-item.event';

@EventsHandler(HeroFoundItemEvent)
export class HeroFoundItemHandler implements IEventHandler<HeroFoundItemEvent> {
  constructor(private readonly heroRepository: HeroRepository) {}

  async handle(event: HeroFoundItemEvent) {
    console.log('Async HeroFoundItemEvent...', event);
  }
}
