import { Module } from '@nestjs/common';
import { CommonService } from '../common/common.service';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService, CommonService],
  exports: [CatsService],
})
export class CatsModule {}
