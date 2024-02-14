import path from 'path';
import { createRequestHandler } from '@netlify/remix-adapter';
import { installGlobals } from '@remix-run/node';
import { Handler, HandlerResponse } from '@netlify/functions';

const OUTPUT_DIR = process.env.OUTPUT_DIR || 'apps/ducati/dist';
const OUTPUT_DIR_PATH = path.join(process.cwd(), OUTPUT_DIR);

// Leverage Node's Built-In Fetch Implementation
installGlobals();

// Función para purgar la caché de require
function purgeRequireCache() {
  for (const key in require.cache) {
    if (key.startsWith(OUTPUT_DIR)) {
      delete require.cache[key];
    }
  }
}

export const handler: Handler = async (event: any, context: any): Promise<HandlerResponse> => {
  try {
    // Requiere el archivo de construcción
    const build = require(OUTPUT_DIR_PATH);

    // Verifica si estamos en producción
    if (process.env.NODE_ENV === 'production') {
      // Si estamos en producción, simplemente ejecuta el manejador de solicitudes
      const response = await createRequestHandler({ build })(event, context);
      // Envuelve la respuesta en un objeto HandlerResponse si es necesario
      return wrapResponse(response);
    } else {
      // Si no estamos en producción, purga la caché de require y luego ejecuta el manejador de solicitudes
      purgeRequireCache();
      const response = await createRequestHandler({ build })(event, context);
      // Envuelve la respuesta en un objeto HandlerResponse si es necesario
      return wrapResponse(response);
    }
  } catch (error) {
    // Maneja cualquier error que pueda ocurrir al requerir el archivo de construcción
    console.error('Error al requerir el archivo de construcción:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', e: process.env.NODE_ENV }),
    };
  }
};

// Función para envolver una respuesta en un objeto HandlerResponse si es necesario
function wrapResponse(response: any): HandlerResponse {
  if (!response) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }

  // Si la respuesta ya es un objeto HandlerResponse, devuélvela directamente
  if ('statusCode' in response && 'body' in response) {
    return response;
  }

  // Si la respuesta es de tipo Response, envuélvela en un objeto HandlerResponse
  return {
    statusCode: response.status || 200,
    body: JSON.stringify(response.body || ''),
  };
}