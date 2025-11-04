// En apiManage.js
import errorHandler from '../config/globalHttpErrorHandler';

const BASE_URL = 'http://localhost:3000';
const BASE_URL_PROD = 'https://286704-271171-obligatorio-dev-full.vercel.app';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': localStorage.getItem('token') || '',
});

const handleResponse = async (response) => {
  try {
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || 'Error en la solicitud');
      error.response = {
        status: response.status,
        statusText: response.statusText,
        data: data
      };
      throw error;
    }

    return data;
  } catch (error) {
    if (!error.response) {
      error.response = {
        status: error.status || 500,
        statusText: error.message || 'Error de conexión',
        data: error.data || {}
      };
    }

    errorHandler.handleError(error, error.response.status);
    return Promise.reject(error);
  }
};

const createApiMethod = (method) => async (endpoint, data) => {
  const options = {
    method,
    headers: getHeaders(),
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${BASE_URL_PROD}${endpoint}`, options);
    return await handleResponse(response);
  } catch (error) {
    if (!error.response) {
      error.response = {
        status: error.status || 500,
        statusText: error.message || 'Error de conexión',
        data: error.data || {}
      };
    }

    errorHandler.handleError(error.response, error.response.status);
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