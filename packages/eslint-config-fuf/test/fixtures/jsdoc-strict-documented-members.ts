/* eslint-disable */

/* eslint-disable @typescript-eslint/method-signature-style */
export interface Options {
  /** Additional values keyed by name. */
  [key: string]: unknown;
  /** Runs the operation. */
  run(): void;
  /** Optional request timeout in milliseconds. */
  timeout?: number;
}
