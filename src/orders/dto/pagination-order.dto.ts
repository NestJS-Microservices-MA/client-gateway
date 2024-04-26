import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/common";
import { OrderStatus, OrderStatusList } from "../enum/order.enum";

export class PaginationOrderDto extends PaginationDto {
    @IsOptional()
    @IsEnum(OrderStatusList, {
        message: `status must be one of the following values: ${OrderStatusList.join(', ')}`
    })
    status: OrderStatus;
}
