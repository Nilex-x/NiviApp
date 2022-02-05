import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import fr from './fr';

i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    lng: "fr",
    resources: {
        fr: {
            translation: fr,
        },
        en: {
            translation: en,
        }
    },

});
export default i18n;