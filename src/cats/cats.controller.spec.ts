import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { CommonService } from '../common/common.service';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

describe('CatsController', () => {
  let controller: CatsController;
  let service: CatsService;
  const contextId = ContextIdFactory.create();
  jest
    .spyOn(ContextIdFactory, 'getByRequest')
    .mockImplementation(() => contextId);

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService, CommonService],
    }).compile();

    controller = await moduleRef.resolve<CatsController>(
      CatsController,
      contextId,
    );
    service = await moduleRef.resolve<CatsService>(CatsService, contextId);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result: Cat[] = [
        { age: 1, breed: 'siamese', name: 'catthew mccatface' },
      ];
      jest.spyOn(service, 'findAll').mockImplementation(() => result);

      console.log('kek', controller.findAll());
      expect(controller.findAll()).toBe(result);
    });
  });
});
