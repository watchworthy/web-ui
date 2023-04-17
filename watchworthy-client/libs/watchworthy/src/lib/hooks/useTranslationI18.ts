import { i18n, TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

interface P {
  t: TFunction;
  i18n: i18n;
}

export const useTranslationI18 = (): P => {
  const { t, i18n } = useTranslation('common');

  return {
    t,
    i18n,
  };
};
