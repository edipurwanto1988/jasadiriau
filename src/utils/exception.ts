export class HttpException extends Error {
  status: number;

  constructor(message: string, status: number = 500) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}

export class NotFoundException extends HttpException {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export class BadRequestException extends HttpException {
  constructor(message = "Bad request") {
    super(message, 400);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class ValidationException extends HttpException {
  constructor(message = 'Validation failed') {
    super(message, 422);
  }
}