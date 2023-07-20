import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @HttpCode(204)
  create(@Body() dto: CreateCatDto): string {
    return 'This action adds a new cat ' + JSON.stringify(dto);
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
    return 'This action returns all cats';
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
