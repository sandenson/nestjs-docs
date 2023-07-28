import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Roles } from 'src/decorators/roles.decorator';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { RolesGuard } from 'src/guards/roles.guard';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { ParseIntPipe } from 'src/pipes/parse-int.pipe';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller({
  path: 'cats',
  // scope: Scope.REQUEST,
})
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
// @UseFilters(HttpExceptionFilter) // controller-scoped exception filter
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // @UsePipes(new JoiValidationPipe(createCatSchema))
  // @SetMetadata('roles', ['admin'])
  @Post()
  @HttpCode(204)
  @UseFilters(HttpExceptionFilter) // method-scoped exception filter
  @UseGuards(RolesGuard)
  @Roles('admin')
  create(@Body(new ValidationPipe()) dto: CreateCatDto) {
    // throw new ForbiddenException();
    this.catsService.create(dto);
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe(),
      // new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): string {
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
