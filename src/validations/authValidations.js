import * as yup from 'yup';

export const getLoginSchema = (t) => {
  return yup.object().shape({
    username: yup
      .string()
      .required(t('validation.required', { ns: 'shared' }))
      .min(3, t('validation.minLength', { count: 3, ns: 'shared' }))
      .max(20, t('validation.maxLength', { count: 20, ns: 'shared' })),
    password: yup
      .string()
      .required(t('validation.required', { ns: 'shared' }))
      .min(6, t('validation.minLength', { count: 6, ns: 'shared' }))
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, t('validation.validationPassword', { ns: 'shared' })),
  });
};

export const getSignupSchema = (t) => {
  return yup.object().shape({
    username: yup
      .string()
      .required(t('validation.required', { ns: 'shared' }))
      .min(3, t('validation.minLength', { count: 3, ns: 'shared' }))
      .max(20, t('validation.maxLength', { count: 20, ns: 'shared' })),
    email: yup
      .string()
      .email(t('validation.validationEmail', { ns: 'shared' }))
      .required(t('validation.required', { ns: 'shared' }))
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, t('validation.validationEmail', { ns: 'shared' }))
      .max(20, t('validation.maxLength', { count: 20, ns: 'shared' })),
    password: yup
      .string()
      .required(t('validation.required', { ns: 'shared' }))
      .min(6, t('validation.minLength', { count: 6, ns: 'shared' }))
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, t('validation.validationPassword', { ns: 'shared' })),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t('signup.errors.passwordsDoNotMatch', { ns: 'auth' }))
  });
};