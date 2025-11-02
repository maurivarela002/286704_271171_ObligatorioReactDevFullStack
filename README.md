# CLODE - Sistema de Gestión Odontológico

Aplicación web desarrollada con React para la gestión de consultorios odontológicos.

## 🚀 Características

- Autenticación de usuarios (login/registro)
- Interfaz responsiva con Material-UI
- Internacionalización (español/inglés)
- Tema personalizado con paleta de colores
- Navegación protegida

## 🛠️ Tecnologías Utilizadas

- **Frontend:**
  - React 18
  - React Router v6
  - Material-UI (MUI) v5
  - i18next para internacionalización
  - Redux Toolkit para gestión de estado
  - Chart.js para gráficos

## 📁 Estructura del Proyecto

```
src/
├── assets/               # Recursos estáticos (imágenes, fuentes, etc.)
│   └── img/             # Imágenes del proyecto
│       └── clode-icon.jpg
├── components/          # Componentes reutilizables
│   └── LanguageSwitcher/
├── i18n/                # Configuración de internacionalización
│   ├── config.js
│   └── locales/         # Archivos de traducción
│       ├── auth/        # Traducciones de autenticación
│       ├── dashboard/   # Traducciones del dashboard
│       └── shared/      # Traducciones compartidas
├── pages/               # Componentes de página
│   ├── Auth/            # Páginas de autenticación
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   └── Menu.jsx         # Dashboard principal
├── store/               # Configuración de Redux
│   └── store.js
├── theme/               # Configuración del tema
│   ├── colors.js
│   ├── styles.js
│   └── theme.js
├── App.jsx              # Componente raíz
└── main.jsx             # Punto de entrada de la aplicación
```

## 🚀 Cómo Empezar

### Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd 286704_271171_ObligatorioReactDevFullStack
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. Abre tu navegador en:
   ```
   http://localhost:5173
   ```

## 🔐 Credenciales de Acceso para prueba

- **Usuario:** a
- **Contraseña:** a

## 🌐 Internacionalización

La aplicación está configurada para soportar múltiples idiomas. Actualmente disponible en:

- Español (predeterminado)
- English

## 🎨 Personalización del Tema

Los estilos de la aplicación pueden ser personalizados modificando los archivos en `src/theme/`.

## 📝 Notas Adicionales

- La aplicación utiliza React 18 con el nuevo modo concurrente.
- El estado de autenticación se maneja con localStorage.
- El diseño es completamente responsivo gracias a Material-UI.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
