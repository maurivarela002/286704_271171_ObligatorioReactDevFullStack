import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Outlet, useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    Button, 
    Box, 
    Container,
    Avatar,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import LanguageSwitcher from '../components/LanguageSwitcher';
import clodeIcon from '../assets/img/clode-icon.jpg';

const Menu = () => {
    const { t } = useTranslation(['dashboard', 'shared']);
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const user = useSelector(state => state.global.user || {});

    useEffect(() => {
        const checkAuth = () => {
            if (!localStorage.getItem('token')) {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ backgroundColor: 'primary.main', borderRadius: 0}}>
                <Toolbar>
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        flexGrow: 1
                    }}>
                        <Avatar 
                            src={clodeIcon} 
                            alt="CLODE" 
                            sx={{ 
                                width: 40, 
                                height: 40, 
                                mr: 2,
                                boxShadow: 1,
                                border: '2px solid',
                                borderColor: 'secondary.main',
                                backgroundColor: 'background.paper',
                                '&:hover': {
                                    borderColor: 'secondary.dark'
                                }
                            }} 
                        />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
                            CLODE
                        </Typography>
                    </Box>                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar 
                            src={user?.urlImage || "https://res.cloudinary.com/dbngdznqf/image/upload/v1762993006/ufffxwf7kgabstt2wvg6.jpg"} 
                            alt={user?.nombre || ''}
                            sx={{ 
                                width: 40, 
                                height: 40, 
                                mr: 2,
                                boxShadow: 1,
                                border: '2px solid',
                                borderColor: 'secondary.main',
                                backgroundColor: 'background.paper',
                                '&:hover': {
                                    borderColor: 'secondary.dark'
                                }
                            }}
                        >
                            {!user?.urlImage && <PersonIcon />}
                        </Avatar>
                        <Typography variant="subtitle2" sx={{ color: 'white' }}>
                            {user?.nombre || ''}
                        </Typography>
                    </Box>
                    <Button 
                        color="inherit" 
                        startIcon={<LogoutIcon />}
                        onClick={handleLogout}
                        sx={{ mr: 2, ml: 2, color: 'white' }}
                    >
                        {t('menu.logout', { ns: 'shared' })}
                    </Button>
                    <LanguageSwitcher />
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 10, pb: 4 }}>
                <Outlet />
            </Container>
        </Box>
    );
};

export default Menu;