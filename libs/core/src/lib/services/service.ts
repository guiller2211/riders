export interface AppService {
  TYPE: string;
}

export abstract class AbstractService implements AppService {
  TYPE: string;

  protected constructor(type: string) {
    this.TYPE = type;
  }
}
