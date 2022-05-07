export const capitalizeFirstLetter = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1);

export const camelCaseBuildReducer = (previous: string, current: string): string =>
  previous + capitalizeFirstLetter(current);

export const lodashSplitToCamelCase = (key: string): string =>
  key
    .split('_')
    .reduce(
      (acc: string, keyPart: string, i: number) =>
        i !== 0 ? acc + capitalizeFirstLetter(keyPart) : acc + keyPart,
      '',
    );

export const lowDashToCamelCase = <T>(object: Record<string, any>): T =>
  Object.entries(object).reduce(
    (acc, [key, value]): Record<string, any> => ({
      ...acc,
      [lodashSplitToCamelCase(key)]: value,
    }),
    {},
  ) as T;
