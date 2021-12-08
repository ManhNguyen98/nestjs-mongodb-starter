import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class ViewAuthFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.UNAUTHORIZED) return response.redirect('/login');
    if (status === HttpStatus.NOT_FOUND)
      return response
        .status(status)
        .render('404', { title: 'Not found', transparentNav: true });
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      if (process.env.NODE_ENV === 'production') {
        console.error(error.stack);
        return response
          .status(status)
          .render('500', { title: 'Server error', transparentNav: true });
      } else {
        const message = error.stack;
        return response.status(status).send(message);
      }
    }
  }
}
