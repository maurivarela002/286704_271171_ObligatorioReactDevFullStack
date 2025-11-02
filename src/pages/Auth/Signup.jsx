import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
    Box, 
    TextField, 
    Button, 
    Paper, 
    Typography, 
    Alert,
    InputAdornment,
    IconButton,
    Avatar
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import clodeIcon from '../../assets/img/clode-icon.jpg';
import { useToast } from '../../utils/toast';

const Signup = () => {

    const { t } = useTranslation('auth');
    const { showErrorToast, showSuccessToast } = useToast();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const user = useRef(null);
    const email = useRef(null);
    const pass = useRef(null);
    const confirmPass = useRef(null);

    const registrar = () => {
        setLoading(true);
        const campoUser = user.current?.value;
        const campoEmail = email.current?.value;
        const campoPass = pass.current?.value;
        const campoConfirmPass = confirmPass.current?.value;

        if(!campoUser || !campoEmail || !campoPass || !campoConfirmPass){
            setError(t('signup.errors.allFieldsRequired'));
            setLoading(false);
            return;
        }

        if(!campoEmail.includes('@')){
            setError(t('signup.errors.invalidEmail'));
            setLoading(false);
            return;
        }

        if(campoPass.length < 6){
            setError(t('signup.errors.passwordTooShort'));
            setLoading(false);
            return;
        }

        if(campoPass !== campoConfirmPass){
            setError(t('signup.errors.passwordsDoNotMatch'));
            setLoading(false);
            return;
        }

        setTimeout(() => {
            navigate('/login');
            setLoading(false);
        }, 500);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            registrar();
        }
    }

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
                
                {error && (
                    <Alert severity="error" onClose={() => setError(false)}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success">
                        {t('signup.success')}
                    </Alert>
                )}

                <TextField
                    label={t('signup.username')}
                    variant="outlined"
                    fullWidth
                    inputRef={user}
                    disabled={loading}
                />

                <TextField
                    label={t('signup.email')}
                    type="email"
                    variant="outlined"
                    fullWidth
                    inputRef={email}
                    disabled={loading}
                />

                <TextField
                    label={t('signup.password')}
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    inputRef={pass}
                    disabled={loading}
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
                    inputRef={confirmPass}
                    disabled={loading}
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
                    variant="contained"
                    color="secondary"
                    fullWidth
                    size="large"
                    onClick={registrar}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PersonAddIcon />}
                    disabled={loading}
                    sx={{ 
                        mt: 1,
                        py: 1.5,
                        '&:hover': {
                            backgroundColor: 'secondary.dark'
                        }
                    }}
                >
                    {loading ? t('common.loading') : t('signup.registerButton')}
                </Button>

                <Typography variant="body2" color="text.secondary" align="center">
                    {t('signup.alreadyHaveAccount')}{' '}
                    <Button 
                        variant="text" 
                        size="small"
                        onClick={() => navigate('/')}
                        sx={{ 
                            p: 0, 
                            minWidth: 'auto',
                            textTransform: 'none',
                            fontWeight: 600,
                            color: 'primary.main'
                        }}
                    >
                        {t('signup.loginLink')}
                    </Button>
                </Typography>
            </Paper>
        </Box>
    )
}

export default Signup