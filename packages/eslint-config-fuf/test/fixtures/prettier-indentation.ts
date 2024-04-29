/* eslint-disable */

// indent types
type SomeTypeMagic = DoSomeTypeMagicThatIsVeryComplicatedSoItHasToBreak<[TypeMagicInputType]>;

// indent ternary
const createdAt = active
  ? // set active data to actual date
  parseDate(data.createdAt).toISOString()
  : // set inactive data to end of month
  parseDate(data.createdAt).endOf('month').toISOString();
