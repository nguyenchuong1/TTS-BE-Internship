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
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatsService } from './cats.service';
// import { Cat } from './interfaces/cat.interface';
import { Cat } from './common/entities/cat.entity';
import { Public } from 'src/auths/decorator/auth.decorator';
@ApiBearerAuth()
@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

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
  async findOne(@Param('id') id: number): Promise<Cat> {
    const cat= await this.catsService.findOne(id);
    if(!cat){
      throw new Error('Cat not found!');
    }else{
      return cat;
    }
  }

  @Public()
  @Put(':id')
  @ApiOperation({ summary: 'Update a cat by ID' })
  @ApiBody({ type: UpdateCatDto })
  @ApiResponse({ status: 200, description: 'Cat updated' })
  async update(
  @Param('id') id: number,@Body() updatecat: UpdateCatDto,): Promise<Cat|null> {
    const cat = await this.catsService.update(id, updatecat);
    if(!cat){
      throw new NotFoundException(`Cat with id ${id} not found!`);
    }else{
      return cat;
    }
  }

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create a new cat' })
  @ApiBody({ type: CreateCatDto })
  @ApiResponse({ status: 201, description: 'Cat created successfully', type: CreateCatDto })
  create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'List all cats' })
  @ApiResponse({ status: 200, description: 'List of cats', type: [CreateCatDto] })
  async findAll(): Promise<Cat[]> {
    return await this.catsService.findAll();
  }

  @Public()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cat by ID' })
  @ApiResponse({ status: 200, description: 'Cat deleted' })
  async remove(@Param('id') id: number): Promise<void> {
    const cat= await this.catsService.findOne(id);
    if(!cat){
      throw new Error('Cat not found!');
    }else{
      return await this.catsService.delete(id);
    }
  }
}
