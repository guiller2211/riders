export abstract class BaseError extends Error {
  protected type?: string;

  protected constructor(type?: string) {
    super();
    this.type = type;
  }
}

export class ValidationError extends BaseError {
  constructor(message: string) {
    super('validation');
    this.message = message
      ? `Validation Error: ${message}`
      : 'Validation Error';
  }
}

export class AuthenticationError extends BaseError {
  constructor(message: string) {
    super('authentication');
    this.message = message
      ? `Authentication Error: ${message}`
      : 'Authentication Error';
  }
}

export class ResponseError extends BaseError {
  status: number;

  constructor(status: number, message?: string) {
    super('response');
    this.status = status;
    this.message = message ? `HTTP ${status}: ${message}` : `HTTP ${status}`;
  }
}

export class MethodNotImplementedError extends BaseError {
  constructor(message?: string) {
    super('not-implemented');
    this.message = message
      ? `Functionality Not Available: ${message}`
      : 'Functionality Not Available';
  }
}

export class ConfigurationError extends BaseError {
  constructor(message: string) {
    super('configuration');
    this.message = message
      ? `Configuration Error: ${message}`
      : 'Configuration Error';
  }
}

export class ConstantNotDefinedError extends BaseError {
  constructor(type: string, value: string) {
    super('constant-not-defined');
    this.message =
      type && value
        ? `Constant Not Defined [Type = ${type} | Value = ${value}]`
        : 'Constant Not Defined Error';
  }
}
