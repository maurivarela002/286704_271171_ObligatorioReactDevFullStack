import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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
    CircularProgress,
    InputAdornment,
    IconButton
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import clodeIcon from '../../assets/img/clode-icon.jpg';
import { api } from '../../api/auth/apiManage';
import { yupResolver } from '@hookform/resolvers/yup';
import { getLoginSchema } from '../../validations/authValidations';

const Login = () => {
    const { t } = useTranslation(['auth', 'shared']);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError: setFormError,
        clearErrors,
        watch
    } = useForm({
        defaultValues: {
            username: '',
            password: ''
        },
        resolver: yupResolver(getLoginSchema(t))
    });

    useEffect(() => {
        localStorage.clear();
    }, []);

    const onSubmit = async (data) => {
        setLoading(true);
        setError(false);
        clearErrors('apiError');

        try {
            const response = await api.post('/v1/auth/login', {
                username: data.username,
                password: data.password
            });

            localStorage.setItem('token', response.token);
            localStorage.setItem('user', data.username);
            navigate('/dashboard');
        } catch (error) {
            setError(true);
            setFormError('apiError', {
                type: 'manual',
                message: t('login.error')
            });
        } finally {
            setLoading(false);
        }
    };

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

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {(error || errors.apiError) && (
                        <Alert
                            severity="error"
                            onClose={() => {
                                setError(false);
                                clearErrors('apiError');
                            }}
                            sx={{ mb: 2 }}
                        >
                            {errors.apiError?.message || t('login.error')}
                        </Alert>
                    )}

                    <TextField
                        label={t('login.username')}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        {...register('username')}
                    />

                    <TextField
                        label={t('login.password')}
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        {...register('password')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'action.hover',
                                            }
                                        }}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        size="large"
                        disabled={loading || watch('username') === '' || watch('password') === ''}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                        sx={{
                            mt: 2,
                            py: 1.5,
                            '&:hover': {
                                backgroundColor: 'secondary.dark'
                            },
                            '&:disabled': {
                                bgcolor: 'grey.400',
                                pointerEvents: 'none'
                            }
                        }}
                    >
                        {loading ? t('common.loading') : t('login.loginButton')}
                    </Button>
                </form>

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