import path from 'path';
import type { Express } from 'express';
import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import { createRequestHandler } from '@remix-run/express';
import { broadcastDevReady, installGlobals } from '@remix-run/node';
import sourceMapSupport from 'source-map-support';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

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

// Helmet para configurar múltiples encabezados de seguridad
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "https://sdk.mercadopago.com",
          "https://http2.mlstatic.com",
          "https://apis.google.com"
        ],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: [
          "'self'",
          "data:",
          "https://firebasestorage.googleapis.com",
          "https://www.mercadolivre.com",
          "https://www.mercadolibre.com"
        ],
        connectSrc: [
          "'self'",
          "ws://localhost:3001",
          "https://identitytoolkit.googleapis.com",
          "https://*.firebase.com",
          "https://*.firebaseio.com",
          "https://firestore.googleapis.com",
          "https://api.mercadopago.com",
          "https://api.mercadolibre.com",
          "https://www.mercadolibre.com",
          "https://sdk.mercadopago.com",
          "https://events.mercadopago.com",
          "https://api-static.mercadopago.com",
          "https://securetoken.googleapis.com",
          "https://firebasestorage.googleapis.com",
          "https://http2.mlstatic.com",
          "https://apis.google.com" 
        ],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
        blockAllMixedContent: [],
        frameAncestors: ["'self'"],
        workerSrc: ["'self'", 'blob:'],
        formAction: ["'self'"],
        frameSrc: [
          "'self'",
          "https://*.firebaseapp.com",
          "https://*.firebaseio.com",
          "https://api-static.mercadopago.com",
          "https://www.mercadolibre.com"
        ],
        manifestSrc: ["'self'"],
      },
    },
  }),
);


// Configuración específica de encabezados de seguridad adicionales
app.use((request, response, next) => {
  // Strict-Transport-Security (HSTS)
  response.set(
    'Strict-Transport-Security',
    `max-age=${60 * 60 * 24 * 365 * 2}; includeSubDomains; preload`,
  );

  // X-Content-Type-Options
  response.set('X-Content-Type-Options', 'nosniff');

  // X-Frame-Options
  response.set('X-Frame-Options', 'DENY');

  // X-XSS-Protection
  response.set('X-XSS-Protection', '1; mode=block');

  // Referrer-Policy
  response.set('Referrer-Policy', 'no-referrer');
  // Cleanup URLs (/clean-urls/ -> /clean-urls)
  if (request.path.endsWith('/') && request.path.length > 1) {
    const query = request.url.slice(request.path.length);
    const safePath = request.path.slice(0, -1).replace(/\/+/g, '/');
    response.redirect(301, safePath + query);
    return;
  }

  next();
});

// Configuración para limitar la tasa de solicitudes (rate limiting)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 1000, // limita cada IP a 1000 solicitudes por ventana de 15 minutos
  message: 'Demasiadas solicitudes, por favor intente nuevamente más tarde.',
});

app.use(limiter);

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

// Configuración de cookies seguras (ejemplo)
app.use((req, res, next) => {
  res.cookie('example', 'value', {
    httpOnly: true,
    secure: MODE === 'production', // Asegúrate de que tu aplicación esté detrás de HTTPS en producción
    sameSite: 'strict',
  });
  next();
});

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
