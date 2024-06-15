import { AxiosStatic } from 'axios';

const axios = jest.createMockFromModule<AxiosStatic>('axios');
axios.get = jest.fn().mockReturnValue(Promise.resolve());
axios.create = jest.fn().mockReturnValue({ get: () => undefined });
export default axios;
