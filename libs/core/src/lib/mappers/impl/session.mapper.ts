import type {
  CartSession,
  Country,
  Currency,
  Locale,
  Session,
  Store,
  UserSession,
} from '@ducati/types';
import { ConstantNotDefinedError, ValidationError } from '@ducati/types';
import type { ILogObj } from 'tslog';
import { Logger } from 'tslog';

import type { DataMapper } from '..';
import type { LocalizationService } from '../../services';
import { SessionKeys } from '../../constants';

export class StoreScopedSessionMapper
  implements DataMapper<Session, Map<string, string | undefined>>
{
  private logger: Logger<ILogObj> = new Logger({
    name: 'StoreScopedSessionMapper',
  });

  private readonly store: Store;

  private localizationService: LocalizationService;

  constructor(store: Store, localizationService: LocalizationService) {
    this.store = store;
    this.localizationService = localizationService;
  }

  normalize(innerSessionValues: Map<string, string | undefined>): Session {
    // Store
    {
      /* TODO: Refactor when managing stores
    const storeId: string | undefined = innerSessionValues.get(SessionKeys.STORE_ID);
    if (!storeId) {
      throw new ValidationError('Store ID is required');
    } else if (storeId !== this.store.id) {
      throw new ValidationError(`Store ID [${storeId}] in InnerSession doesn't match configured store on server`);
    }
    */
    }

    // User
    const guid: string | undefined = innerSessionValues.get(
      SessionKeys.USER_GUID,
    );
    const userId: string | undefined = innerSessionValues.get(
      SessionKeys.USER_ID,
    );
    const userFirstName: string | undefined = innerSessionValues.get(
      SessionKeys.USER_FIRSTNAME,
    );
    const userLastName: string | undefined = innerSessionValues.get(
      SessionKeys.USER_LASTNAME,
    );
    const userAnonymous: string | undefined = innerSessionValues.get(
      SessionKeys.USER_ANONYMOUS,
    );

    {
      /* TODO: Refactor this as part of PCA-621 for anonymous cart merging
    if (!userId) {
      throw new ValidationError('User ID is required');
    } */
    }

    if (!userAnonymous) {
      throw new ValidationError('User anonymous is required');
    }

    const user: UserSession = {
      guid: guid!,
      id: userId == undefined ? '' : userId,
      firstName: userFirstName,
      lastName: userLastName,
      anonymous: userAnonymous === 'true',
    };

    // Cart
    const cartId: string | undefined = innerSessionValues.get(
      SessionKeys.CART_ID,
    );
    let cart: CartSession | undefined;
    if (cartId) {
      cart = {
        id: cartId,
      };
      this.logger.debug(`cart = ${JSON.stringify(cart)}`);
    }

    // Localization
    const countryIsocode: string | undefined = innerSessionValues.get(
      SessionKeys.COUNTRY_ISOCODE,
    );
    let country: Country | undefined;
    if (countryIsocode) {
      try {
        const countryReference: Country =
          this.localizationService.getCountry(countryIsocode);
        if (
          countryReference &&
          this.store.countries.includes(countryReference)
        ) {
          country = countryReference;
        } else {
          this.logger.warn(
            `Country ISO code [${countryIsocode}] found in InnerSession isn't enabled on Store [${this.store.id}]... setting to store default country`,
          );
          country = this.store.defaultCountry;
        }
      } catch (e: unknown) {
        if (e instanceof ConstantNotDefinedError) {
          this.logger.warn(
            `Country ISO code [${countryIsocode}] found in InnerSession doesn't exist... setting to store default country`,
          );
        }
        this.logger.warn(
          `Error occurred when parsing country ISO code [${countryIsocode}] from InnerSession... setting to store default country`,
        );
        country = this.store.defaultCountry;
      }
    }

    const currencyIsocode: string | undefined = innerSessionValues.get(
      SessionKeys.CURRENCY_ISOCODE,
    );
    let currency: Currency | undefined;
    if (currencyIsocode) {
      try {
        const currencyReference: Currency =
          this.localizationService.getCurrency(currencyIsocode);
        if (
          currencyReference &&
          this.store.currencies.includes(currencyReference)
        ) {
          currency = currencyReference;
        } else {
          this.logger.warn(
            `Currency ISO code [${currencyIsocode}] found in InnerSession isn't enabled on Store [${this.store.id}]... setting to store default currency`,
          );
          currency = this.store.defaultCurrency;
        }
      } catch (e: unknown) {
        if (e instanceof ConstantNotDefinedError) {
          this.logger.warn(
            `Currency ISO code [${currencyIsocode}] found in InnerSession doesn't exist... setting to store default currency`,
          );
        }
        this.logger.warn(
          `Error occurred when parsing currency ISO code [${currencyIsocode}] from InnerSession... setting to store default currency`,
        );
        currency = this.store.defaultCurrency;
      }
    }

    const localeIsocode: string | undefined = innerSessionValues.get(
      SessionKeys.LOCALE_ISOCODE,
    );
    let locale: Locale | undefined;
    if (localeIsocode) {
      try {
        const localeReference: Locale =
          this.localizationService.getLocale(localeIsocode);
        if (localeReference && this.store.locales.includes(localeReference)) {
          locale = localeReference;
        } else {
          this.logger.warn(
            `Locale ISO code [${localeIsocode}] found in InnerSession isn't enabled on Store [${this.store.id}]... setting to store default locale`,
          );
          locale = this.store.defaultLocale;
        }
      } catch (e: unknown) {
        if (e instanceof ConstantNotDefinedError) {
          this.logger.warn(
            `Locale ISO code [${localeIsocode}] found in InnerSession doesn't exist... setting to store default locale`,
          );
        }
        this.logger.warn(
          `Error occurred when parsing locale ISO code [${localeIsocode}] from InnerSession... setting to store default locale`,
        );
        locale = this.store.defaultLocale;
      }
    }

    return {
      user,
      cart,
      country: country ?? this.store.defaultCountry,
      currency: currency ?? this.store.defaultCurrency,
      locale: locale ?? this.store.defaultLocale,
      storeId: '',
    };
  }

  serialize(session: Session): Map<string, string | undefined> {
    const innerSessionValues: Map<string, string | undefined> = new Map<
      string,
      string | undefined
    >();

    // Store
    innerSessionValues.set(SessionKeys.STORE_ID, session.storeId);

    // User
    innerSessionValues.set(SessionKeys.USER_ID, session.user.id);
    innerSessionValues.set(SessionKeys.USER_GUID, session.user.guid);
    innerSessionValues.set(
      SessionKeys.USER_ANONYMOUS,
      session.user.anonymous.toString(),
    );
    if (session.user.firstName) {
      innerSessionValues.set(
        SessionKeys.USER_FIRSTNAME,
        session.user.firstName,
      );
    }
    if (session.user.lastName) {
      innerSessionValues.set(SessionKeys.USER_LASTNAME, session.user.lastName);
    }

    // Cart
    if (session.cart) {
      innerSessionValues.set(SessionKeys.CART_ID, session.cart.id);
    }

    // Localization
    innerSessionValues.set(
      SessionKeys.COUNTRY_ISOCODE,
      session.country.isocode,
    );
    innerSessionValues.set(
      SessionKeys.CURRENCY_ISOCODE,
      session.currency.isocode,
    );
    innerSessionValues.set(SessionKeys.LOCALE_ISOCODE, session.locale.isocode);

    return innerSessionValues;
  }
}
