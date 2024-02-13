export class JsonUtils {
  static parseValueFromKey(
    json: { [index: string]: object },
    key: string,
    separator: string,
  ): string {
    let nestedJson: any = json;
    key.split(separator).forEach((keyPart: string) => {
      nestedJson = nestedJson[keyPart];
    });

    if (typeof nestedJson === 'object') {
      return JSON.stringify(nestedJson);
    }
    return nestedJson;
  }
}
