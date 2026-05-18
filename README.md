# Golem Escalada — Sistema de Gestión de Pagos

Golem Escalada es una aplicación web diseñada para facilitar la administración de pagos, clientes y registros internos dentro de un centro de escalada.
El objetivo principal del proyecto es agilizar tareas administrativas, mejorar la organización financiera y ofrecer una interfaz moderna, clara y totalmente responsive.

Este proyecto forma parte de un proceso de mejora continua para digitalizar operaciones internas y optimizar el manejo de información.

## Tecnologías Utilizadas
### Frontend

Next.js 14 (App Router)

React 18

TypeScript

Ant Design

TailwindCSS

### Backend

API Routes de Next.js

Node.js

PostgreSQL (PL)

### Características Principales

✔️ Registro de pagos mediante formulario validado

✔️ Listado de pagos con tabla responsiva

✔️ Paginación integrada

✔️ Formato automático para fechas y montos

✔️ Notificaciones visuales personalizadas

✔️ CRUD completo (Create, Read, Update, Delete)

✔️ Compatible con pantallas mobile y desktop

✔️ Logo diseñado especialmente para esta aplicación

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Node.js** 18+
- **PostgreSQL** 12+
- **pgAdmin4** (opcional, para gestión visual de BD)

### 1. Clonar e instalar dependencias

```bash
git clone <url-del-repo>
cd golem-escalada
npm install
```

### 2. Configurar PostgreSQL

#### Opción A: Usando pgAdmin4 (Recomendado)

1. Abre pgAdmin4
2. Conecta a tu servidor PostgreSQL local
3. Crea una nueva base de datos llamada `golem_escalada`
4. Abre el Query Tool y ejecuta el archivo [create_tables.sql](create_tables.sql)

#### Opción B: Usando línea de comandos

```bash
# Crear base de datos
createdb golem_escalada

# Ejecutar script SQL
psql -d golem_escalada -f create_tables.sql
```

### 3. Configurar variables de entorno

1. Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env.local
   ```

2. Edita `.env.local` con tus credenciales de PostgreSQL:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASS=tu_password_postgres
   DB_NAME=golem_escalada
   ```

### 4. Ejecutar la aplicación

```bash
npm run dev
```

La aplicación estará disponible en: http://localhost:3000

## 📦 Despliegue a Producción

### Preparación de Base de Datos

Para producción, recomendamos usar **Supabase** o **Neon** para PostgreSQL en la nube:

1. **Crear cuenta en Supabase**: https://supabase.com
2. **Crear nuevo proyecto**
3. **Ejecutar el script SQL** en el SQL Editor de Supabase
4. **Configurar variables de entorno** en tu plataforma de hosting:

```env
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASS=tu_password_supabase
DB_NAME=postgres

NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```

### Opciones de Despliegue

- **Vercel**: `npm run build && vercel --prod`
- **Netlify**: `npm run build && netlify deploy --prod`
- **Railway**: Conectar repositorio Git
- **Docker**: Usar el Dockerfile incluido

### Variables de Producción

Asegúrate de configurar estas variables en tu plataforma de hosting:

- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── api/           # API Routes
│   ├── components/    # Componentes React
│   ├── context/       # Context providers
│   ├── hooks/         # Custom hooks
│   └── lib/           # Utilidades y configuración
├── types/             # Definiciones TypeScript
└── utils/             # Funciones auxiliares
```

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Ejecutar tests con coverage
npm run test:coverage
```

## 📋 Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run start` - Inicia servidor de producción
- `npm run lint` - Ejecuta linter
- `npm test` - Ejecuta tests

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

Mantener registros precisos

Hacer más eficiente la gestión de pagos

Reducir errores manuales

Unificar la información financiera en una sola plataforma

### Roadmap

  ❎ Implementar búsqueda y filtrado avanzado
  ❎ Exportación a PDF/Excel
  ❎ Autenticación de usuarios (Muro libre - Clases técnicas - Escuelita)
  ❎ Gestión de clientes y membresías
  ❎ Implementar el pago a través de la plataforma

##  Desarrollado por
### Agustín Del Valle
Desarrollador Frontend / Fullstack

## Licencia

Este proyecto es de uso interno y no está autorizado para distribución sin consentimiento del autor.
