import * as fs from 'fs';
import * as path from 'path';
import type { ILogObj } from 'tslog';
import { Logger } from 'tslog';
import * as _ from 'lodash';

import { ConfigService } from '..';

export class EnvironmentVariableConfigService extends ConfigService {
  constructor() {
    super();
  }

  getValue<T>(propertyName: string, configType?: string): T | undefined {
    const envVarValue: string | undefined =
      process.env[
        configType
          ? configType.concat('_', propertyName)
          : ConfigService.APP_CONFIG_TYPE.concat('_', propertyName)
      ];
    return envVarValue ? (envVarValue as T) : undefined;
  }

  getConfig(configType?: string): { [index: string]: object } | undefined {
    let config: { [index: string]: object } | undefined;
    for (const envVar of Object.keys(process.env)) {
      const envVarKeySplit: string[] = envVar.split('_');
      const envVarConfigType: string = envVarKeySplit[0];

      if (
        configType
          ? configType === envVarConfigType
          : ConfigService.APP_CONFIG_TYPE === envVarConfigType
      ) {
        const envVarValue: string | undefined = process.env[envVar];

        const currentConfig: { [index: string]: object } = {};
        let nestedConfig: any;
        envVarKeySplit.forEach((envVarKeySegment: string, index: number) => {
          if (index !== 0) {
            if (index === 1) {
              currentConfig[envVarKeySegment] = {};
              nestedConfig = currentConfig[envVarKeySegment];
            } else if (index !== envVarKeySplit.length - 1) {
              nestedConfig[envVarKeySegment] = {};
              nestedConfig = nestedConfig[envVarKeySegment];
            } else {
              nestedConfig[envVarKeySegment] = envVarValue;
            }
          }
        });

        if (config) {
          _.merge(config, currentConfig);
        } else {
          config = currentConfig;
        }
      }
    }
    return config;
  }
}

export class FileSystemConfigService extends EnvironmentVariableConfigService {
  private logger: Logger<ILogObj> = new Logger({
    name: 'FileSystemConfigService',
  });

  private static DEFAULT_PROFILE = 'default';

  private static PROFILE_CONFIG_PROP = 'profile';

  private readonly configs: Map<string, { [index: string]: object }>;

  constructor(configDir: string, profile?: string) {
    super();
    const envVarProfile: string | undefined = super.getValue<string>(
      FileSystemConfigService.PROFILE_CONFIG_PROP,
    );
    this.configs = this.loadConfig(configDir, profile ?? envVarProfile);
  }

  override getValue<T>(
    propertyName: string,
    configType?: string,
  ): T | undefined {
    let configValue: T | undefined;
    const config: { [index: string]: object } | undefined = this.configs.get(
      configType ?? ConfigService.APP_CONFIG_TYPE,
    );
    if (config) {
      let currentConfig: any = config;
      propertyName
        .split('.')
        .forEach((propertySegment: string, index: number) => {
          if (index !== propertyName.split('.').length - 1) {
            currentConfig = currentConfig[propertySegment];
          } else {
            configValue = currentConfig[propertySegment] as T;
          }
        });
    }
    return configValue;
  }

  override getConfig(configType?: string): any | undefined {
    return this.configs.get(configType ?? ConfigService.APP_CONFIG_TYPE);
  }

  private loadConfig(
    configDir: string,
    profile?: string,
  ): Map<string, { [index: string]: object }> {
    const configFiles: Map<
      string,
      Map<string, { [index: string]: object }>
    > = this.loadFileConfig(configDir, profile);
    const configTypes: string[] = Array.from(configFiles.keys());
    const configEnvVars: Map<string, { [index: string]: object }> =
      this.loadEnvVarConfig(configTypes);

    const configs: Map<string, { [index: string]: object }> = new Map<
      string,
      { [index: string]: object }
    >();
    configTypes.forEach((configType: string) => {
      let configValue: { [index: string]: object } =
        configFiles
          .get(configType)
          ?.get(FileSystemConfigService.DEFAULT_PROFILE) ?? {};
      if (profile) {
        configValue = _.merge(
          configValue,
          configFiles.get(configType)?.get(profile),
        );
      }
      configValue = _.merge(configValue, configEnvVars.get(configType));
      configs.set(configType, configValue);
    });

    return configs;
  }

  private loadEnvVarConfig(
    configTypes: string[],
  ): Map<string, { [index: string]: object }> {
    const config: Map<string, { [index: string]: object }> = new Map<
      string,
      { [index: string]: object }
    >();
    configTypes.forEach((configType: string) => {
      const configValue: { [index: string]: object } | undefined =
        super.getConfig(configType);
      if (configValue) {
        config.set(configType, configValue);
      }
    });
    return config;
  }

  private loadFileConfig(
    configDir: string,
    profile?: string,
  ): Map<string, Map<string, { [index: string]: object }>> {
    const configurationFiles: Map<
      string,
      Map<string, { [index: string]: object }>
    > = new Map<string, Map<string, { [index: string]: object }>>();

    try {
      fs.readdirSync(configDir, { withFileTypes: true })
        .filter((file: fs.Dirent) => {
          const fileName: string = path.basename(file.name, '.json');
          const fileNameSplit: string[] = fileName.split('.');
          const configProfile: string =
            fileNameSplit.length === 3
              ? fileNameSplit[1]
              : FileSystemConfigService.DEFAULT_PROFILE;

          return (
            file.isFile() &&
            path.extname(file.name) === '.json' &&
            ((profile && configProfile === profile) ||
              configProfile === FileSystemConfigService.DEFAULT_PROFILE)
          );
        })
        .forEach((file: fs.Dirent) => {
          const fileName: string = path.basename(file.name, '.json');
          const fileNameSplit: string[] = fileName.split('.');

          const configType: string = fileNameSplit[0];
          const configProfile: string =
            fileNameSplit.length === 3
              ? fileNameSplit[1]
              : FileSystemConfigService.DEFAULT_PROFILE;
          const filePath = path.resolve(process.cwd(), '../..', configDir);
          const configData: { [index: string]: object } = JSON.parse(
            fs.readFileSync(path.join(filePath, file.name), 'utf8'),
          );

          if (configurationFiles.has(configType)) {
            configurationFiles.get(configType)?.set(configProfile, configData);
          } else {
            configurationFiles.set(
              configType,
              new Map<string, { [index: string]: object }>(),
            );
            configurationFiles.get(configType)?.set(configProfile, configData);
          }
        });
    } catch (e: unknown) {
      this.logger.error(
        `Could not load configuration files from directory '${configDir}' as the directory does not exist.`,
        e,
      );
      throw e;
    }

    return configurationFiles;
  }
}
