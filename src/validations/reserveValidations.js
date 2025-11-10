import * as yup from 'yup';

export const getReserveSchema = (t) => {
  return yup.object().shape({
    fechaReserva: yup.date().required(t('validation.required', { ns: 'shared' })),
    especialidadId: yup.string().required(t('validation.required', { ns: 'shared' })),
    clinicaId: yup.string().required(t('validation.required', { ns: 'shared' })),
    odontologoId: yup.string().required(t('validation.required', { ns: 'shared' })),
    pacienteId: yup.string().required(t('validation.required', { ns: 'shared' }))
  });
};
