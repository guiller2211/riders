export class ParseUtils {
  static parseBooleanFromString(value: string): boolean {
    // Note: .toString() is needed to support Vitest execution, even though parameter is typed
    return value.toString().toLowerCase() === 'true' || value === '1';
  }
}
