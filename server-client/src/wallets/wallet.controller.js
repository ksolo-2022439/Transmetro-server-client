"use strict";

import Wallet from './wallet.model.js';

// Consultar saldo del usuario
export const getBalance = async (req, res) => {
    try {
        const { userId } = req.body; 
        
        const wallet = await Wallet.findOne({ userId, isActive: true });
        
        if (!wallet) {
            return res.status(404).json({ 
                success: false, 
                message: 'Billetera no encontrada o inactiva para este usuario' 
            });
        }

        res.status(200).json({ 
            success: true, 
            message: 'Saldo consultado exitosamente',
            data: {
                balance: wallet.saldo
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al consultar el saldo',
            error: error.message
        });
    }
};

export const deductFare = async (userId, amount) => {
    const wallet = await Wallet.findOne({ userId, isActive: true });
    
    if (!wallet) throw new Error('Billetera no encontrada o inactiva para este usuario');
    if (wallet.saldo < amount) throw new Error('Saldo insuficiente');

    wallet.saldo -= amount;
    await wallet.save();
    
    return wallet.saldo;
};