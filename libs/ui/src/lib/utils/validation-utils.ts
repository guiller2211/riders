export class ValidationUtils {
  static numberExpression = /^[0-9]+$/;

  static textExpression = /[a-zA-Z]/i;

  // eslint-disable-next-line no-useless-escape
  static emailExpression =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  static zipCodeExpression = /^[0-9]{5}(?:-[0-9]{4})?$/;

  static phoneExpression = /^[0-9]{5}/;

  static isFieldNumeric(field: string): boolean {
    return this.numberExpression.test(field);
  }

  static isFieldText(field: string): boolean {
    return this.textExpression.test(field);
  }

  static isOptionSelected(field: string): boolean {
    return !!(field && field.length > 0);
  }

  static validateMinLength(field: string, minLength: number): boolean {
    return !!(field && field.trim().length >= minLength);
  }

  static validateMaxLength(field: string, maxLength: number): boolean {
    return !!(field && field.trim().length <= maxLength);
  }

  static validateMinAndMaxLength(
    field: string,
    minLength: number,
    maxLength: number,
  ): boolean {
    return !!(
      field &&
      field.trim().length >= minLength &&
      field.trim().length <= maxLength
    );
  }

  static validateEmailAddress(email: string): boolean {
    return this.emailExpression.test(email);
  }

  static validateZipCode(zipCode: string): boolean {
    return this.zipCodeExpression.test(zipCode);
  }
}
