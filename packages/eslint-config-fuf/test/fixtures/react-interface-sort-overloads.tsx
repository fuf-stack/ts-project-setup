/* eslint-disable */

/* eslint-disable @typescript-eslint/method-signature-style */
export interface Operations {
  /** Text input. */
  run(value: string): string;
  /** Stops the operation. */
  stop(): void;
  /** Numeric input. */
  run(value: number): number;
}
