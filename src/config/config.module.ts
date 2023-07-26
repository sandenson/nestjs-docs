import { DynamicModule, Module } from '@nestjs/common';
import { ConfigurableModule } from 'src/configurable/configurable.module';
import { ConfigService } from './config.service';

@Module({
  imports: [ConfigurableModule.roberto({ folder: './config' })],
})
export class ConfigModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
