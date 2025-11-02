import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Outlet, useLocation, Navigate } from 'react-router-dom';
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
import LanguageSwitcher from '../components/LanguageSwitcher';
import clodeIcon from '../assets/img/clode-icon.jpg';


const Menu = () => {
    const { t } = useTranslation(['dashboard', 'shared']);
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            if (!localStorage.getItem('token')) {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, [location]);

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="absolute" sx={{ backgroundColor: 'primary.main', borderRadius: 0}}>
                <Toolbar>
                    <Box sx={{ position: 'relative' }}>
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
                    </Box>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
                        CLODE
                    </Typography>
                    <Button 
                        color="inherit" 
                        startIcon={<LogoutIcon />}
                        onClick={() => navigate('/')}
                        sx={{ mr: 1 }}
                    >
                        {t('menu.logout', { ns: 'shared' })}
                    </Button>
                    <LanguageSwitcher />
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 4, pb: 4 }}>
                <Outlet />
            </Container>
        </Box>
    );
};

export default Menu;