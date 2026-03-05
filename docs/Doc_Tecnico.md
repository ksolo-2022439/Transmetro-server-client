### Secuencia de Desarrollo: `server-user`

1. **Tarea 2: Inicialización del `server-user`**   (Santiago) - Configuración base con Express, Helmet, CORS y conexión a MongoDB (Base de datos `TransmetroUserDb`).
2. **Tarea 13: Interceptores y Manejo de Errores Globales** (Gabriel) - Configuración del middleware centralizado de captura de excepciones (`handle-errors.js`).
3. **Tarea 6: Middlewares de Validación de Entrada** (Gabriel) - Implementación de la base de `express-validator` para sanear los datos entrantes.
4. **Tarea 5: Middlewares de Autenticación y Autorización** (Oliver) - Lógica para decodificar el JWT del `auth-server` y extraer el ID del usuario (`auth-validator.js`).
5. **Tarea 10: Algoritmo de Planificación de Viajes** (Santiago) - Desarrollo de la lógica principal en el módulo `viajes` para calcular rutas y estimar tiempos.
6. **Tarea 12: Validaciones Lógicas de Rutas** (Oliver) - Middlewares específicos para verificar que las coordenadas de origen y destino solicitadas sean válidas.
7. **Tarea 16: Gestión de Saldo y Descuentos** (Santiago) - Lógica en el módulo `billetera` para consultar el saldo y descontar la tarifa de viaje.
8. **Tarea 19: Validaciones de Transacciones Financieras** (Oliver) - Middlewares estrictos para evitar inyecciones de montos negativos o nulos.
9. **Tarea 17: Sistema de Alertas Preventivas** (Santiago) - Lógica integrada en la planificación de viajes que alerte al usuario si su saldo es menor a Q1.00.
10. **Tarea 20: Middlewares de Paginación y Filtros** (Gabriel) - Implementación de paginación para el historial de viajes y recargas.
11. **Tareas 7, 14 y 21: Documentación y Pruebas** (Gabriel y Oliver) - Colecciones de Postman, diagramas del algoritmo de rutas y pruebas funcionales de los endpoints del usuario.

### Documento Técnico: Inicialización `server-user`

### 1. Dependencias Requeridas

Ejecutar el siguiente comando en la terminal dentro de la carpeta del `server-user` para instalar los paquetes fundamentales:

```bash
npm install express mongoose dotenv cors helmet jsonwebtoken express-validator

npm install --save-dev nodemon morgan
```

#### 2. Variables de Entorno (`.env`)

Crear el archivo `.env` en la raíz del proyecto para definir los puertos y conexiones.

```env
PORT=3002
MONGODB_URI=mongodb://localhost:27017/TransmetroUserDb
JWT_SECRET=A_SUPER_SECRET_KEY_FOR_TRANSMETRO_CONECTA_12345
```

#### 3. Estructura de Carpetas Modular

Implementar el siguiente árbol de directorios en la raíz de `server-user` respetando la separación de responsabilidades solicitada:

```text
server-user/
├── configs/
│   ├── app.js                   # Configuración de Express, middlewares globales y enrutamiento
│   ├── cors-configuration.js    # Opciones y dominios permitidos para CORS
│   ├── db.js                    # Lógica de conexión a MongoDB mediante Mongoose
│   └── helmet-configuration.js  # Directivas de seguridad HTTP
├── middlewares/
│   ├── auth-validator.js        # Verificación del JWT emitido por .NET y extracción del ID de usuario
│   ├── data-validators.js       # Validaciones de entrada (coordenadas, montos financieros)
│   ├── check-validators.js      # Interceptor de errores de express-validator
│   ├── handle-errors.js         # Manejador global de excepciones de la API
│   └── request-limit.js         # Limitador de peticiones (Rate Limit)
├── src/
│   ├── viajes/                  # Módulo de planificación y cálculo de rutas
│   │   ├── viajes.controller.js
│   │   ├── viajes.model.js      # Historial de viajes del usuario
│   │   └── viajes.routes.js
│   ├── billetera/               # Módulo de gestión de saldo y transacciones
│   │   ├── billetera.controller.js
│   │   ├── billetera.model.js   # Saldo actual y registros de recargas
│   │   └── billetera.routes.js
│   ├── perfiles/                # Módulo interno para inicialización de cuentas
│   │   ├── perfiles.controller.js
│   │   ├── perfiles.model.js    # Perfil local referenciado al auth-server
│   │   └── perfiles.routes.js
│   └── utils/                   # Funciones utilitarias (ej. algoritmos geoespaciales)
├── .env                         # Variables de entorno
├── .gitignore                   # Exclusiones para el control de versiones
├── index.js                     # Punto de entrada y arranque del servidor
└── package.json                 # Gestión de dependencias y scripts de ejecución

```

#### 4. Directrices de Implementación

* **Gestión de Perfiles:** El módulo `perfiles` recibirá una petición interna (Service-to-Service) del `auth-server` para crear el documento de la billetera con saldo Q0.00 cuando un usuario se registre exitosamente.
* **Algoritmo de Viajes:** El módulo `viajes` requerirá funciones específicas en la carpeta `utils/` para calcular las distancias entre coordenadas (origen-destino) y cruzar los datos con la red de estaciones.
* **Validaciones Financieras:** Los middlewares en `billetera` deben ser extremadamente estrictos, rechazando montos negativos o nulos antes de procesar cualquier simulación de descuento o recarga.
* **Paginación:** Las consultas de historial en `viajes` y `billetera` deben incorporar paginación desde el inicio para optimizar los tiempos de respuesta.