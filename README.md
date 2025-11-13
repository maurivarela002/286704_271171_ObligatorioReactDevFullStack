# CLODE - Sistema de Gestión Odontológico

Aplicación web desarrollada con React para la gestión de consultorios odontológicos.

## 🚀 Características Principales

- **Autenticación**
  - Inicio de sesión seguro
  - Registro de nuevos usuarios
  - Navegación protegida

- **Gestión de Citas**
  - Agendamiento de citas
  - Visualización de disponibilidad
  - Gestión de reservas

- **Estadísticas**
  - Visualización de datos
  - Reportes de actividad
  - Métricas de consultorio

- **Almacenamiento**
  - Gestión de inventario
  - Control de stock
  - Seguimiento de productos

- **Interfaz de Usuario**
  - Diseño responsivo con Material-UI
  - Tema personalizado
  - Soporte para múltiples idiomas
  - Notificaciones en tiempo real

## 🛠️ Stack Tecnológico

- **Frontend**
  - React 18 con Hooks
  - React Router v6 para navegación
  - Material-UI (MUI) v5 para componentes UI
  - Redux Toolkit para gestión de estado global
  - React Hook Form para formularios
  - Yup para validaciones
  - Axios para peticiones HTTP
  - i18next para internacionalización
  - Chart.js para visualización de datos
  - React-Toastify para notificaciones
  - Date-fns para manejo de fechas

- **Herramientas de Desarrollo**
  - Vite como empaquetador
  - ESLint para linting
  - Prettier para formateo de código
  - Git para control de versiones

## 🎯 Uso de Notificaciones

### Mostrar notificaciones

```javascript
import { useToast } from '../utils/toast';

function MiComponente() {
  const { showSuccessToast, showErrorToast } = useToast();

  // Ejemplo de éxito
  const handleSuccess = () => {
    showSuccessToast('success.operation.title', 'success.operation.text');
  };

  // Ejemplo de error
  const handleError = () => {
    showErrorToast('errorsHttp.unauthorized.title', 'errorsHttp.unauthorized.text');
  };
}
```

### Personalización

Las notificaciones incluyen:
- Posición: abajo a la izquierda
- Duración: 2 segundos
- Estilos: Integrados con el tema de Material-UI
- Soporte para múltiples idiomas

## 🔄 Manejo de Errores HTTP

El sistema incluye un manejador global de errores HTTP que muestra notificaciones automáticamente para:
- Errores 401 (No autorizado)
- Errores 403 (Prohibido)
- Errores 404 (No encontrado)
- Errores 422 (Entidad no procesable)
- Errores 500 (Error del servidor)

## 🌐 API Manager (apiManage.js)

El módulo `apiManage.js` es un cliente HTTP configurado para realizar peticiones a la API del backend. Incluye manejo automático de autenticación y errores.

### Características

- Configuración automática de headers (Content-Type, Authorization)
- Manejo centralizado de respuestas y errores
- Métodos HTTP preconfigurados (GET, POST, PUT, DELETE)
- Integración con el sistema de autenticación mediante token JWT

### Uso Básico

```javascript
import { api } from './api/auth/apiManage';

// Ejemplo de petición GET
const fetchData = async () => {
  try {
    const response = await api.get('/ruta/recurso');
    console.log(response.data);
  } catch (error) {
    // Los errores ya son manejados automáticamente
    console.error('Error al obtener los datos:', error);
  }
};

// Ejemplo de petición POST
const createData = async (data) => {
  try {
    const response = await api.post('/ruta/recurso', data);
    console.log('Recurso creado:', response);
  } catch (error) {
    console.error('Error al crear el recurso:', error);
  }
};
```

### Manejo de Autenticación

El token de autenticación se obtiene automáticamente del `localStorage` con la clave 'token'. Después de un inicio de sesión exitoso, el token debe guardarse así:

```javascript
localStorage.setItem('token', 'tu-token-jwt');
```

### Manejo de Errores

Los errores son manejados automáticamente por el `HttpErrorHandler`. Los códigos de error comunes incluyen:

- `401`: No autorizado (token inválido o expirado)
- `403`: Prohibido (permisos insuficientes)
- `404`: Recurso no encontrado
- `422`: Error de validación
- `500+`: Errores del servidor

## 📁 Estructura del Proyecto

