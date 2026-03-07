import { body } from 'express-validator';
import { checkValidators } from './check-validators';

export const getBalanceValidator =[
    body('userId', 'El ID de usuario es obligatorio').notEmpty().isString(),
    checkValidators
];

export const rechargeWalletValidator = [
    body('userId', 'El ID de usuario es obligatorio').notEmpty().isString(),
    body('monto')
        .exists().withMessage('El monto a recargar es obligatorio.')
        .isNumeric().withMessage('El monto debe ser un valor numérico.')
        .custom((value) => {
            // Prevenir inyecciones de montos nulos, cero o negativos
            if (value === null || value === undefined) {
                throw new Error('El monto no puede ser nulo.');
            }
            if (value <= 0) {
                throw new Error('El monto de recarga debe ser estrictamente mayor a Q0.00.');
            }
            return true;
        }),
    checkValidators
];