export const getDefault = <T>(spaceName: keyof T, list: T[]) =>
  list.find((listItem) => Boolean(listItem[spaceName]));
