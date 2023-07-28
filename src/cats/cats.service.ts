import { Inject, Injectable, Scope } from '@nestjs/common';
import { INQUIRER, REQUEST } from '@nestjs/core';
import { Cat } from './interfaces/cat.interface';

@Injectable({ scope: Scope.REQUEST, durable: true })
export class CatsService {
  private readonly cats: Cat[] = [];

  constructor(
    @Inject(REQUEST) private request: { tenantId: string },
    @Inject(INQUIRER) private parentClass: object,
  ) {
    console.log('constructor', this.request.tenantId);
  }

  create(cat: Cat) {
    console.log('create', this.request.tenantId);
    this.cats.push(cat);
  }

  findAll() {
    console.log(
      this.parentClass?.constructor?.name,
      'findAll',
      this.request.tenantId,
      this.request,
    );
    return this.cats;
  }
}
