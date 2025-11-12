import { useTranslation } from 'react-i18next';
import { Card, LinearProgress, Typography, Box } from '@mui/material';

const MAX_document_FREE = 10;
const MAX_document_PREMIUM = 200;

const StorageUsage = ({ documents = [], userType }) => {
  const documentCount = documents.length;
  const maxdocument = userType === 'premium' ? MAX_document_PREMIUM : MAX_document_FREE;
  const porcentajeUso = Math.min(Math.round((documentCount / maxdocument) * 100), 100);
  const { t } = useTranslation('StorageUsage');
  
  const getUsageInfo = () => {
    if (userType === 'premium') {
      return {
        title: t('premium.title'),
        description: t('premium.usage', { 
          count: documentCount,
          max: MAX_document_PREMIUM
        }),
        percent: porcentajeUso,
        status: porcentajeUso > 90 ? 'exception' : porcentajeUso > 70 ? 'warning' : 'success',
        limit: t('premium.limit', { max: MAX_document_PREMIUM })
      };
    } else {
      return {
        title: t('free.title'),
        description: t('free.usage', {
          count: documentCount,
          max: MAX_document_FREE
        }),
        percent: porcentajeUso,
        status: porcentajeUso > 90 ? 'exception' : porcentajeUso > 70 ? 'warning' : 'success',
        limit: t('free.limit', { max: MAX_document_FREE })
      };
    }
  };

  const usageInfo = getUsageInfo();

  const getColorForStatus = (status) => {
    switch(status) {
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'exception': return 'error';
      default: return 'primary';
    }
  };

  return (
    <Card sx={{ 
      width: '100%', 
      maxWidth: '80%', 
      p: 3,
      mb: 2,
      boxShadow: 3
    }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {usageInfo.title}
      </Typography>
      
      {userType === 'plus' ? (
        <Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {usageInfo.description}
          </Typography>
          <Box sx={{ mb: 1 }}>
            <LinearProgress 
              variant="determinate" 
              value={usageInfo.percent}
              color={getColorForStatus(usageInfo.status)}
              sx={{
                height: 8,
                borderRadius: 4,
                mb: 1
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {usageInfo.percent}% {t(`status.${usageInfo.status}`)}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" display="block">
            {usageInfo.limit}
          </Typography>
        </Box>
      ) : userType === 'premium' ? (
        <Box>
          <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
            {documentCount}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
            {usageInfo.description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {usageInfo.limit}
          </Typography>
        </Box>
      ) : (
        <Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {usageInfo.description}
          </Typography>
          <LinearProgress />
        </Box>
      )}
    </Card>
  );
};

export default StorageUsage;
