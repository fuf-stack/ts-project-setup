/* eslint-disable */

export interface Options {
  // Details about the last value.
  /** Last in the first group. */
  zebra: string;
  /** Middle in the first group. */
  Beta?: string;
  /** First in the first group. */
  alpha: string;

  // A separate group can start earlier in the alphabet.
  delta?: number;
  charlie: number;
}
