// Uncomment the code below and write your tests
import path from 'path';
import { doStuffByInterval, readFileAsynchronously, doStuffByTimeout } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(setTimeout).toHaveBeenLastCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(setInterval).toHaveBeenLastCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(7000);
    expect(callback).toHaveBeenCalledTimes(7);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'asd';
    jest.spyOn(path, 'join');
    readFileAsynchronously(pathToFile);
    expect(path.join).toHaveBeenCalledTimes(1);
  });

  test('should return null if file does not exist', async () => {
    const notExistigFilePath = 'asd';
    expect(readFileAsynchronously(notExistigFilePath)).resolves.toBe(null);
  });

  test('should return file content if file exists', async () => {
    const existingFilePath = `./fileToRead.txt`;
    const content = 'Test is passed!';
    expect(readFileAsynchronously(existingFilePath)).resolves.toEqual(content);
  });
});
