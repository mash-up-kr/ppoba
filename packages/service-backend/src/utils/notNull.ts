export function notNull<T>(
  value: Nullable<T>,
  throwError: () => never = () => {
    throw new TypeError('Nullable value found for notNull assertion');
  }
): NonNullable<T> {
  if (value == null) {
    throwError();
  }
  return value;
}

export type Nullable<T> = T | null | undefined;
