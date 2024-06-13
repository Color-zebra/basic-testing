// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';
const originConsoleLog = console.log;

jest.mock('./index', () => ({
  ...jest.requireActual<typeof import('./index')>('./index'),
  mockOne: () => undefined,
  mockTwo: () => undefined,
  mockThree: () => undefined,
}));

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  beforeEach(() => {
    console.log = originConsoleLog;
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    console.log = jest.fn();
    mockOne();
    mockTwo();
    mockThree();
    expect(console.log).toHaveBeenCalledTimes(0);
  });

  test('unmockedFunction should log into console', () => {
    console.log = jest.fn();
    unmockedFunction();

    expect(console.log).toHaveBeenCalledTimes(1);
  });
});
