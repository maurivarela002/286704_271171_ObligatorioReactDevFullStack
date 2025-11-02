import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import authEs from './locales/auth/es.json';
import authEn from './locales/auth/en.json';

import dashboardEs from './locales/dashboard/es.json';
import dashboardEn from './locales/dashboard/en.json';

import sharedEs from './locales/shared/es.json';
import sharedEn from './locales/shared/en.json';

const resources = {
  es: {
    auth: authEs,
    dashboard: dashboardEs,
    shared: sharedEs
  },
  en: {
    auth: authEn,
    dashboard: dashboardEn,
    shared: sharedEn
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    defaultNS: 'shared',
    ns: ['auth', 'dashboard', 'shared'],
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;