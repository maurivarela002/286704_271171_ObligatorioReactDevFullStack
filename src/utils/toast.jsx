import { toast } from 'react-toastify';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const useToast = () => {
  const theme = useTheme();
  const { t } = useTranslation('shared');

  const showErrorToast = (title, text) => {
    toast.error(
      <div>
        {title ? <div style={{ fontWeight: 'bold' }}>{t(title)}</div> : null}
        {text ? <div>{t(text)}</div> : null}
      </div>,
      {
        position: 'bottom-left',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.error.main,
          border: '1px solid',
          borderColor: theme.palette.error.dark,
        },
      }
    );
  };

  const showSuccessToast = (title, text) => {
    toast.success(
      <div>
        {title ? <div style={{ fontWeight: 'bold' }}>{t(title)}</div> : null}
        {text ? <div>{t(text)}</div> : null}
      </div>,
      {
        position: 'bottom-left',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.primary.main,
          border: '1px solid',
          borderColor: theme.palette.primary.dark,
        },
      }
    );
  };

  return { showErrorToast, showSuccessToast };
};