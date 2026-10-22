/* eslint-disable */

/* eslint-disable @typescript-eslint/consistent-type-definitions */
export type Options = { zebra: string; alpha: number };
export function getValue(): number {
  return 1;
}
export interface Callable {
  (): void;
  new (): Date;
}
export interface Documented {
  /** Nested object members do not require their own documentation. */
  nested: { zebra: string; alpha: number };
}
