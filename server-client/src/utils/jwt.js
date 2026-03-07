// import jwt from 'jsonwebtoken';

// export const generateJWT = (uid, username, role) => {
//     return new Promise((resolve, reject) => {
//         const payload = { uid, username, role };
        
//         // clave secreta que debe estar en .env
//         // Agregar SECRET_KEY=A_SUPER_SECRET_KEY_FOR_TRANSMETRO_CONECTA_12345 en .env
//         jwt.sign(
//             payload,
//             process.env.SECRET_KEY || 'A_SUPER_SECRET_KEY_FOR_TRANSMETRO_CONECTA_12345_Backup',
//             { expiresIn: '4h' }, // token expira en 4 horas
//             (err, token) => {
//                 if (err) {
//                     console.error('Error al generar el JWT:', err);
//                     reject('No se pudo generar el token');
//                 } else {
//                     resolve(token);
//                 }
//             }
//         );
//     });
// };