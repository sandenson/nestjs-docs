import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { HeroRepository } from 'src/heroes-game/repository/hero.repository';
import { DropAncientItemCommand } from '../impl/drop-ancient-item.command';

@CommandHandler(DropAncientItemCommand)
export class DropAncienItemHandler
  implements ICommandHandler<DropAncientItemCommand>
{
  constructor(
    private readonly heroRepository: HeroRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: DropAncientItemCommand): Promise<any> {
    console.log('Async DropAncientItemCommand...');

    const { heroId, itemId } = command;

    const hero = this.publisher.mergeObjectContext(
      await this.heroRepository.findOneById(+heroId),
    );

    hero.addItem(itemId);
    // hero.commit(); // needed if the model has autoCommit off
  }
}
