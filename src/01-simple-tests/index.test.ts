// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const cases = [
      { a: 2, b: 2, res: 4 },
      { a: 3, b: -3, res: 0 },
      { a: -4, b: -4, res: -8 },
    ];

    cases.forEach(({ a, b, res }) => {
      expect(simpleCalculator({ a, b, action: Action.Add })).toEqual(res);
    });
  });

  test('should subtract two numbers', () => {
    const cases = [
      { a: 2, b: 2, res: 0 },
      { a: 3, b: -3, res: 6 },
      { a: -4, b: -4, res: 0 },
    ];

    cases.forEach(({ a, b, res }) => {
      expect(simpleCalculator({ a, b, action: Action.Subtract })).toEqual(res);
    });
  });

  test('should multiply two numbers', () => {
    const cases = [
      { a: 2, b: 2, res: 4 },
      { a: 3, b: -3, res: -9 },
      { a: -4, b: -4, res: 16 },
      { a: 1000, b: 0, res: 0 },
      { a: 50, b: -0.1, res: -5 },
    ];

    cases.forEach(({ a, b, res }) => {
      expect(simpleCalculator({ a, b, action: Action.Multiply })).toEqual(res);
    });
  });

  test('should divide two numbers', () => {
    const cases = [
      { a: 2, b: 2, res: 1 },
      { a: 3, b: -3, res: -1 },
      { a: -4, b: -4, res: 1 },
      { a: 1000, b: 0, res: Infinity },
      { a: 50, b: -0.1, res: -500 },
    ];

    cases.forEach(({ a, b, res }) => {
      expect(simpleCalculator({ a, b, action: Action.Divide })).toEqual(res);
    });
  });

  test('should exponentiate two numbers', () => {
    const cases = [
      { a: 2, b: 2, res: 4 },
      { a: 3, b: -3, res: 1 / 27 },
      { a: -4, b: -4, res: 1 / 256 },
      { a: 1000, b: 0, res: 1 },
    ];

    cases.forEach(({ a, b, res }) => {
      expect(simpleCalculator({ a, b, action: Action.Exponentiate })).toEqual(
        res,
      );
    });
  });

  test('should return null for invalid action', () => {
    const cases = [
      { a: 2, b: 2, res: null },
      { a: 3, b: -3, res: null },
      { a: -4, b: -4, res: null },
      { a: 1000, b: 0, res: null },
    ];

    const wrongActions = [0, 'some', Symbol('asd'), null, undefined, false];

    cases.forEach(({ a, b, res }) => {
      wrongActions.forEach((action) => {
        expect(simpleCalculator({ a, b, action })).toEqual(res);
      });
    });
  });

  test('should return null for invalid arguments', () => {
    const cases = [
      { a: '2', b: 2, res: null },
      { a: 3, b: true, res: null },
      { a: {}, b: -4, res: null },
      { a: 1000, b: null, res: null },
      { a: 1000, b: Symbol('asd'), res: null },
      { a: 1000, b: undefined, res: null },
    ];

    cases.forEach(({ a, b, res }) => {
      Object.values(Action).forEach((action) => {
        expect(simpleCalculator({ a, b, action })).toEqual(res);
      });
    });
  });
});
