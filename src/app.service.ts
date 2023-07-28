import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { TestService } from './test/test.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly moduleRef: ModuleRef) {}

  onModuleInit() {
    this.moduleRef.get(TestService).test();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
