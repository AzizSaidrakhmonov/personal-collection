import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locals/en/translationEN.json';
import translationUZ from './locals/uz/translationUZ.json';

const resources = {
    en: {
        translation: translationEN
    },

    uz: {
        translation: translationUZ
    }
};

i18n
    .use(initReactI18next) 
    .init({
        resources,
        lng: 'en',

        keySeparator: false,

        interpolation: {
            escapeValue: false
        }
    })

export default i18n;