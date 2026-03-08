# Transmetro Conecta - Server Client

Microservicio que actúa como API y panel de clientes para Transmetro Conecta. Desarrollado con Node.js y Express, gestiona las operaciones orientadas al usuario final, como la consulta de balances de billetera, planificación y pago de viajes, además de asegurar las comunicaciones servidor a servidor (S2S) para las recargas de saldo.

## Configuración de Entorno (.env)

Crea un archivo `.env` en la raíz de la carpeta `server-client` con las siguientes variables requeridas para su ejecución aislada o contenedorizada:

```env
PORT=3002
MONGODB_URI=mongodb://localhost:27017/TransmetroUserDb
JWT_SECRET=A_SUPER_SECRET_KEY_FOR_TRANSMETRO_CONECTA_12345
INTERNAL_SECRET=SuperSecretS2S_Transmetro2026
```

## Ejecución del Proyecto

La forma recomendada de ejecutar el servicio es utilizando **Docker Compose** junto con todo el ecosistema de microservicios.

Desde la **raíz del proyecto** (donde se encuentra el archivo `docker-compose.yml`), ejecuta:

```bash
docker compose up -d --build
```

Esto iniciará el contenedor del servidor cliente y el servicio quedará disponible en:

```
http://localhost:3002
```

---

## Uso de la Colección de Postman

Las pruebas del API se realizan mediante una colección de Postman.
### Pasos

1. Importa la colección `Postman-Transmetro.json` a Postman
2. Ve a **Variables de la Colección**.
3. Verifica que la base de las rutas esté apuntando a:

```
http://localhost:3002/TRANSMETRO-CONECTA-CLIENTE/v1
```

4. Ejecuta el endpoint:

```
Autenticación e Identidad > Iniciar Sesión
```

5. Configura tu **JWT Token** y el **User ID** en las variables del entorno:

```
{{jwt_token}}
{{user_id}}
```

6. Las demás peticiones utilizarán automáticamente ese token y ese ID gracias a la configuración de variables y los Headers.

---

## Funcionalidades principales

* Verificación del estado de salud del servidor (Health Check).
* Administración y consulta de **Billeteras (Wallets)** de usuarios, incluyendo el balance y los viajes de cortesía.
* Protección robusta servidor-a-servidor (S2S) mediante un `INTERNAL_SECRET` para evitar recargas o inicializaciones directas no autorizadas.
* Sistema de **Viajes (Tours)** para planear trayectos según coordenadas geográficas y deducir saldo automáticamente.
* Verificación de identidad estricta utilizando **JWT**.