// src/components/ImageUploader.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Button,
    Typography,
    CircularProgress,
    IconButton,
    Avatar,
    Paper,
    styled
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const ImageUploader = ({ onUpload, disabled = false }) => {
    const { t } = useTranslation('auth');
    const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
    const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

    const [isUploading, setIsUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [message, setMessage] = useState("");

    const resetState = () => {
        setImagePreview(null);
        setMessage("");
        onUpload && onUpload("");
    };

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];

        if (!file) {
            setMessage(t('signup.noImageSelected'));
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setMessage(t('signup.imageTooLarge'));
            return;
        }

        setImagePreview(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        try {
            setIsUploading(true);
            setMessage(t('signup.uploadingImage'));

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            const data = await res.json();

            if (data.secure_url) {
                setMessage(t('signup.imageUploaded'));
                onUpload && onUpload(data.secure_url);
            } else {
                setMessage(t('signup.imageError'));
                onUpload && onUpload("");
            }

        } catch (error) {
            console.error("Error uploading image:", error);
            setMessage(t('signup.imageError'));
            onUpload && onUpload("");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper 
                elevation={0}
                sx={{
                    p: 2,
                    border: '1px dashed',
                    borderColor: 'divider',
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                    textAlign: 'center',
                    position: 'relative',
                    '&:hover': {
                        borderColor: 'primary.main',
                        backgroundColor: 'action.hover',
                    },
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {imagePreview ? (
                        <Box sx={{ position: 'relative', mb: 2 }}>
                            <Avatar
                                src={imagePreview}
                                alt={t('signup.preview')}
                                sx={{ 
                                    width: 100, 
                                    height: 100,
                                    borderRadius: 2,
                                    objectFit: 'cover'
                                }}
                            />
                            <IconButton
                                onClick={resetState}
                                disabled={isUploading || disabled}
                                color="error"
                                sx={{
                                    position: 'absolute',
                                    top: -8,
                                    right: -8,
                                    bgcolor: 'background.paper',
                                    '&:hover': {
                                        bgcolor: 'background.paper',
                                    },
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ) : (
                        <CloudUploadIcon 
                            color="action" 
                            sx={{ fontSize: 48, mb: 1, opacity: 0.7 }} 
                        />
                    )}

                    <Button
                        component="label"
                        variant="contained"
                        disabled={isUploading || disabled}
                        startIcon={isUploading ? <CircularProgress size={20} /> : null}
                        sx={{
                            mt: 1,
                            textTransform: 'none',
                            width: '100%',
                            maxWidth: 200,
                        }}
                    >
                        <VisuallyHiddenInput 
                            type="file" 
                            accept="image/*" 
                            onChange={handleFileChange} 
                            disabled={isUploading || disabled}
                        />
                        {isUploading ? t('signup.uploadingImage') : t('signup.selectImage')}
                    </Button>

                    <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ mt: 1, display: 'block' }}
                    >
                        {t('signup.imageTooLarge')}
                    </Typography>
                </Box>
            </Paper>

            {message && (
                <Typography 
                    variant="caption" 
                    color={message.includes('Error') ? 'error' : 'success.main'}
                    sx={{ mt: 1, display: 'block', textAlign: 'center' }}
                >
                    {message}
                </Typography>
            )}
        </Box>
    );
};

export default ImageUploader;