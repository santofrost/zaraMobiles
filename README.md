# Mobile Store 📱

Mobile Store es una plataforma de comercio electrónico minimalista, construida con React y Next.js, diseñada como prueba técnica para Inditex.

## 1. Instrucciones de Instalación y Ejecución

Para montar y hacer funcionar la aplicación en tu entorno local, sigue estos pasos:

1. **Clona el repositorio** (si aún no lo has hecho):
   ```bash
   git clone <url-del-repositorio>
   cd zaraMobiles
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Visualiza la app:** Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la página principal.

---

## 2. Arquitectura y Estructura del Proyecto

El proyecto sigue una arquitectura predecible y modular basada en **Feature Sliced Design** (organizado por funcionalidades) e integrada totalmente sobre el **App Router** de Next.js:

- `/src/app/`: Define el sistema principal de rutas de la aplicación (`/`, `/cart`, `/product/[id]`). Tiene la composición base del DOM e inyecta los `Providers` de la aplicación.
- `/src/features/`: Los módulos de negocio separados entre sí:
  - `cart/`: Contiene el estado global de la compra (`CartContext.tsx`), lógica de persistencia y componentes del UI asociados (`CartModal`, componentes fila).
  - `products/`: Interfaces y lógica de UI puramente para productos (`ProductList`, `SearchBar`, cuadros de especificaciones). Además gestiona el contacto asíncrono con el Endpoint (`useProducts`, `useProduct`).
  - `i18n/`: Implementación propia de multi-idioma. Incluye su diccionario tipado con `NestedKeyOf` (`translations.ts`) y su motor de inyección React (`LanguageContext.tsx`).
- `/src/components/`: Componentes que nada tienen que ver con las features (elementos de interfaz genéricos).
- `/src/utils/`: Funciones `helper` universales o transversales.

La UI de frontend está desconectada de los *Datos Duros* gracias al ecosistema de **hooks y context**, evitando el prop driling y facilitando expansiones.

---

## 3. Librerías Externas

Actualmente el ecosistema base descansa sobre estas principales herramientas extra:

* **[Tailwind CSS v4](https://tailwindcss.com/):** Librería de estilos para agilizar el maquetado *responsive*.
* **[TanStack React Query v5](https://tanstack.com/query/latest):** Gestor de toda la lógica de la API.
* **[Axios](https://axios-http.com/):** Cliente HTTP para consultas directas y legibles por promesas.

---

## 4. Listado de Tareas (Roadmap)

Gestión completa del desarrollo de nuestra aplicación:

- [x] Crear proyecto
- [ ] Configurar linter y formatter
- [x] Configuración de peticiones externas API
- [x] Configurar diseño global
- [x] Maquetar pantalla de listado
- [x] Maquetar pantalla de detalle
- [x] Maquetar pantalla de carrito
- [x] Almacenar carrito en React Context
- [x] Almacenar carrito en almacenamiento local
- [ ] Creación de modos
- [ ] Servir assets dependiendo del modo
- [x] Trabajar con datos de API
- [x] Testing
- [ ] Accesibilidad
