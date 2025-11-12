import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

const ClodeDialog = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
  fullWidth = true,
  dividers = true
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            size="small"
            sx={{ ml: 1 }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent dividers={dividers}>
        {children}
      </DialogContent>
      
      {actions && actions.length > 0 && (
        <DialogActions sx={{ p: 2 }}>
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={action.onClick}
              color={action.color || 'primary'}
              variant={action.variant || 'text'}
              disabled={action.disabled}
              startIcon={action.icon}
              sx={{ minWidth: 100 }}
            >
              {action.label}
            </Button>
          ))}
        </DialogActions>
      )}
    </Dialog>
  );
};

ClodeDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      color: PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']),
      variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
      disabled: PropTypes.bool,
      icon: PropTypes.node
    })
  ),
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]),
  fullWidth: PropTypes.bool,
  dividers: PropTypes.bool
};

export default ClodeDialog;