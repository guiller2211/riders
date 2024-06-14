# Rider's Realm UI Toolkit

Un paquete integral de herramientas de UI para React.

- 28 Componentes.<br>
- 14 utilidades.<br>
- 23 Iconos.<br>
- 10 Hooks.<br>
<hr>

### Prerrequisitos

Asegúrate de tener instalados los siguientes programas:

- Node.js [v16.19.1](https://nodejs.org/dist/v16.19.1/) o Superior.
- npm 8.19.3.
- Visual Studio Code.
<hr>

### Instalacion

Para instalar las dependencias necesarias, ejecuta:

```sh
npm run install --legacy-peer-deps 

o

yarn install
```

<hr>

### Build

Para compilar el proyecto, ejecuta:

```sh
npx nx build ui
```

Este comando genera la carpeta dist y otros archivos en el directorio raíz.

<hr>

### Integración con Remix

<br>
1 - Inicia el proyecto:
<br>

```sh
npx nx run riders:dev:development --skip-nx-cache
```

### Testing en los Package

```sh
npm run ui:test
```

```sh
npm run provider-firebase:test
```

<hr>

### Componentes

<hr>

- Action Bar
- Alert
- Avatar
- Badge
- Breadcrumbs
- Button
- Card
- Carousel
- Checkbox
- Divider
- Dropdown menu
- Link
- Loader
- Menu item
- Modal
- Overlay
- Popover
- Progress
- Radio
- Select
- Skeleton
- Switch
- Tabs
- Text Area
- Text Field
- Timeline
- Toast
- Tooltip
<hr>

### Utilidades

<hr>

- Accordion
- Actionable
- Backdrop
- Container
- Dismissible
- Form control
- Hidden
- Hidden visually
- Icon
- Image
- Text
- ridersUI (aka: Reshaped Provider)
- Theme provider
- View
<hr>

### Hooks

<hr>

- useElementId
- useHotkeys
- useResponsiveClientValue
- useRTL
- useScrollLock
- useTheme
- useToggle

<hr>

### Documentacion

- [Reshaped] (https://reshaped.so/content/docs/getting-started/overview)
- [Million js] (https://million.dev/)
- [NX dev] (https://nx.dev/)
- [Remix] (https://remix.run/)
