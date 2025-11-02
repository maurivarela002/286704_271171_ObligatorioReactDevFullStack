import { colors } from './colors';

export const commonStyles = {
  primaryButton: {
    backgroundColor: colors.primary.main,
    color: colors.primary.contrastText,
    '&:hover': {
      backgroundColor: colors.primary.dark
    }
  },
  secondaryButton: {
    backgroundColor: colors.secondary.main,
    color: colors.secondary.contrastText,
    '&:hover': {
      backgroundColor: colors.secondary.dark
    }
  },
  
  card: {
    backgroundColor: colors.background.paper,
    borderRadius: 2,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    p: 3
  },
  
  pageTitle: {
    color: colors.primary.main,
    fontWeight: 600,
    mb: 2
  }
};

export default commonStyles;