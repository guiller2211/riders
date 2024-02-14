import path from 'path';
import { createRequestHandler } from '@netlify/remix-adapter';
import { installGlobals } from '@remix-run/node';

// Ruta del directorio de salida
const OUTPUT_DIR = process.env.OUTPUT_DIR || 'apps/ducati/dist';
const OUTPUT_DIR_PATH = path.join(process.cwd(), OUTPUT_DIR);

// Instala los globales de Node para el Fetch
installGlobals();

// Función para purgar la caché de require
function purgeRequireCache() {
  for (const key in require.cache) {
    if (key.startsWith(OUTPUT_DIR)) {
      delete require.cache[key];
    }
  }
}

exports.handler = async (event:any, context:any) => {
  try {
    // Requiere el archivo de construcción
    const build = require(OUTPUT_DIR_PATH);

    // Crea el manejador de solicitudes
    const requestHandler = createRequestHandler({ build });

    // Verifica si estamos en producción
    if (process.env.NODE_ENV === 'production') {
      // Si estamos en producción, simplemente ejecuta el manejador de solicitudes
      return requestHandler(event, context);
    } else {
      // Si no estamos en producción, purga la caché de require y luego ejecuta el manejador de solicitudes
      purgeRequireCache();
      return requestHandler(event, context);
    }
  } catch (error) {
    // Maneja cualquier error que pueda ocurrir al requerir el archivo de construcción
    console.error('Error al requerir el archivo de construcción:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
