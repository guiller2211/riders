import path from 'path';
import { createRequestHandler } from '@netlify/remix-adapter';
import { installGlobals } from '@remix-run/node';

const OUTPUT_DIR = process.env.OUTPUT_DIR || 'apps/ducati/dist';
const OUTPUT_DIR_PATH = path.join(process.cwd(), OUTPUT_DIR);

// Leverage Node's Built-In Fetch Implementation
installGlobals();

function purgeRequireCache() {
  // purge require cache on requests for "server side HMR" this won't let
  // you have in-memory objects between requests in development,
  // netlify typically does this for you, but we've found it to be hit or
  // miss and sometimes requires you to refresh the page after it auto reloads
  // or even have to restart your server
  for (const key in require.cache) {
    if (key.startsWith(OUTPUT_DIR)) {
      delete require.cache[key];
    }
  }
}

exports.handler = async (event: any, context: any) => {
  return createRequestHandler({
    build: require(OUTPUT_DIR_PATH),
  })(event, context);
};
