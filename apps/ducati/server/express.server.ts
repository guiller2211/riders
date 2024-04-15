import path from 'path';
import type { Express } from 'express';
import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import { createRequestHandler } from '@remix-run/express';
import { broadcastDevReady, installGlobals } from '@remix-run/node';
import sourceMapSupport from 'source-map-support';

const OUTPUT_DIR = process.env.OUTPUT_DIR || 'dist';
let outputPath = path.join(process.cwd());

OUTPUT_DIR.split('/').forEach(
  (value) => (outputPath = path.join(outputPath, value)),
);
const ENTRY = path.join(outputPath, 'index.js');

const MODE = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 4002;

// Leverage Node's Built-In Fetch Implementation
installGlobals();

// Source Map Support
sourceMapSupport.install();

const app: Express = express();

app.use((request, response, next) => {
  // Helpful Headers:
  response.set(
    'Strict-Transport-Security',
    `max-age=${60 * 60 * 24 * 365 * 100}`,
  );

  // Cleanup URLs (/clean-urls/ -> /clean-urls)
  if (request.path.endsWith('/') && request.path.length > 1) {
    const query = request.url.slice(request.path.length);
    const safePath = request.path.slice(0, -1).replace(/\/+/g, '/');
    response.redirect(301, safePath + query);
    return;
  }

  next();
});

// Compress Response Bodies
// https://github.com/expressjs/compression
app.use(compression());

// Reduce Server Fingerprinting
// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by');

// Caching - Remix fingerprints application assets, so we can cache forever.
app.use(
  '/build',
  express.static(path.join('public', 'build'), {
    immutable: true,
    maxAge: '1y',
  }),
);

// Caching - Non-Remix assets
app.use(express.static(path.join(OUTPUT_DIR, 'public'), { maxAge: '1h' }));

// Enable HTTP Request Console Logging (ex: GET / 200 - - 100.000 ms)
app.use(morgan('tiny'));

// Handle Inbound Requests
app.all(
  '*',
  createRequestHandler({
    build: require(outputPath),
    mode: MODE,
  }),
);

// Start Server
app.listen(PORT, () => {
  console.log(`✔︎ App Ready: http://localhost:${PORT}`);

  // in development, call `broadcastDevReady` AFTER your server is up and running
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    broadcastDevReady(require(ENTRY));
  }
});
