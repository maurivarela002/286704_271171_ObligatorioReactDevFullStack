import * as yup from 'yup';

export const getReserveSchema = (t) => {
  return yup.object().shape({
    fechaReserva: yup.date().required(t('validation.required')),
    especialidad: yup.object().shape({
      _id: yup.string().required(t('validation.required')),
    }).required(t('validation.required')),
    clinica: yup.object().shape({
      _id: yup.string().required(t('validation.required'))
    }).required(t('validation.required')),
    odontologo: yup.object().shape({
      _id: yup.string().required(t('validation.required'))
    }).required(t('validation.required'))
  });
};
