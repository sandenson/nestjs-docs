import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  UseFilters
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
// @UseFilters(HttpExceptionFilter) // controller-scoped exception filter
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @HttpCode(204)
  @UseFilters(HttpExceptionFilter) // method-scoped exception filter
  create(@Body() dto: CreateCatDto) {
    // throw new ForbiddenException();
    this.catsService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): string {
    return `This action returns a #${id} cat`;
  }

  @Get(':id/promise')
  async findOnePromise(@Param('id') id: number): Promise<string> {
    return `This action returns a #${id} cat`;
  }

  @Get(':id/observable')
  findOneObservable(@Param('id') id: number): Observable<string> {
    return of(`This action returns a #${id} cat`);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get('ab*cd')
  test() {
    return 'This is a wildcard test';
  }

  @Get('redirect1')
  @Redirect('https://nestjs.com', 301)
  redirect1() {
    return;
  }

  @Get('redirect2')
  @Redirect()
  redirect2() {
    return {
      url: 'https://nestjs.com',
      statusCode: 301,
    };
  }

  @Get('redirect3')
  @Redirect('https://www.last.fm', 302)
  getDocs(@Query('me') me: boolean | undefined) {
    if (me) {
      return { url: 'https://www.last.fm/user/sandenson/library' };
    }
  }
}
