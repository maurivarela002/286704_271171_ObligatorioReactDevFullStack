import { useToast } from '../../utils/toast';
import { useTranslation } from 'react-i18next';

export const useApiHandlers = () => {
  const { showErrorToast, showSuccessToast } = useToast();
  const { t } = useTranslation('shared');

  const handleApiError = (error, defaultMessage = t('errorsHttp.serverError.text')) => {
    console.log('error', error);
    const errorData = error?.data || {};
    const message = errorData.message || error.message || defaultMessage;
    const title = errorData.title || t('errorsHttp.serverError.title');
    
    showErrorToast(title, message);
    return { message, title };
  };

  const handleApiSuccess = (response, defaultMessage = t('success.operation.text')) => {
    console.log('response', response);
    const message = response?.data?.message || defaultMessage;
    const title = response?.data?.title || t('success.operation.title');
    
    showSuccessToast(title, message);
    return { message, title };
  };

  return { handleApiError, handleApiSuccess };
};