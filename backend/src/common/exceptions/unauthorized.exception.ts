import { HttpException, HttpStatus } from '@nestjs/common';

const DEFAULT_MESSAGE = 'User not authorized';

export class UnauthorizedException extends HttpException {
  constructor(message: string = DEFAULT_MESSAGE) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
