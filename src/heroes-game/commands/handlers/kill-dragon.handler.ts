import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { HeroRepository } from 'src/heroes-game/repository/hero.repository';
import { Hero } from '../../models/hero.model';
import { KillDragonCommand } from '../impl/kill-dragon.command';

@CommandHandler(KillDragonCommand)
export class KillDragonHandler implements ICommandHandler<KillDragonCommand> {
  constructor(
    private repository: HeroRepository,
    private publisher: EventPublisher,
  ) {}

  async execute(command: KillDragonCommand) {
    const { heroId, dragonId } = command;
    const hero: Hero = this.publisher.mergeObjectContext(
      await this.repository.findOneById(+heroId),
    );

    hero.killEnemy(dragonId);
    // hero.commit(); // needed if the model has autoCommit off
  }
}
