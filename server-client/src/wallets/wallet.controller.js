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

export const initializeWallet = async (req, res) => {
    try {
        const userId = req.body.UserId || req.body.userId;
        const { CourtesyTrips, Balance } = req.body;

        const newWallet = new Wallet({
            userId,
            saldo: Balance || 0,
            viajesCortesia: CourtesyTrips || 5,
            isActive: true
        });

        await newWallet.save();
        res.status(201).json({ success: true, message: 'Billetera inicializada exitosamente.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error interno S2S', error: error.message });
    }
};

export const rechargeWallet = async (req, res) => {
    try {
        const userId = req.body.UserId || req.body.userId;
        const amount = req.body.Amount || req.body.amount;

        const wallet = await Wallet.findOne({ userId, isActive: true });
        if (!wallet) return res.status(404).json({ success: false, message: 'Billetera inactiva o inexistente.' });

        wallet.saldo += amount;
        await wallet.save();

        res.status(200).json({ success: true, message: 'Recarga acreditada exitosamente.', balance: wallet.saldo });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error interno S2S', error: error.message });
    }
};