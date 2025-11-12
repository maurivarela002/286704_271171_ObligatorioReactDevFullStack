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
      const { data, status, statusText } = error.response;
      const errorMessage = data?.message || statusText || 'Error del servidor';

      const formattedError = {
        message: errorMessage,
        status: status,
        data: data,
        statusText: statusText
      };

      errorHandler.handleError(formattedError, status);
      return Promise.reject(formattedError);
    }
    else if (error.request) {
      const networkError = {
        message: 'Error de conexión',
        status: 0,
        data: { message: 'No se pudo conectar al servidor' }
      };
      errorHandler.handleError(networkError, 0);
      return Promise.reject(networkError);
    }
    else {
      const configError = {
        message: error.message || 'Error en la configuración de la petición',
        status: 400,
        data: { message: error.message }
      };
      errorHandler.handleError(configError, 400);
      return Promise.reject(configError);
    }
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