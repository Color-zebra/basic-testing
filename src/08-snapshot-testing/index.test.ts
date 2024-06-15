// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const dataForFirstTest = {
    value: 1,
    next: {
      value: null,
      next: null,
    },
  };

  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList([1])).toStrictEqual(dataForFirstTest);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList([1, 2])).toMatchSnapshot();
  });
});
