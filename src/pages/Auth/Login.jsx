import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    Box,
    TextField,
    Button,
    Paper,
    Alert,
    Divider,
    Avatar,
    CircularProgress
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import clodeIcon from '../../assets/img/clode-icon.jpg';
import { useToast } from '../../utils/toast';

const Login = () => {
    const { t } = useTranslation('auth');
    const { showErrorToast, showSuccessToast } = useToast();

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const user = useRef(null);
    const pass = useRef(null);

    useEffect(() => {
        localStorage.clear();
    }, [])

    const ingresar = () => {
        setLoading(true);
        const campoUser = user.current?.value;
        const campoPass = pass.current?.value;

        setTimeout(() => {
            if (campoUser === 'a' && campoPass === 'a') {
                navigate('/dashboard');
                localStorage.setItem('token', 'token');
                localStorage.setItem('user', campoUser);
                showSuccessToast('success.operation.title', 'success.operation.text');
            } else {
                setError(true);
                showErrorToast('errorsHttp.unauthorized.title', 'errorsHttp.unauthorized.text');
            }
            setLoading(false);
        }, 500);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            ingresar();
        }
    }

    const paperStyle = {
        p: { xs: 3, md: 4 },
        width: '100%',
        maxWidth: 420,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 2,
        boxSizing: 'border-box',
        position: 'relative',
        my: 1,
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                bgcolor: '#f0f7ff',
                p: 2,
                boxSizing: 'border-box',
                position: 'relative',
                overflow: 'hidden',
                transition: 'background-color 0.3s ease',
            }}
        >
            <Box sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 1
            }}>
                <LanguageSwitcher />
            </Box>
            <Paper
                elevation={3}
                sx={paperStyle}
            >
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Box sx={{ position: 'relative', mb: 3 }}>
                        <Avatar 
                            src={clodeIcon}
                            alt="CLODE Logo"
                            sx={{
                                width: 100,
                                height: 100,
                                margin: '0 auto',
                                boxShadow: 2,
                                border: '3px solid',
                                borderColor: 'secondary.main',
                                backgroundColor: 'background.paper'
                            }}
                        />
                    </Box>
                </Box>

                {error && (
                    <Alert severity="error" onClose={() => setError(false)} sx={{ mb: 2 }}>
                        {t('login.error')}
                    </Alert>
                )}

                <TextField
                    label={t('login.username')}
                    variant="outlined"
                    fullWidth
                    inputRef={user}
                    onKeyDown={handleKeyDown}
                />

                <TextField
                    label={t('login.password')}
                    type="password"
                    variant="outlined"
                    fullWidth
                    inputRef={pass}
                    onKeyDown={handleKeyDown}
                />

                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    size="large"
                    onClick={ingresar}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                    disabled={loading}
                    sx={{ 
                        mt: 2,
                        py: 1.5,
                        '&:hover': {
                            backgroundColor: 'secondary.dark'
                        }
                    }}
                >
                    {loading ? t('common.loading') : t('login.loginButton')}
                </Button>

                <Divider sx={{ my: 1 }}>{t('login.divider')}</Divider>

                <Button
                    variant="outlined"
                    size="large"
                    fullWidth
                    onClick={() => navigate('/signup')}
                    sx={{
                        py: 1.5,
                        '&:hover': {
                            transform: 'translateY(-1px)',
                            boxShadow: 2,
                        },
                        transition: 'all 0.2s ease'
                    }}
                >
                    {t('login.createAccount')}
                </Button>
            </Paper>
        </Box>
    )
}

export default Login