// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockResponseData = 'test';
const THROTTLE_TIME = 5000;

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockedAxios.create = jest.fn(() => mockedAxios);
    mockedAxios.get = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        data: mockResponseData,
      });
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const rightBaseUrl = 'https://jsonplaceholder.typicode.com';
    await throttledGetDataFromApi('asd');
    expect(mockedAxios.create).toHaveBeenCalledWith({ baseURL: rightBaseUrl });
  });

  test('should perform request to correct provided url', async () => {
    const providedPath = 'test';
    jest.advanceTimersByTime(THROTTLE_TIME);
    await throttledGetDataFromApi(providedPath);
    expect(mockedAxios.get).toHaveBeenCalledWith(providedPath);
  });

  test('should return response data', async () => {
    jest.advanceTimersByTime(THROTTLE_TIME);
    const res = await throttledGetDataFromApi('');
    expect(res).toEqual(mockResponseData);
  });
});
