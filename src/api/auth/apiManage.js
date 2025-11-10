import axios from 'axios';
import errorHandler from '../../api/config/globalHttpErrorHandler';

const BASE_URL = 'http://localhost:3000';
const BASE_URL_PROD = 'https://286704-271171-obligatorio-dev-full.vercel.app/';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && !config.notToken) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data?.status >= 200 && data?.status < 300) {
      errorHandler.handleSuccess(data, data.status);
    }
    return data;
  },
  (error) => {
    if (error.response) {
      errorHandler.handleError(
        error.response.data || error.response,
        error.response.status
      );
    } else {
      const customError = {
        response: {
          status: error.status || 500,
          statusText: error.message || 'Error de conexión',
          data: error.data || {}
        }
      };
      errorHandler.handleError(customError.response, customError.response.status);
    }
    return Promise.reject(error);
  }
);

const createApiMethod = (method) => async (endpoint, data, notToken = false) => {
  const config = {
    method: method.toLowerCase(),
    url: endpoint,
    notToken: notToken
  };

  if (method === 'GET') {
    config.params = data;
  } else {
    config.data = data;
  }

  try {
    const response = await apiClient.request(config);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const api = {
  get: createApiMethod('GET'),
  post: createApiMethod('POST'),
  put: createApiMethod('PUT'),
  delete: createApiMethod('DELETE'),
};

export { errorHandler };