```
src/
├── api/                  # Configuración y servicios de API
│   ├── apiManage.js      # Cliente HTTP configurado
│   ├── auth/            # Servicios de autenticación
│   └── endpoints/       # Definición de endpoints

├── assets/              # Recursos estáticos (imágenes, fuentes, etc.)
│   └── img/             # Imágenes del proyecto

├── components/          # Componentes reutilizables
│   ├── common/          # Componentes comunes
│   └── ui/              # Componentes de interfaz

├── features/            # Características del negocio
│   └── (en desarrollo)  # Próximas características

├── hooks/               # Custom hooks reutilizables

├── i18n/                # Configuración de internacionalización
│   ├── config.js        # Configuración de i18n
│   └── locales/         # Archivos de traducción
│       ├── auth/        # Traducciones de autenticación
│       ├── dashboard/   # Traducciones del dashboard
│       ├── shared/      # Traducciones compartidas
│       ├── es.json      # Español
│       └── en.json      # Inglés

├── layouts/             # Layouts de la aplicación
│   └── MainLayout/      # Layout principal

├── pages/               # Componentes de página
│   ├── Auth/            # Páginas de autenticación
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── Dashboard/       # Páginas del dashboard
│   ├── Reserve/         # Gestión de reservas
│   ├── Statistics/      # Estadísticas
│   └── StorageUser/     # Gestión de almacén

├── store/               # Configuración de Redux
│   ├── slices/          # Slices de Redux
│   └── store.js         # Configuración del store

├── theme/               # Configuración del tema
│   ├── colors.js        # Paleta de colores
│   ├── shadows.js       # Sombras personalizadas
│   └── theme.js         # Configuración del tema MUI

├── utils/               # Utilidades
│   └── toast.js         # Configuración de notificaciones

├── validations/         # Esquemas de validación
│   ├── auth.js          # Validaciones de autenticación
│   └── common.js        # Validaciones comunes

├── App.jsx              # Componente raíz de la aplicación
└── main.jsx             # Punto de entrada de la aplicación
```
```

## 🚀 Guía de Inicio Rápido

### Requisitos Previos

- Node.js (v16 o superior)
- npm (v8 o superior) o yarn (v1.22 o superior)
- Git

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/286704_271171_ObligatorioReactDevFullStack.git
   cd 286704_271171_ObligatorioReactDevFullStack
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn
   ```

3. **Configuración del entorno**
   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```env
   VITE_API_URL=http://tu-api-url.com
   VITE_ENV=development
   ```

4. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. **Abrir en el navegador**
   La aplicación estará disponible en:
   ```
   http://localhost:5173
   ```

## � Comandos Útiles

- **Desarrollo**
  ```bash
  npm run dev     # Inicia el servidor de desarrollo
  ```

- **Construcción**
  ```bash
  npm run build   # Construye la versión de producción
  npm run preview # Previsualiza la versión de producción localmente
  ```

- **Linting y Formateo**
  ```bash
  npm run lint    # Ejecuta ESLint
  npm run format  # Formatea el código con Prettier
  ```

## 🔐 Credenciales de Prueba

- **Usuario de prueba:**
  - **Usuario:** a
  - **Contraseña:** a

## 🌐 Internacionalización

La aplicación soporta múltiples idiomas con i18next. Actualmente disponible en:

- Español (es) - Predeterminado
- Inglés (en)

### Uso en la Aplicación

La aplicación detecta automáticamente el idioma del navegador y se ajusta en consecuencia. Los usuarios también pueden cambiar manualmente el idioma desde el menú de configuración.

### Agregar un Nuevo Idioma

1. Crea un nuevo archivo en `src/i18n/locales/` siguiendo la estructura de los archivos existentes
2. Actualiza el archivo de configuración `src/i18n/config.js`
3. Añade las traducciones necesarias siguiendo la estructura de namespaces

## 🤝 Contribución

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## ✨ Reconocimientos

- [React](https://reactjs.org/)
- [Material-UI](https://mui.com/)
- [Vite](https://vitejs.dev/)
- A todos los contribuyentes que ayudan a mejorar este proyecto

## 🎨 Personalización del Tema

Los estilos de la aplicación pueden ser personalizados modificando los archivos en `src/theme/`.

## 📝 Notas Adicionales

- La aplicación utiliza React 18 con el nuevo modo concurrente.
- El estado de autenticación se maneja con localStorage.
- El diseño es completamente responsivo gracias a Material-UI.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
