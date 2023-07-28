import { Module } from '@nestjs/common';
import { CatsService } from 'src/cats/cats.service';
import { CommonService } from './common.service';

@Module({
  providers: [CommonService, CatsService],
  exports: [CommonService],
})
export class CommonModule {}
