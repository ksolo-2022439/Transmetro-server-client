import jwt from 'jsonwebtoken';

// 1. Lógica para decodificar el JWT del auth-server y extraer el ID
export const validateJWT = (req, res, next) => {
    // Extraemos el token del header
    const token = req.header('token') || req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'No autenticado. No hay token en la petición' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // EXTRAER EL ID DEL USUARIO:
        // Soportamos el estándar Node ('uid', 'sub') y el estándar .NET ('nameidentifier')
        const userId = decoded.uid || decoded.sub || decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

        if (!userId) {
            return res.status(401).json({ success: false, message: 'Token no válido - Falta el identificador del usuario' });
        }

        // Extraer el rol (por si necesitas la función hasRoles en el server-client)
        const userRole = decoded.role || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || 'USER_ROLE';

        // INYECTAR EN LA REQUEST: 
        // Armamos el req.user con el ID extraído. Esto es vital para los controladores del server-client.
        req.user = {
            id: userId,
            role: userRole
        };

        next();
    } catch (error) {
        console.error("Error validando JWT en server-client:", error.message);
        return res.status(401).json({ success: false, message: 'Sesión inválida o expirada' });
    }
};

// Validación de roles
export const hasRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(500).json({ success: false, message: 'Se requiere validar el JWT antes de verificar el rol' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                success: false, 
                message: `Acceso denegado. Tu rol actual (${req.user.role}) no tiene permisos para esta acción.` 
            });
        }

        next();
    };
};