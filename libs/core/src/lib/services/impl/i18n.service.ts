import type { Language, Locale } from '@ducati/types';
import { ConstantNotDefinedError } from '@ducati/types';
import type { ILogObj } from 'tslog';
import { Logger } from 'tslog';
import * as fs from 'fs';
import * as path from 'path';

import type { LocalizationService } from '../localization.service';
import { I18nService } from '../i18n.service';

export class FileSystemI18nService extends I18nService {
  private logger: Logger<ILogObj> = new Logger({
    name: 'FileSystemI18nService',
  });

  private readonly translations: Map<
    Locale | Language,
    Map<string, { [index: string]: object }>
  >;

  constructor(localizationService: LocalizationService, i18DataDir: string) {
    super();
    this.translations = this.loadTranslations(localizationService, i18DataDir);
  }

  private loadTranslations(
    localizationService: LocalizationService,
    i18DataDir: string,
  ): Map<Locale | Language, Map<string, { [index: string]: object }>> {
    const translations: Map<
      Locale | Language,
      Map<string, { [index: string]: object }>
    > = new Map<Locale | Language, Map<string, { [index: string]: object }>>();

    try {
      // List of Localization Directories
      fs.readdirSync(i18DataDir, { withFileTypes: true }).forEach(
        (localeDir: fs.Dirent) => {
          if (localeDir && localeDir.isDirectory()) {
            let dialect: Locale | Language;

            try {
              // Cross-Reference Directory Name with Supported Locales
              dialect = localizationService.getLocale(localeDir.name);
            } catch (e: unknown) {
              if (e instanceof ConstantNotDefinedError) {
                try {
                  // Cross-Reference Directory Name with Supported Languages
                  dialect = localizationService.getLanguage(localeDir.name);
                } catch (e: unknown) {
                  if (e instanceof ConstantNotDefinedError) {
                    this.logger.warn(
                      `Could not load localization directory '${localeDir.name}' as the name is not a valid locale or language.`,
                    );
                    this.logger.debug(e);
                    return; // Don't fail, instead skip to next directory
                  }
                  throw e;
                }
              } else {
                throw e;
              }
            }

            translations.set(
              dialect,
              new Map<string, { [index: string]: object }>(),
            );

            // List of Namespaced Files for Localization
            fs.readdirSync(path.resolve(i18DataDir, localeDir.name), {
              withFileTypes: true,
            })
              .filter((file: fs.Dirent) => {
                return file.isFile() && path.extname(file.name) === '.json';
              })
              .forEach((file: fs.Dirent) => {
                const namespace: string = path.basename(file.name, '.json');
                const namespacePath: string = path.resolve(
                  i18DataDir,
                  localeDir.name,
                  file.name,
                );

                try {
                  translations
                    .get(dialect)
                    ?.set(
                      namespace,
                      JSON.parse(fs.readFileSync(namespacePath, 'utf-8')),
                    );
                } catch (e: unknown) {
                  this.logger.warn(
                    `Could not load localization file '${namespacePath}' as the file is not a valid JSON file.`,
                  );
                  // Don't fail, instead skip to next file
                }
              });
          }
        },
      );
    } catch (e: unknown) {
      this.logger.error(
        `Could not load localization files from directory '${i18DataDir}' as the directory does not exist.`,
        e,
      );
      throw e; // Fail
    }

    return translations;
  }

  getTranslations(
    namespaces: string[],
    locale: Locale,
  ): Map<string, { [index: string]: object }> {
    const translations: Map<string, { [index: string]: object }> = new Map<
      string,
      { [index: string]: object }
    >();
    namespaces.forEach((namespace: string) => {
      const dialectLocalizations:
        | Map<string, { [index: string]: object }>
        | undefined = this.translations.has(locale)
        ? this.translations.get(locale)
        : this.translations.get(locale.language);
      if (dialectLocalizations && dialectLocalizations.has(namespace)) {
        const namespacedTranslations: { [index: string]: object } | undefined =
          dialectLocalizations.get(namespace);
        if (namespacedTranslations) {
          translations.set(namespace, namespacedTranslations);
        }
      }
    });
    return translations;
  }

  translate(
    namespace: string,
    key: string,
    locale: Locale,
    substitutions?: { [index: string]: string },
  ): string {
    const namespacedTranslations: Map<string, { [index: string]: object }> =
      this.getTranslations([namespace], locale);
    if (namespacedTranslations) {
      return I18nService.getTranslationFromJson(
        namespacedTranslations.values().next().value,
        key,
        locale,
        substitutions,
      );
    }
    this.logger.warn(
      `Could not find i18n localization namespace [${namespace}] for key [${key}]`,
    );
    return key;
  }
}
