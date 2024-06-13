// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const values = [1, 'test', true, false, null, undefined];
    const results = await Promise.all(values.map((val) => resolveValue(val)));
    results.forEach((val, i) => {
      expect(val).toEqual(values[i]);
    });
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const msg = 'My test msg';
    expect(() => throwError(msg)).toThrow(msg);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(throwError).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(rejectCustomError).rejects.toThrow(MyAwesomeError);
  });
});
