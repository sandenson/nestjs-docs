import { Injectable, OnModuleInit } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { AppService } from '../app.service';
import { CatsService } from '../cats/cats.service';

@Injectable()
export class TestService implements OnModuleInit {
  constructor(private readonly moduleRef: ModuleRef) {}

  async onModuleInit() {
    // console.log(this.moduleRef.get(AppService).getHello()); // fails and throws an error
    console.log(this.moduleRef.get(AppService, { strict: false }).getHello());
    const contextId = ContextIdFactory.create();
    this.moduleRef.registerRequestByContextId({ tenantId: 'jorge' }, contextId);
    console.log(
      (
        await this.moduleRef.resolve(CatsService, contextId, {
          strict: false,
        })
      ).findAll(),
    );
  }

  test() {
    console.log('test');
  }
}
