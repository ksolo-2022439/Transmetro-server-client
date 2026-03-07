import { body } from 'express-validator';
import { checkValidators } from './check-validators';

export const getBalanceValidator =[
    body('userId', 'El ID de usuario es obligatorio').notEmpty().isString(),
    checkValidators
];