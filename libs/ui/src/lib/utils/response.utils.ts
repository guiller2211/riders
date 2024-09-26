export class ResponseUtils {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static jsonResp(data: any, resp: ResponseInit) {
    return new Response(JSON.stringify(data), {
      status: resp.status,
      statusText: resp.statusText,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...resp.headers,
      },
    });
  }

  static redirectResp(url: string, resp?: number | ResponseInit) {
    const status = typeof resp === 'number' ? resp : resp?.status || 302;
    const statusText =
      typeof resp === 'number' ? undefined : resp?.statusText || 'Found';
    const headers = typeof resp === 'number' ? undefined : resp?.headers || {};

    return new Response(null, {
      status,
      statusText,
      headers: {
        Location: url,
        ...headers,
      },
    });
  }
}
