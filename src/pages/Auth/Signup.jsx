import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ImageUploader from '../../components/ImageUploader';
import {
    Box,
    TextField,
    Button,
    Paper,
    Typography,
    Alert,
    InputAdornment,
    IconButton,
    Avatar,
    CircularProgress,
    Divider
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import clodeIcon from '../../assets/img/clode-icon.jpg';
import { api } from '../../api/auth/apiManage';
import { yupResolver } from '@hookform/resolvers/yup';
import { getSignupSchema } from '../../validations/authValidations';
import { jwtDecode } from 'jwt-decode';

const Signup = () => {
    const { t } = useTranslation(['auth', 'shared']);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState('');

    const {
        register,
        handleSubmit,
        watch,
        setError: setFormError,
        clearErrors,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(getSignupSchema(t)),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    const onSubmit = async (data) => {
        setLoading(true);
        setApiError('');
        clearErrors('apiError');

        try {
            await api.post('/v1/auth/signup', {
                username: data.username,
                email: data.email,
                password: data.password,
                profileImage: profileImage || ''
            }, true).then(async (response) => {
                if(response.status === 201){
                    const loginResponse = await api.post('/v1/auth/login', {
                        username: data.username,
                        password: data.password
                    });

                    console.log(loginResponse);
                    localStorage.setItem('token', loginResponse.token);
                    localStorage.setItem('user', data.username);
                    const userId = jwtDecode(loginResponse.token).id;
                    localStorage.setItem('userId', userId);
                    navigate('/dashboard');
                }
            });
        } catch (error) {
            setApiError(t('signup.errors.registrationFailed'));
            setFormError('apiError', {
                type: 'manual',
                message: t('signup.errors.registrationFailed')
            });
        } finally {
            setLoading(false);
        }
    };

    const paperStyle = {
        p: { xs: 3, md: 4 },
        width: '100%',
        maxWidth: 450,
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
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8
                    }}
                    onClick={() => navigate('/')}
                >
                    <ArrowBackIcon sx={{ color: 'secondary.main' }} />
                </IconButton>

                <Box sx={{ textAlign: 'center', position: 'relative' }}>
                    <Box sx={{ position: 'relative', mb: 2 }}>
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
                    <Typography variant="h4" component="h1" gutterBottom fontWeight="600">
                        {t('signup.title')}
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {(apiError || errors.apiError) && (
                        <Alert
                            severity="error"
                            onClose={() => {
                                setApiError('');
                                clearErrors('apiError');
                            }}
                            sx={{ mb: 2 }}
                        >
                            {apiError || errors.apiError?.message}
                        </Alert>
                    )}

                    <TextField
                        label={t('signup.username')}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        disabled={loading}
                        {...register('username')}
                    />

                    <TextField
                        label={t('signup.email')}
                        type="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        disabled={loading}
                        {...register('email')}
                    />

                    <TextField
                        label={t('signup.password')}
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        disabled={loading}
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

                    <TextField
                        label={t('signup.confirmPassword')}
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        disabled={loading}
                        {...register('confirmPassword')}
                    />

                    <Box sx={{ mt: 2, mb: 1 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            {t('signup.profileImage')}
                        </Typography>
                        <ImageUploader 
                            onUpload={(url) => setProfileImage(url)} 
                            disabled={loading}
                        />
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        size="large"
                        disabled={loading || watch('password') !== watch('confirmPassword')}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PersonAddIcon />}
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
                        {loading ? t('common.loading') : t('signup.registerButton')}
                    </Button>
                </form>

                <Divider sx={{ my: 2 }}>{t('login.divider')}</Divider>

                <Button
                    variant="outlined"
                    size="large"
                    fullWidth
                    onClick={() => navigate('/login')}
                    sx={{
                        py: 1.5,
                        '&:hover': {
                            transform: 'translateY(-1px)',
                            boxShadow: 2,
                        },
                        transition: 'all 0.2s ease'
                    }}
                >
                    {t('signup.haveAccount')}
                </Button>
            </Paper>
        </Box>
    );
};

export default Signup;