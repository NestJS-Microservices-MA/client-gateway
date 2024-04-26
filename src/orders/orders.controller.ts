import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

import { NATS_SERVICE } from 'src/config';
import { CreateOrderDto, PaginationOrderDto } from './dto';
import { PaginationDto } from 'src/common';
import { StatusDto } from './dto/status.dto';


@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.client
      .send('createOrder', createOrderDto)
      .pipe(catchError((error) => {
        throw new RpcException(error);
      }));
  }

  @Get()
  findAllOrders(@Query() query: PaginationOrderDto) {
    return this.client
      .send('findAllOrders', query)
      .pipe(catchError((error) => {
        throw new RpcException(error);
      }));
  }

  @Get('id/:uuid')
  async findOneOrder(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.client
      .send('findOneOrder', { uuid })
      .pipe(catchError((error) => {
        throw new RpcException(error);
      }));
  }

  @Get(':status')
  async findAllOrdersByStatus(
    @Query() pagination: PaginationDto,
    @Param() statusDto: StatusDto
  ) {
    return this.client
      .send('findAllOrders', {
        ...pagination,
        status: statusDto.status,
      })
      .pipe(catchError((error) => {
        throw new RpcException(error);
      }));
  }

  @Patch(':uuid')
  async updateOrderStatus(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() statusDto: StatusDto
  ) {
    return this.client
      .send('updateOrderStatus', { uuid, status: statusDto.status })
      .pipe(catchError((error) => {
        throw new RpcException(error);
      }));
  }
}
