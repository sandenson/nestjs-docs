import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurableService } from './configurable.service';

describe('ConfigurableService', () => {
  let service: ConfigurableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigurableService],
    }).compile();

    service = module.get<ConfigurableService>(ConfigurableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
