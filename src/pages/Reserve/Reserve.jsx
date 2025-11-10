import { useState, useEffect } from 'react';
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
    CircularProgress
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CloseIcon from '@mui/icons-material/Close';
import { api } from '../../api/auth/apiManage';
import { getReserveSchema } from '../../validations/reserveValidations';
import ClodeTable from '../../components/ClodeTable';
import ClodeDialog from '../../components/ClodeDialog';
import { useToast } from '../../utils/toast';

const Reserve = () => {
    const { t } = useTranslation(['reserve', 'shared']);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [editingReservation, setEditingReservation] = useState(null);
    const [especialidades, setEspecialidades] = useState([]);
    const [clinicas, setClinicas] = useState([]);
    const [odontologos, setOdontologos] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [error, setError] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState({
        open: false,
        reservation: null
    });
    const { showErrorToast, showSuccessToast } = useToast();

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
            key: 'paciente', 
            title: t('table.columns.paciente', { ns: 'reserve' })
        }
    ];

    const fetchReservations = async () => {
        try {
            setLoading(true);
            const response = await api.get('/v1/reservas');
            const responseMap = response.map((item) => {
                return {
                    ...item,
                    clinica: item.clinica?.nombre || '-',
                    odontologo: item.odontologo ? 
                        `${item.odontologo.nombre || ''} ${item.odontologo.apellido || ''}`.trim() 
                        : '-',
                    paciente: item.paciente?.userId || '-',
                    especialidad: item.especialidad?.nombre || '-'
                };
            });
            setReservations(responseMap);
        } catch (err) {
            console.log(err);
            showErrorToast(t('table.errors.load'), t('table.errors.again'));
        } finally {
            setLoading(false);
        }
    };

    const fetchInitialData = async () => {
        try {
            const [especialidadesRes, clinicasRes, odontologosRes, pacientesRes] = await Promise.all([
                api.get('/v1/especialidades'),
                api.get('/v1/clinicas'),
                api.get('/v1/odontologos'),
                api.get('/v1/pacientes')
            ]);

            setEspecialidades(especialidadesRes);
            setClinicas(clinicasRes);
            setOdontologos(odontologosRes);
            setPacientes(pacientesRes);
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
                fechaReserva: data.fechaReserva.toISOString()
            };
            
            if (editingReservation) {
                await api.put(`/v1/reservas/${editingReservation._id}`, reservaData);
                showSuccessToast('Reserva actualizada correctamente');
            } else {
                await api.post('/v1/reservas', reservaData);
                showSuccessToast('Reserva creada correctamente');
            }
            
            handleClose();
            fetchReservations();
        } catch (error) {
            console.error('Error saving reservation:', error);
            showErrorToast(error.response?.data?.message || 'Error al guardar la reserva');
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

            <ClodeTable
                data={reservations}
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
                                    {especialidades.map((especialidad) => (
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
                                    {clinicas.map((clinica) => (
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
                                    {odontologos.map((odontologo) => (
                                        <MenuItem key={odontologo._id} value={odontologo._id}>
                                            {`${odontologo.nombre} ${odontologo.apellido}`}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    select
                                    label={t('form.fields.paciente')}
                                    {...register('pacienteId')}
                                    value={watch('pacienteId')}
                                    error={!!errors.pacienteId}
                                    helperText={errors.pacienteId?.message}
                                    fullWidth
                                >
                                    {pacientes.map((paciente) => (
                                        <MenuItem key={paciente._id} value={paciente._id}>
                                            {`${paciente.detalleId.nombre} ${paciente.detalleId.apellido}`}
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