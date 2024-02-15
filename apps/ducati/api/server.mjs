import express from "express";
import {
  unstable_createViteServer,
  unstable_loadViteServerBuild,
} from "@remix-run/dev";
import { createRequestHandler } from "@remix-run/express";
import { installGlobals, broadcastDevReady } from "@remix-run/node";

async function startServer() {
  installGlobals();

  let vite;

  if (process.env.NODE_ENV === "development") {
    vite = await unstable_createViteServer({
      // Configuración específica de desarrollo para Vite
    });
    // Escucha cambios y transmite la señal de dev ready
    broadcastDevReady(require.resolve("ruta/de/tu/entry/file"));
  }

  const app = express();

  // Maneja solicitudes de activos
  if (vite) {
    app.use(vite.middlewares);
  } else {
    app.use(
      "/build",
      express.static("public/build", { immutable: true, maxAge: "1y" })
    );
  }
  app.use(express.static("public", { maxAge: "1h" }));

  // Maneja solicitudes SSR
  app.all(
    "*",
    createRequestHandler({
      build: vite
        ? () => unstable_loadViteServerBuild(vite)
        : require.resolve("../dist/public/build"),
    })
  );

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`App Ready: http://localhost:${port}`);

    if (process.env.NODE_ENV === "development") {
      broadcastDevReady(require.resolve("ruta/de/tu/entry/file"));
    }
  });
}

startServer();
