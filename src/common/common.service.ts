import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CatsService } from '../cats/cats.service';

@Injectable()
export class CommonService {
  constructor(
    @Inject(forwardRef(() => CatsService))
    private readonly catsService: CatsService,
  ) {}
}
