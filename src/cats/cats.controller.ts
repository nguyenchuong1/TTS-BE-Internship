import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  Res,
  HttpStatus,
  Redirect,
  HttpCode,
  Bind,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateCatDto, UpdateCatDto } from './dto';
import { CatsService } from './cats.service';
// import { Cat } from './interfaces/cat.interface';
import { Cat } from './common/entities/cat.entity';
import { Public } from 'src/auths/decorator/auth.decorator';
@ApiBearerAuth()
@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Public()
  @Get('hello')
  @ApiOperation({ summary: 'Test endpoint' })
  getHello(): string {
    return this.catsService.getHello();
  }
  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Find a cat by ID' })
  @ApiResponse({ status: 200, description: 'The found record', type: Cat })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Cat | undefined> {
    return this.catsService.findOne(id);
  }
  @Public()
  @Put(':id')
  @ApiOperation({ summary: 'Update a cat by ID' })
  @ApiBody({ type: UpdateCatDto })
  @ApiResponse({ status: 200, description: 'Cat updated' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCatDto: UpdateCatDto): string {
    return `This action updates a #${id} cat`;
  }
  @Public()
  @Post()
  @ApiOperation({ summary: 'Create a new cat' })
  @ApiBody({ type: CreateCatDto })
  @ApiResponse({ status: 201, description: 'Cat created successfully', type: CreateCatDto })
  async create(@Body() createCatDto: CreateCatDto) {
    const result = this.catsService.create(createCatDto);
    return { message: 'Cat created successfully', data: result };
  }
  @Public()
  @Get()
  @ApiOperation({ summary: 'List all cats' })
  @ApiResponse({ status: 200, description: 'List of cats', type: [CreateCatDto] })
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
  @Public()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cat by ID' })
  @ApiResponse({ status: 200, description: 'Cat deleted' })
  removeCat(@Param('id', ParseIntPipe) id: number): Cat[] {
    return this.catsService.removeCat(id);
  }
}
