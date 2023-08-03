import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { HeroRepository } from '../../../heroes-game/repository/hero.repository';
import { GetHeroesQuery } from '../impl/get-heroes.query';

@QueryHandler(GetHeroesQuery)
export class GetHeroesHandler implements ICommandHandler<GetHeroesQuery> {
  constructor(private repository: HeroRepository) {}

  async execute(query: GetHeroesQuery) {
    console.log('Async GetHeroesQuery...');
    return this.repository.findAll();
  }
}
