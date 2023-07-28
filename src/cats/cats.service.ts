import { Inject, Injectable, Scope, forwardRef } from '@nestjs/common';
import { INQUIRER, ModuleRef, REQUEST } from '@nestjs/core';
import { CommonService } from 'src/common/common.service';
import { Cat } from './interfaces/cat.interface';

@Injectable({ scope: Scope.REQUEST, durable: true })
export class CatsService {
  private readonly cats: Cat[] = [];

  constructor(
    @Inject(REQUEST) private readonly request: { tenantId: string } | undefined,
    @Inject(INQUIRER) private readonly parentClass: object,
    @Inject(forwardRef(() => CommonService))
    private readonly commonService: CommonService,
    private readonly moduleRef: ModuleRef,
  ) {
    console.log('constructor', this.request?.tenantId);
    // const contextId = ContextIdFactory.getByRequest(request);
    // console.log('dit it work?', contextId); // it didn't, it's a fake request
    // this.moduleRef
    //   .resolve(TestService, contextId)
    //   .then((testService) => testService.test());
  }

  create(cat: Cat) {
    console.log('create', this.request?.tenantId);
    this.cats.push(cat);
  }

  findAll() {
    console.log(
      this.parentClass?.constructor?.name,
      'findAll',
      this.request?.tenantId,
      this.request,
    );
    return this.cats;
  }
}
