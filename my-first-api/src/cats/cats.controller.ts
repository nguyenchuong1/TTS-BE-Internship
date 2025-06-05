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
  Bind,ParseIntPipe
} from '@nestjs/common';
import { Response } from 'express';
import { CreateCatDto, UpdateCatDto } from './dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
@Controller('cats')
export class CatsController {
  constructor(private catsService:CatsService){}
  /**
   * POST /cats
   * Tạo mới một con mèo.
   */
  // @Post()
  // @HttpCode(201)
  // create(@Body() createCatDto: CreateCatDto): string {
  //   // Logic thêm mèo ở đây
  //   return 'This action adds a new cat';
  // }

  /**
   * GET /cats
   * Trả về danh sách mèo
   */
  // @Get()
  // findAll(): string[] {
  //   return ['Meo meo 1', 'Meo meo 2'];
  // }

  /**
   * GET /cats/docs?version=5
   * Redirect tới trang tài liệu
   */
  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version: string) {
    if (version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  
  @Get('hello')
  getHello(): string {
  return 'Hello Chuong Nguyen!';
  }
  /**
   * GET /cats/:id
   * Lấy chi tiết một con mèo theo ID
   */
  @Get(':id')
  async findOne(@Param('id',ParseIntPipe)id:number): Promise<Cat | undefined> {
  return this.catsService.findOne(id);
}
  /**
   * PUT /cats/:id
   * Cập nhật thông tin mèo
   */
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): string {
    return `This action updates a #${id} cat`;
  }
  /**
   * GET /cats/response
   * Dùng @Res để response manual
   */
  @Get('response')
  sendResponse(@Res() res: Response) {
    res.status(HttpStatus.OK).json({ message: 'Manual response using @Res' });
  }

  /**
   * GET /cats/with-status
   * Dùng passthrough để không bị mất tính năng tự động của NestJS
   */
  @Get('with-status')
  getWithPassthrough(@Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.OK);
    return ['This uses passthrough correctly'];
  }

  @Post()
  async create(@Body() createCatDto:CreateCatDto){
    const result=this.catsService.create(createCatDto);
    return { message: 'Cat created successfully', data: result };
  }
  @Get()
  async findAll():Promise<Cat[]>{
    return this.catsService.findALL();
  }
  /**
   * DELETE /cats/:id
   * Xóa một con mèo theo ID
   */
  @Delete(':id')
  remove_a_cat(@Param('id',ParseIntPipe)id:number):Cat[]{
    return this.catsService.remove_a_cat(id);
  }
  
}
