import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button, Container, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { api } from '../../api/auth/apiManage';
import StorageUsage from '../../components/StorageUsage';
import ClodeDialog from '../../components/ClodeDialog';
import { cargarUser, limiteReservas } from '../../store/slices/globalSlice';
import { useSelector } from 'react-redux';

const StoragePage = () => {
  const { t } = useTranslation('StorageUsage');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [upgrading, setUpgrading] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: '',
    message: '',
    isAdminError: false
  });

  const { listaReservas } = useSelector(state => state.global);

  const token = localStorage.getItem('token');
  const userId = token ? jwtDecode(token).id : null;
  const userPremium = token ? jwtDecode(token).premium : false;
  const userAdmin = token ? jwtDecode(token).admin : false;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token || !userId) {
        navigate('/login');
        return;
      }

      try {
        const response = await api.get(`/v1/pacientes/?id=${userId}`);
        if (response && response.length > 0) {
          const user = response.map((user) => {
            return {
              nombre: user.detalleId.nombre,
              apellido: user.detalleId.apellido,
              userId: user.userId,
              admin: userAdmin,
              premium: userPremium
            }
          });
          dispatch(cargarUser(user));
        }
        setIsPremium(userPremium);
      } catch (err) {
        setError(t('storage.error.fetchingData'));
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, userId, navigate, dispatch, t, userPremium, dispatch]);

  const handleUpgradeToPremium = async () => {
    if (!userId) return;

    setUpgrading(true);
    try {
      const response = await api.put(`/v1/usuarios/${userId}/premium`);
      dispatch(cargarUser({
        admin: response.admin,
        premium: response.premium
      }));
      dispatch(limiteReservas(true));
      setIsPremium(true);
    } catch (err) {
      console.log(err);
      setError(t('storage.error.upgradeFailed'));
    } finally {
      setUpgrading(false);
      setShowUpgradeDialog(false);
    }
  };

  const handleUpgradeClick = () => {
    if (!userAdmin) {
      setDialogContent({
        title: t('storage.adminRequired.title'),
        message: t('storage.adminRequired.message'),
        isAdminError: true
      });
    } else {
      setDialogContent({
        title: t('storage.upgradeDialog.title'),
        message: t('storage.upgradeDialog.message'),
        isAdminError: false
      });
    }
    setShowUpgradeDialog(true);
  };


  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" >
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 2, mb: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('storage.title')}
      </Typography>

      <Paper elevation={3} sx={{ p: 3 }}>
        <StorageUsage
          documents={listaReservas || []}
          userType={isPremium ? 'premium' : 'plus'}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleUpgradeClick}
          disabled={isPremium || loading}
          sx={{ mt: 2, display: 'flex', width: '100%' }}
        >
          {t('storage.upgradeDialog.title')}
        </Button>
      </Paper>

      <ClodeDialog
        open={showUpgradeDialog}
        onClose={() => !upgrading && setShowUpgradeDialog(false)}
        title={dialogContent.title}
        actions={
          dialogContent.isAdminError ? (
            [{
              label: t('common.close', { ns: 'shared' }),
              onClick: () => setShowUpgradeDialog(false),
              variant: 'contained'
            }]
          ) : (
            [
              {
                label: t('common.cancel', { ns: 'shared' }),
                onClick: () => setShowUpgradeDialog(false),
                disabled: upgrading,
                variant: 'text'
              },
              {
                label: upgrading ? '' : t('common.confirm', { ns: 'shared' }),
                onClick: handleUpgradeToPremium,
                color: 'primary',
                variant: 'contained',
                disabled: upgrading,
                icon: upgrading ? <CircularProgress size={24} /> : null
              }
            ]
          )
        }
      >
        <Typography>{dialogContent.message}</Typography>
      </ClodeDialog>
    </Container>
  );
};

export default StoragePage;
