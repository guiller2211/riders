export const filterListByProperty = <T>(
  spaceName: keyof T,
  value: boolean | string | number,
  list: T[],
) => list.filter((item) => item[spaceName] === value);
