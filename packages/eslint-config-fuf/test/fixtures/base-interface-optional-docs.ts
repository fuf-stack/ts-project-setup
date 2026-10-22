/* eslint-disable */

/* eslint-disable @typescript-eslint/method-signature-style */
export interface Options {
  [key: string]: unknown;
  /** */
  empty?: boolean;
  missing: string;
  // Ordinary comments are fine when strict documentation is not enabled.
  plain: number;
  run(): void;
  /** @deprecated */
  tagged?: string;
}
