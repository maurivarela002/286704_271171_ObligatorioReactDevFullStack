import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import {
    Box,
    TextField,
    Button,
    MenuItem,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    Grid
} from '@mui/material';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CloseIcon from '@mui/icons-material/Close';
import { api } from '../../api/auth/apiManage';
import { getReserveSchema } from '../../validations/reserveValidations';
import ClodeTable from '../../components/ClodeTable';
import ClodeDialog from '../../components/ClodeDialog';
import { useToast } from '../../utils/toast';
import {cargarReservas, cargarEspecialidades, cargarClinicas, cargarOdontologos} from '../../store/slices/globalSlice';
import { useDispatch, useSelector } from 'react-redux';

const Reserve = () => {
    const { t } = useTranslation(['reserve', 'shared']);
    const { listaReservas } = useSelector(state => state.global);
    const { listaEspecialidades } = useSelector(state => state.global);
    const { listaClinicas } = useSelector(state => state.global);
    const { listaOdontologos } = useSelector(state => state.global);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editingReservation, setEditingReservation] = useState(null);
    const [error, setError] = useState(null);
    const [dateFilter, setDateFilter] = useState('all');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState({
        open: false,
        reservation: null
    });
    const { showErrorToast, showSuccessToast } = useToast();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors, isDirty }, setValue, watch, reset } = useForm({
        resolver: yupResolver(getReserveSchema(t)),
        defaultValues: {
            fechaReserva: new Date(),
            especialidadId: '',
            clinicaId: '',
            odontologoId: '',
            pacienteId: ''
        }
    });

    const columns = [
        { key: '_id', title: 'ID', width: 50 },
        { key: 'especialidad', title: t('table.columns.especialidad', { ns: 'reserve' }) },
        { key: 'clinica', title: t('table.columns.clinica', { ns: 'reserve' }) },
        {
            key: 'odontologo',
            title: t('table.columns.odontologo', { ns: 'reserve' })
        },
        {
            key: 'fechaReserva',
            title: t('table.columns.fechaReserva', { ns: 'reserve' })
        }
    ];

    const fetchReservations = async () => {
        try {
            setLoading(true);
            const response = await api.get('/v1/reservas');
            const responseMap = response.map((item) => {
                const fechaReserva = new Date(item.fechaReserva).toISOString();
                return {
                    ...item,
                    fechaReserva,
                    clinica: item.clinica?.nombre || '-',
                    odontologo: item.odontologo ?
                        `${item.odontologo.nombre || ''} ${item.odontologo.apellido || ''}`.trim()
                        : '-',
                    especialidad: item.especialidad?.nombre || '-',
                };
            });

            dispatch(cargarReservas(responseMap));
        } catch (err) {
            console.log(err);
            showErrorToast(t('table.errors.load'), t('table.errors.again'));
        } finally {
            setLoading(false);
        }
    };

    const fetchInitialData = async () => {
        try {
            const [especialidadesRes, clinicasRes, odontologosRes] = await Promise.all([
                api.get('/v1/especialidades'),
                api.get('/v1/clinicas'),
                api.get('/v1/odontologos'),
            ]);

            dispatch(cargarEspecialidades(especialidadesRes));
            dispatch(cargarClinicas(clinicasRes));
            dispatch(cargarOdontologos(odontologosRes));
        } catch (err) {
            showErrorToast(t('table.errors.load'), t('table.errors.again'));
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchInitialData();
            await fetchReservations();
        };

        loadData();
    }, []);

    const filteredReservations = useMemo(() => {
        if (!listaReservas.length) return;

        let filtered = [...listaReservas];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const isBetween = (target, start, end) => {
            const d = new Date(target);
            d.setHours(0, 0, 0, 0);
            return d >= start && d <= end;
        };

        switch (dateFilter) {
            case 'custom': {
                if (startDate && endDate) {
                    const start = new Date(startDate);
                    const end = new Date(endDate);
                    start.setHours(0, 0, 0, 0);
                    end.setHours(23, 59, 59, 999);

                    filtered = filtered.filter(item =>
                        isBetween(item.fechaReserva, start, end)
                    );
                }
                break;
            }

            case 'week': {
                const weekAgo = new Date(today);
                weekAgo.setDate(today.getDate() - 7);
                filtered = filtered.filter(item =>
                    isBetween(item.fechaReserva, weekAgo, today)
                );
                break;
            }

            case 'month': {
                const monthAgo = new Date(today);
                monthAgo.setMonth(today.getMonth() - 1);
                filtered = filtered.filter(item =>
                    isBetween(item.fechaReserva, monthAgo, today)
                );
                break;
            }

            case 'nextWeek': {
                const weekAhead = new Date(today);
                weekAhead.setDate(today.getDate() + 7);
                filtered = filtered.filter(item =>
                    isBetween(item.fechaReserva, today, weekAhead)
                );
                break;
            }

            case 'nextMonth': {
                const monthAhead = new Date(today);
                monthAhead.setMonth(today.getMonth() + 1);
                filtered = filtered.filter(item =>
                    isBetween(item.fechaReserva, today, monthAhead)
                );
                break;
            }

            default:
                break;
        }

        return filtered;
    }, [dateFilter, startDate, endDate, listaReservas]);


    const handleOpen = () => {
        setEditingReservation(null);
        reset();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingReservation(null);
        reset();
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const reservaData = {
                ...data,
                fechaReserva: data.fechaReserva.toISOString(),
                pacienteId: localStorage.getItem('userId')
            };

            if (editingReservation) {
                await api.put(`/v1/reservas/${editingReservation._id}`, reservaData);
                showSuccessToast(t('form.success.update', { ns: 'reserve' }));
            } else {
                await api.post('/v1/reservas', reservaData);
                showSuccessToast(t('form.success.create', { ns: 'reserve' }));
            }

            handleClose();
            fetchReservations();
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (reservation) => {
        setEditingReservation(reservation);
        reset({
            fechaReserva: new Date(reservation.fechaReserva),
            especialidadId: reservation.especialidad?._id || '',
            clinicaId: reservation.clinica?._id || '',
            odontologoId: reservation.odontologo?._id || '',
            pacienteId: reservation.paciente?._id || ''
        });
        setOpen(true);
    };

    const handleDeleteClick = (reservation) => {
        setDeleteDialog({
            open: true,
            reservation
        });
    };

    const handleConfirmDelete = async () => {
        if (!deleteDialog.reservation) return;

        try {
            await api.delete(`/v1/reservas/${deleteDialog.reservation._id}`);
            showSuccessToast(t('form.success.delete', { ns: 'reserve' }));
            fetchReservations();
        } catch (error) {
            showErrorToast(t('form.errors.delete', { ns: 'reserve' }));
        } finally {
            setDeleteDialog({ open: false, reservation: null });
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpen}
                    disabled={loading}
                >
                    {t('form.title', { ns: 'reserve' })}
                </Button>
            </Box>

            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            <Box sx={{ mb: 3 }}>
                <Grid container spacing={2} alignItems="flex-end">
                    <Grid item xs={12} md={3}>
                        <FormControl fullWidth>
                            <InputLabel id="date-filter-label">
                                {t('form.filterDate.title', { ns: 'reserve' })}
                            </InputLabel>
                            <Select
                                labelId="date-filter-label"
                                value={dateFilter}
                                label={t('form.filterDate.title', { ns: 'reserve' })}
                                onChange={(e) => {
                                    setDateFilter(e.target.value);
                                    setStartDate(null);
                                    setEndDate(null);
                                }}
                            >
                                <MenuItem value="all">{t('form.filterDate.all', { ns: 'reserve' })}</MenuItem>
                                <MenuItem value="week">{t('form.filterDate.lastWeek', { ns: 'reserve' })}</MenuItem>
                                <MenuItem value="month">{t('form.filterDate.lastMonth', { ns: 'reserve' })}</MenuItem>
                                <MenuItem value="nextWeek">{t('form.filterDate.nextWeek', { ns: 'reserve' })}</MenuItem>
                                <MenuItem value="nextMonth">{t('form.filterDate.nextMonth', { ns: 'reserve' })}</MenuItem>
                                <MenuItem value="custom">{t('form.filterDate.custom', { ns: 'reserve' })}</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {dateFilter === 'custom' && (
                        <>
                            <Grid item xs={12} md={3}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label={t('form.filterDate.startDate', { ns: 'reserve' })}
                                        value={startDate}
                                        onChange={(newValue) => setStartDate(newValue)}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label={t('form.filterDate.endDate', { ns: 'reserve' })}
                                        value={endDate}
                                        onChange={(newValue) => setEndDate(newValue)}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                        minDate={startDate}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </>
                    )}
                </Grid>
            </Box>


            <ClodeTable
                data={filteredReservations }
                headers={columns}
                loading={loading}
                title={t('table.title')}
                search
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">{editingReservation ? t('form.editTitle') : t('form.title')}</Typography>
                        <IconButton onClick={handleClose} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Box sx={{ display: 'grid', gap: 2, mt: 1 }}>
                                <DateTimePicker
                                    label={t('form.fields.fechaReserva')}
                                    value={watch('fechaReserva')}
                                    onChange={(date) => setValue('fechaReserva', date)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            error={!!errors.fechaReserva}
                                            helperText={errors.fechaReserva?.message}
                                        />
                                    )}
                                />

                                <TextField
                                    select
                                    label={t('form.fields.especialidad')}
                                    {...register('especialidadId')}
                                    value={watch('especialidadId')}
                                    error={!!errors.especialidadId}
                                    helperText={errors.especialidadId?.message}
                                    fullWidth
                                >
                                    {listaEspecialidades.map((especialidad) => (
                                        <MenuItem key={especialidad._id} value={especialidad._id}>
                                            {especialidad.nombre}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    select
                                    label={t('form.fields.clinica')}
                                    {...register('clinicaId')}
                                    value={watch('clinicaId')}
                                    error={!!errors.clinicaId}
                                    helperText={errors.clinicaId?.message}
                                    fullWidth
                                >
                                    {listaClinicas.map((clinica) => (
                                        <MenuItem key={clinica._id} value={clinica._id}>
                                            {clinica.nombre}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    select
                                    label={t('form.fields.odontologo')}
                                    {...register('odontologoId')}
                                    value={watch('odontologoId')}
                                    error={!!errors.odontologoId}
                                    helperText={errors.odontologoId?.message}
                                    fullWidth
                                >
                                    {listaOdontologos.map((odontologo) => (
                                        <MenuItem key={odontologo._id} value={odontologo._id}>
                                            {`${odontologo.nombre} ${odontologo.apellido}`}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                        </LocalizationProvider>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button onClick={handleClose} disabled={loading}>
                            {t('form.buttons.cancel')}
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading || !isDirty}
                        >
                            {loading ? (
                                <CircularProgress size={24} />
                            ) : editingReservation ? (
                                t('form.buttons.update')
                            ) : (
                                t('form.buttons.submit')
                            )}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            <ClodeDialog
                open={deleteDialog.open}
                onClose={() => setDeleteDialog({ open: false, reservation: null })}
                title={t('form.confirmDeleteTitle', { ns: 'reserve' })}
                maxWidth="sm"
                actions={[
                    {
                        label: t('common.cancel', { ns: 'shared' }),
                        onClick: () => setDeleteDialog({ open: false, reservation: null }),
                        variant: 'outlined'
                    },
                    {
                        label: t('common.delete', { ns: 'shared' }),
                        onClick: handleConfirmDelete,
                        variant: 'contained',
                        color: 'error'
                    }
                ]}
            >
                <Typography>
                    {t('form.confirmDeleteMessage')}
                </Typography>
            </ClodeDialog>
        </Box>
    );
};

export default Reserve;