// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: -3, action: Action.Subtract, expected: 6 },
  { a: -4, b: -4, action: Action.Subtract, expected: 0 },
  { a: 1000, b: 0, action: Action.Multiply, expected: 0 },
  { a: 50, b: -0.1, action: Action.Multiply, expected: -5 },
  { a: 1000, b: 0, action: Action.Divide, expected: Infinity },
  { a: 50, b: -0.1, action: Action.Divide, expected: -500 },
  { a: -4, b: -4, action: Action.Exponentiate, expected: 1 / 256 },
  { a: 1000, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 1000, b: 0, action: 'asd', expected: null },
  { a: 1000, b: 0, action: 123, expected: null },
  { a: 50, b: 'asd', action: Action.Add, expected: null },
  { a: true, b: -0.1, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    `first arg is $a, second arg is $b, action is $action, expected res is $expected`,
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toEqual(expected);
    },
  );
});
