// En apiManage.js
import HttpErrorHandler from '../config/httpErrorHandler';

const errorHandler = new HttpErrorHandler();
const BASE_URL = 'http://localhost:3000';

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
    
    errorHandler.handle(error.response, error);
    throw error;
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
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const api = {
  get: createApiMethod('GET'),
  post: createApiMethod('POST'),
  put: createApiMethod('PUT'),
  delete: createApiMethod('DELETE'),
};