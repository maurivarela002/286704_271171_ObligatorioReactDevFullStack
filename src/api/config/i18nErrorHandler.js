import { useToast } from '../../utils/toast';
import { useTranslation } from 'react-i18next';

export const useApiHandlers = () => {
  const { showErrorToast, showSuccessToast } = useToast();
  const { t } = useTranslation('shared');

  const handleApiError = (error) => {
    const errorData = error?.data || {};
    const message = t(`errorsHttp.${errorData.status}.text`) || error.message || t('errorsHttp.serverError.text');
    const title = t(`errorsHttp.${errorData.status}.title`) || errorData.title || t('errorsHttp.serverError.title');
    showErrorToast(title, message);
    return { message, title };
  };

  const handleApiSuccess = (response) => {
    const message = response?.data?.message || t('success.200.text');
    const title = response?.data?.title || t('success.200.title');
    
    showSuccessToast(title, message);
    return { message, title };
  };

  return { handleApiError, handleApiSuccess };
};