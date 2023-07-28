import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import path from 'path';
import {
  ConfigurableModuleOptions,
  MODULE_OPTIONS_TOKEN,
} from './configurable.module';

@Injectable()
export class ConfigurableService {
  private readonly envConfig: Record<string, any>;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: ConfigurableModuleOptions,
  ) {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
    this.envConfig = dotenv.parse(readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
