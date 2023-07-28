import {
  ConfigurableModuleBuilder,
  DynamicModule,
  Module,
} from '@nestjs/common';
import { ConfigurableService } from './configurable.service';

export interface ConfigurableModuleOptions {
  folder: string;
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<ConfigurableModuleOptions>()
  .setClassMethodName('roberto' /* could be anything */)
  .build();

@Module({
  providers: [
    ConfigurableService,
    { provide: MODULE_OPTIONS_TOKEN, useValue: { folder: 'a' } },
  ],
  exports: [ConfigurableService],
})
export class ConfigurableModule extends ConfigurableModuleClass {
  static jaime(options: typeof OPTIONS_TYPE): DynamicModule {
    console.log(MODULE_OPTIONS_TOKEN, OPTIONS_TYPE);
    return {
      // your custom logic here
      ...super.roberto(options),
    };
  }

  static jaimeAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    return {
      // your custom logic here
      ...super.robertoAsync(options),
    };
  }
}
