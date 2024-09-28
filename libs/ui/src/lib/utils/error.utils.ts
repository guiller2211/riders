export class ErrorUtils {
  /**
   * Evaluates whether an object is of type {@link BaseError}
   * @param object Object to evaluate
   */

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  static isError(object: any) {
    return object && Object.getPrototypeOf(object).name === 'Error';
  }
}
