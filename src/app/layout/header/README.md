# 🎯 Header Component

Header estilo Spotify con navegación, búsqueda y menú de usuario.

## 🎨 Características

### ✅ Navegación
- **Botones Back/Forward**: Navegación del historial del navegador
- **Estados disabled**: Se deshabilitan cuando no hay historial
- **Animaciones**: Hover y active states

### 🔍 Búsqueda
- **Barra de búsqueda**: Input con icono de lupa
- **Condicional**: Solo se muestra en rutas específicas (`/home`, `/search`, `/playlists`)
- **Clear button**: Botón X para limpiar la búsqueda
- **Placeholder**: "What do you want to play?"

### 👤 Usuario
- **Avatar**: Muestra la imagen del usuario desde el store
- **Nombre**: Display name (solo visible en pantallas grandes)
- **Menú dropdown**: Account, Profile, Upgrade, Logout
- **Estados**: Hover, active, open/close con animación

### 🔔 Extras
- **Install App**: Botón para instalar la PWA (oculto en móvil)
- **Notifications**: Icono de notificaciones
- **Responsive**: Adaptado a diferentes tamaños de pantalla

## 📋 Estructura

```
header/
├── header.ts           # Lógica del componente
├── header.html         # Template
├── header.spec.ts      # Tests
└── README.md          # Documentación
```

## 🎯 Signals Utilizados

```typescript
searchQuery = signal('')           // Query de búsqueda
showSearch = signal(false)         // Mostrar/ocultar búsqueda
isUserMenuOpen = signal(false)     // Estado del menú de usuario
canGoBack = signal(false)          // Puede navegar atrás
canGoForward = signal(false)       // Puede navegar adelante
```

## 🔧 Métodos Principales

### Navegación
```typescript
goBack()              // Navegar atrás
goForward()           // Navegar adelante
updateNavigationState() // Actualizar estados de navegación
```

### Búsqueda
```typescript
onSearchChange()      // Handler del input de búsqueda
clearSearch()         // Limpiar búsqueda
updateSearchVisibility() // Mostrar/ocultar según ruta
```

### Usuario
```typescript
toggleUserMenu()      // Abrir/cerrar menú
logout()             // Cerrar sesión
```

## 🎨 Estilos Destacados

### Botones de Navegación
```html
<button class="
  w-8 h-8
  rounded-[var(--radius-full)]
  bg-[var(--color-background)]
  hover:scale-105
  active:scale-95
  disabled:opacity-[var(--opacity-disabled)]
">
```

### Barra de Búsqueda
```html
<input class="
  bg-[var(--color-background-elevated)]
  rounded-[var(--radius-full)]
  focus:ring-2
  focus:ring-white
">
```

### Menú Dropdown
```html
<div class="
  bg-[var(--color-background-elevated)]
  rounded-[var(--radius-md)]
  shadow-[var(--shadow-overlay)]
  animate-in fade-in slide-in-from-top-2
">
```

## 📱 Responsive

- **Mobile**: Solo iconos, sin textos
- **Tablet (md)**: Muestra "Install App"
- **Desktop (lg)**: Muestra nombre de usuario

## 🔄 Integración con UserStore

El header consume el `UserStore` para mostrar información del usuario:

```typescript
userStore = inject(UserStore)

// En el template
@if (userStore.user(); as user) {
  <img [src]="user.images[0]?.url" />
  <span>{{ user.display_name }}</span>
}
```

## 🎯 Rutas con Búsqueda

La búsqueda se muestra solo en estas rutas:
- `/home`
- `/search`
- `/playlists`

Para agregar más rutas:
```typescript
const searchRoutes = ['/search', '/home', '/playlists', '/albums']
```

## 🚀 Mejoras Futuras

- [ ] Implementar búsqueda en tiempo real
- [ ] Agregar debounce al input
- [ ] Historial de búsquedas
- [ ] Notificaciones reales
- [ ] Keyboard shortcuts (Ctrl+K para búsqueda)
- [ ] Click outside para cerrar menú
- [ ] Animaciones más suaves
