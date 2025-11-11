import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  TextField,
  InputAdornment,
  Typography,
  Box,
  CircularProgress,
  TableSortLabel,
  styled,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

const StyledTableContainer = styled(TableContainer)(({ theme, width, height }) => ({
  width: width || '100%',
  height: height || 'auto',
  maxHeight: height || 'calc(100vh - 200px)',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  overflow: 'auto',
  '& .MuiTableCell-root': {
    padding: theme.spacing(1.5, 2),
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
    '&:first-of-type': {
      paddingLeft: theme.spacing(3),
    },
    '&:last-child': {
      paddingRight: theme.spacing(3),
    },
  },
  '& .MuiTableHead-root': {
    backgroundColor: theme.palette.primary.main,
    '& .MuiTableCell-root': {
      color: theme.palette.primary.contrastText,
      fontWeight: 600,
      fontSize: '0.875rem',
      letterSpacing: '0.5px',
      borderBottom: 'none',
    },
    '& .MuiTableSortLabel-root': {
      color: 'inherit',
      '&:hover': {
        color: theme.palette.primary.light,
      },
      '&.Mui-active': {
        color: theme.palette.primary.contrastText,
        '& .MuiTableSortLabel-icon': {
          color: theme.palette.primary.light,
        },
      },
    },
  },
  '& .MuiTableBody-root': {
    '& .MuiTableRow-root': {
      transition: 'background-color 0.2s ease-in-out',
      '&:hover': {
        backgroundColor: theme.palette.grey[50],
      },
      '&:last-child .MuiTableCell-root': {
        borderBottom: 'none',
      },
    },
  },
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(4),
  color: theme.palette.primary.main,
  '& .MuiCircularProgress-root': {
    marginBottom: theme.spacing(2),
  },
}));

const NoDataContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(4),
  color: theme.palette.grey[500],
  '& .MuiSvgIcon-root': {
    fontSize: '3rem',
    marginBottom: theme.spacing(2),
    color: theme.palette.grey[300],
  },
}));

const ClodeTable = ({
  data = [],
  headers = [],
  loading = false,
  title = '',
  search = false,
  height,
  width,
  onEdit,
  onDelete,
  ...props
}) => {
  const theme = useTheme();
  const { t } = useTranslation('shared');
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    
    const term = searchTerm.toLowerCase();
    return data.filter((item) =>
      headers.some((header) => {
        const value = item[header.key];
        return value && String(value).toLowerCase().includes(term);
      })
    );
  }, [data, searchTerm, headers]);

  const renderCellContent = (row, key) => {
    const value = row[key];
    
    if (value && typeof value === 'object') {
      return JSON.stringify(value);
    }
    
    if (value && (key.toLowerCase().includes('date') || key.toLowerCase().includes('fecha'))) {
      return new Date(value).toLocaleDateString();
    }
    
    if (typeof value === 'boolean') {
      return value ? 'Sí' : 'No';
    }
    
    return value !== null && value !== undefined ? value : '-';
  };

  const hasActions = onEdit || onDelete;

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        width: '100%', 
        overflow: 'hidden',
        border: `1px solid ${theme.palette.grey[200]}`,
        borderRadius: '8px',
        backgroundColor: theme.palette.background.paper
      }}
    >
      <Box 
        p={2} 
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `1px solid ${theme.palette.grey[200]}`,
          backgroundColor: theme.palette.background.default,
        }}
      >
        {title && (
          <Typography 
            variant="h6" 
            component="h2" 
            sx={{
              color: theme.palette.primary.dark,
              fontWeight: 600,
              m: 0,
            }}
          >
            {title}
          </Typography>
        )}
        
        {search && (
          <Box mb={2}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder={t('common.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                maxWidth: 300,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: theme.palette.background.paper,
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.light,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        )}
      </Box>

      <StyledTableContainer component={Paper} height={height} width={width}>
        {loading ? (
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        ) : (
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell
                    key={header.key}
                    style={{
                      width: header.width,
                      minWidth: header.width,
                      whiteSpace: 'nowrap',
                      backgroundColor: theme.palette.background.dark,
                    }}
                  >
                    <TableSortLabel
                      active={orderBy === header.key}
                      direction={orderBy === header.key ? order : 'asc'}
                      onClick={() => handleSort(header.key)}
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {header.title}
                    </TableSortLabel>
                  </TableCell>
                ))}
                {hasActions && (
                  <TableCell 
                    key="actions"
                    style={{
                      width: 120,
                      minWidth: 120,
                      whiteSpace: 'nowrap',
                      textAlign: 'center',
                      backgroundColor: theme.palette.background.dark,
                    }}
                  >
                    {t('table.actions.title')}
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((row, rowIndex) => (
                  <TableRow hover key={rowIndex}>
                    {headers.map((header) => (
                      <TableCell key={header.key}>
                        {header.render
                          ? header.render(row[header.key], row)
                          : renderCellContent(row, header.key)}
                      </TableCell>
                    ))}
                    {hasActions && (
                      <TableCell>
                        <Box display="flex" justifyContent="center" gap={1}>
                          {onEdit && (
                            <Tooltip title={t('table.actions.edit')}>
                              <IconButton 
                                size="small" 
                                onClick={() => onEdit(row)}
                                color="primary"
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                          {onDelete && (
                            <Tooltip title={t('table.actions.delete')}>
                              <IconButton 
                                size="small" 
                                onClick={() => onDelete(row)}
                                color="error"
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Box>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={headers.length + (hasActions ? 1 : 0)}>
                    <NoDataContainer>
                      <Typography>{t('table.noData')}</Typography>
                    </NoDataContainer>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </StyledTableContainer>
    </Paper>
  );
};

ClodeTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      render: PropTypes.func,
    })
  ).isRequired,
  loading: PropTypes.bool,
  title: PropTypes.string,
  search: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ClodeTable;