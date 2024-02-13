import type { Params } from '@remix-run/router';

export class UrlUtils {
  /**
   * Retrieves the lowest level path from a URL.
   *
   * @param urlPath URL to retrieve the leaf path from.
   * @param retainQueryParams Whether or not to retain query parameters in the leaf path.
   */
  static getLeafPath(urlPath: string, retainQueryParams: boolean): string {
    let leafPath = '';

    if (urlPath) {
      const urlHierarchy: string[] = urlPath.trim().split('/');
      leafPath = urlHierarchy[urlHierarchy.length - 1];
    }

    if (!retainQueryParams) {
      const leafPathHierarchy: string[] = leafPath.split('?');
      leafPath = leafPathHierarchy[0];
    }

    return leafPath;
  }

  /**
   * This should be used any time the redirect path is user-provided
   * (Like the query string on our login/signup pages). This avoids
   * open-redirect vulnerabilities.
   * @param {string} to The redirect destination
   * @param {string} defaultRedirect The redirect to use if the to is unsafe.
   */
  static safeRedirect(
    to: FormDataEntryValue | string | null | undefined,
    defaultRedirect = '/',
  ) {
    if (!to || typeof to !== 'string') {
      return defaultRedirect;
    }
    if (!to.startsWith('/') || to.startsWith('//')) {
      return defaultRedirect;
    }
    return to;
  }

  /**
   * Adds a path to a string representing at URL, ensuring that the url ends with a slash prior to appending
   * a new path, and the path being appended does not start with a slash.
   *
   * @param url url to append path to
   * @param path path to append to url
   */
  static addPath(url: string | undefined, path: string | undefined): string {
    if (!url) {
      url = '';
    }
    if (path) {
      if (url.length != 0 && url.charAt(url.length - 1) !== '/') {
        url += '/';
      }

      if (path.charAt(0) === '/') {
        path = path.substring(1);
      }

      return url + path;
    }
    return url;
  }

  /**
   * Creates a safe slug from a string, replacing all spaces with underscores.
   * If the passed string contains any non-alphanumeric characters other than spaces or hyphens, null is returned.
   *
   * @param slug string to create safe slug from
   * @return safe slug, or null if slug contains non-alphanumeric characters other than spaces or hyphens
   */
  static createSafeSlug(slug: string | undefined): string | undefined {
    if (slug) {
      const regexAlphaNumericSpace = new RegExp('^[a-zA-Z0-9 -]*$');
      if (slug.match(regexAlphaNumericSpace) != null) {
        return slug.replaceAll(' ', '_');
      }
    }
    return undefined;
  }

  /**
   * Reverses transformation of a safe slug, replacing all dashes with underscores.
   *
   * @param slug to reverse transformation from
   * @return reverse transformed slug
   */
  static reverseSafeSlugTransformation(
    slug: string | undefined,
  ): string | undefined {
    if (slug) {
      return slug.replaceAll('_', ' ');
    }
    return undefined;
  }

  /**
   * Parses the value of a query parameter from a slug.
   *
   * @param slug slug to parse
   * @param queryParameter query parameter to parse value of
   */
  static parseQueryParamValueFromSlug(
    slug: string,
    queryParameter: string,
  ): string | undefined {
    const slugRegex = `.*(\\?|&)(${queryParameter}=.*(?!&))`;
    const matches: RegExpMatchArray | null = slug.match(slugRegex);
    if (matches && matches.length > 2) {
      return matches[2].substring(queryParameter.length + 1).trim();
    }
    return undefined;
  }

  /**
   * Parses splat from a request URL, omitting all query parameters by default.
   * If a queryParameter is provided as input, it will be appended to the returned splat.
   *
   * @param requestUrl url to parse splat from
   * @param requestParams params to parse splat from
   * @param queryParameter query parameter to append to splat
   */
  static parseSplatFromRequest(
    requestUrl: string,
    requestParams: Params,
    queryParameter?: string,
  ): string | undefined {
    let slug = '';
    const urlSlug: string | undefined = requestParams['*'];

    let queryParameterValue: string | null = null;
    if (queryParameter) {
      queryParameterValue = new URL(requestUrl).searchParams.get(
        queryParameter,
      );
    }

    if (urlSlug) {
      slug += urlSlug;
    }
    if (queryParameterValue) {
      slug += `?${queryParameter}=${queryParameterValue}`;
    }

    return slug === '' ? undefined : slug;
  }

  /**
   * Parses query parameters from a request URL
   * @param requestUrl url to parse query parameters from
   * @return query parameters as a string without the prefixed question mark
   */
  static parseQueryParamsFromRequest(requestUrl: string): string {
    return new URL(requestUrl).searchParams.toString();
  }
}
