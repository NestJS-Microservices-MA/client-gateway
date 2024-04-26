import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, ParseIntPipe } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.client
      .send({ cmd: 'create_product' }, createProductDto)
      .pipe(catchError((error) => {
        throw new RpcException(error);
      }));
  }

  @Get()
  findAllProducts(@Query() query: PaginationDto) {
    return this.client.send({ cmd: 'find_all_products' }, query);
  }

  @Get(':id')
  async findOneProduct(@Param('id') id: number) {
    return this.client
      .send({ cmd: 'find_one_product' }, { id })
      .pipe(catchError((error) => {
        throw new RpcException(error);
      }));
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.client
      .send({ cmd: 'update_product' }, { ...updateProductDto, id })
      .pipe(catchError((error) => {
        throw new RpcException(error);
      }));
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    return this.client
      .send({ cmd: 'remove_product' }, { id })
      .pipe(catchError((error) => {
        throw new RpcException(error);
      }));
  }
}
