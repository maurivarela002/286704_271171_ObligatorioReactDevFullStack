import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Menu, MenuItem, Box, Typography } from '@mui/material';

const SpainFlag = () => (
    <svg width="28" height="20" viewBox="0 0 28 20" style={{ borderRadius: '2px', border: '1px solid #ddd' }}>
        <rect width="28" height="5" fill="#AA151B"/>
        <rect y="5" width="28" height="10" fill="#F1BF00"/>
        <rect y="15" width="28" height="5" fill="#AA151B"/>
    </svg>
);

const USAFlag = () => (
    <svg width="28" height="20" viewBox="0 0 28 20" style={{ borderRadius: '2px', border: '1px solid #ddd' }}>
        <rect width="28" height="20" fill="#B22234"/>
        <rect y="0" width="28" height="1.54" fill="white"/>
        <rect y="3.08" width="28" height="1.54" fill="white"/>
        <rect y="6.15" width="28" height="1.54" fill="white"/>
        <rect y="9.23" width="28" height="1.54" fill="white"/>
        <rect y="12.31" width="28" height="1.54" fill="white"/>
        <rect y="15.38" width="28" height="1.54" fill="white"/>
        <rect y="18.46" width="28" height="1.54" fill="white"/>
        <rect width="11.2" height="10.77" fill="#3C3B6E"/>
    </svg>
);

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        handleClose();
    };

    const currentCode = i18n.language === 'es' ? <SpainFlag /> : <USAFlag />;

    return (
        <>
            <IconButton 
                onClick={handleClick}
                color="inherit"
                sx={{ 
                    p: 1,
                    '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.04)'
                    }
                }}
                aria-label="cambiar idioma"
            >
                {currentCode}
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    sx: {
                        mt: 1,
                        minWidth: 80
                    }
                }}
            >
                <MenuItem 
                    onClick={() => changeLanguage('es')}
                    selected={i18n.language === 'es'}
                    sx={{ 
                        justifyContent: 'center',
                        py: 1.5,
                        '&.Mui-selected': {
                            bgcolor: 'action.selected',
                            '&:hover': {
                                bgcolor: 'action.selected'
                            }
                        }
                    }}
                >
                    <SpainFlag />
                </MenuItem>
                <MenuItem 
                    onClick={() => changeLanguage('en')}
                    selected={i18n.language === 'en'}
                    sx={{ 
                        justifyContent: 'center',
                        py: 1.5,
                        '&.Mui-selected': {
                            bgcolor: 'action.selected',
                            '&:hover': {
                                bgcolor: 'action.selected'
                            }
                        }
                    }}
                >
                    <USAFlag />
                </MenuItem>
            </Menu>
        </>
    );
};

export default LanguageSwitcher;