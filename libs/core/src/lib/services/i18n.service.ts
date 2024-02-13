import type { Language, Locale } from '@ducati/types';
import type { ILogObj } from 'tslog';
import { Logger } from 'tslog';

import { AbstractService } from './service';
import { JsonUtils } from '../utils';

export abstract class I18nService extends AbstractService {
  static TYPE = 'i18nService';

  private static logger: Logger<ILogObj> = new Logger({ name: 'I18nService' });

  protected constructor(type?: string) {
    super(type ?? I18nService.TYPE);
  }

  abstract getTranslations(
    namespaces: string[],
    locale: Locale,
  ): Map<string, { [index: string]: object }>;

  abstract translate(
    namespace: string,
    key: string,
    locale: Locale,
    substitutions?: {
      [index: string]: string;
    },
  ): string;

  static getTranslationFromJson(
    namespacedTranslations: { [index: string]: object },
    key: string,
    dialect: Locale | Language,
    substitutions?: { [index: string]: string },
  ): string {
    let localizedValue = key;

    if (namespacedTranslations) {
      try {
        localizedValue = JsonUtils.parseValueFromKey(
          namespacedTranslations,
          key,
          '.',
        );
      } catch (e: unknown) {
        if (e instanceof TypeError) {
          I18nService.logger.warn(
            `Could not find i18n localization key [${key}] for dialect [${dialect.isocode}]`,
          );
          return key;
        }
        throw e;
      }
    } else {
      I18nService.logger.warn(
        `No translations provided for dialect [${dialect.isocode}]`,
      );
    }

    // Replace Placeholders in Translated Value
    if (localizedValue && localizedValue !== key && substitutions) {
      Object.entries(substitutions).forEach(([key, value]) => {
        if (value) {
          localizedValue = localizedValue.replace(`{{${key}}}`, value);
        }
      });
    }
    return localizedValue || key;
  }
}
