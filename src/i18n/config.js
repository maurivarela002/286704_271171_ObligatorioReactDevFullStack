import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import authEs from './locales/auth/es.json';
import authEn from './locales/auth/en.json';

import dashboardEs from './locales/dashboard/es.json';
import dashboardEn from './locales/dashboard/en.json';

import sharedEs from './locales/shared/es.json';
import sharedEn from './locales/shared/en.json';

import reserveEs from './locales/reserve/es.json';
import reserveEn from './locales/reserve/en.json';

import StorageUsageEs from './locales/StorageUsage/es.json';
import StorageUsageEn from './locales/StorageUsage/en.json';

import statisticsEs from './locales/statistics/es.json';
import statisticsEn from './locales/statistics/en.json';

const resources = {
  es: {
    auth: authEs,
    dashboard: dashboardEs,
    shared: sharedEs,
    reserve: reserveEs,
    StorageUsage: StorageUsageEs,
    statistics: statisticsEs
  },
  en: {
    auth: authEn,
    dashboard: dashboardEn,
    shared: sharedEn,
    reserve: reserveEn,
    StorageUsage: StorageUsageEn,
    statistics: statisticsEn
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    defaultNS: 'shared',
    ns: ['auth', 'dashboard', 'shared', 'reserve', 'StorageUsage', 'statistics'],
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;