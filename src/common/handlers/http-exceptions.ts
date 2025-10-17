export class HttpException extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string = "Bad request") {
    super(400, message);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string = "Internal server error") {
    super(500, message);
  }
}
