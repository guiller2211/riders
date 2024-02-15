import path from 'path';
import { createRequestHandler } from '@netlify/remix-adapter';
import { installGlobals } from '@remix-run/node';
import { Handler } from '@netlify/functions';

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

export const handler: Handler = async (event, context) => {
  try {
    // Verifica si estamos en producción
    if (process.env.NODE_ENV === 'production') {
      // Aquí debes colocar la lógica para manejar las solicitudes en producción
      // Supongamos que estás usando Remix y tienes una función createRequestHandler
      const result = await createRequestHandler({
        build: require(OUTPUT_DIR_PATH),
      })(event, context);
      
      // Devuelve el resultado
      return result;
    } else {
      // Si no estamos en producción, limpiamos la caché de require y creamos un manejador de solicitudes
      purgeRequireCache();
      const result = await createRequestHandler({
        build: require(OUTPUT_DIR_PATH),
      })(event, context);
      
      // Devuelve el resultado
      return result;
    }
  } catch (error) {
    // Maneja cualquier error que pueda ocurrir durante la ejecución
    console.error('Error handling request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
