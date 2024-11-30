export class CustomError extends Error {
  constructor(message, { statusCode, metadata } = {}) {
    super(message);
    this.statusCode = statusCode;
    this.metadata = metadata;
  }
}

export class ValidationError extends CustomError {
  constructor(message, metadata = {}) {
    super(message, { statusCode: 400, metadata });
  }
}

export class NotFoundError extends CustomError {
  constructor(message, metadata = {}) {
    super(message, { statusCode: 404, metadata });
  }
}

export class DatabaseError extends CustomError {
  constructor(message, metadata = {}) {
    super(message, { statusCode: 500, metadata });
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message, metadata = {}) {
    super(message, { statusCode: 401, metadata });
  }
}
