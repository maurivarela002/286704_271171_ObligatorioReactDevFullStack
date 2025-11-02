import { showErrorToast, showSuccessToast } from '../../utils/toast';

export const handleApiError = (error, defaultMessage = 'Error') => {
  const errorData = error?.response?.data || {};
  const message = errorData.message || error.message || defaultMessage;
  const title = errorData.title || 'Error';
  
  showErrorToast(message, title);
  return { message, title };
};

export const handleApiSuccess = (response, defaultMessage = 'Operación exitosa') => {
  const message = response?.data?.message || defaultMessage;
  const title = response?.data?.title || 'Éxito';
  
  showSuccessToast(message, title);
  return { message, title };
};