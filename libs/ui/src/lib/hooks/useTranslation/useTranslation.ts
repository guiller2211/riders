import { I18nService } from '@ducati/core';

import type { ILogObj } from 'tslog';
import { Logger } from 'tslog';
import { useContext } from 'react';

import type { SessionContextProps } from '../../context';
import { I18nContext, SessionContext } from '../../context';

const logger: Logger<ILogObj> = new Logger({ name: 'useTranslation' });

export type TranslationFunction = (
  key: string,
  namespace?: string,
  substitutions?: { [index: string]: string },
) => string;

export const useTranslation = (): TranslationFunction => {
  const labels: Map<string, { [index: string]: object }> =
    useContext(I18nContext);
  const session: SessionContextProps = useContext(SessionContext);

  return (
    key: string,
    namespace?: string,
    substitutions?: { [index: string]: string },
  ) => {
    if (!labels || labels.size === 0) {
      logger.warn(
        `Could not find i18n localization labels${
          namespace ? ` for namespace [${namespace}]` : ''
        }... returning key`,
      );
      return key;
    }
    const namespacedTranslations: { [index: string]: object } | undefined =
      namespace && labels.has(namespace)
        ? labels.get(namespace)
        : [...labels][0][1];

    if (namespacedTranslations) {
      return I18nService.getTranslationFromJson(
        namespacedTranslations,
        key,
        session.session.locale,
        substitutions,
      );
    }
    logger.warn(
      'Could not find i18n localization namespace'
        .concat(`${namespace ? '['.concat(namespace).concat(']') : ''}`)
        .concat(`for key [${key}]`),
    );
    return key;
  };
};
