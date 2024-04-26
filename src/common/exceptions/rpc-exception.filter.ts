import { Catch, ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RPCExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const rpcError = exception.getError();

    let message = rpcError as string;
    let status = HttpStatus.BAD_REQUEST;

    if (typeof rpcError === 'object') {
        if ('message' in rpcError) {
            message = rpcError.message as string;
        }
        if ('status' in rpcError) {
            status = isNaN(+rpcError.status) ? HttpStatus.BAD_REQUEST : rpcError.status as HttpStatus;
        }
    }

    return response.status(status).json({ status, message });
  }
}
