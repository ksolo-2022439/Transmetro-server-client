"use strict";

import Tour from './tour.model.js';
import Wallet from '../wallets/wallet.model.js';
import { calculateDistance, estimateTravelTime } from '../utils/geo-utils.js';

const STANDARD_FARE = 1.00; 

export const planTour = async (req, res) => {
    try {
        const { userId, originLat, originLon, destLat, destLon } = req.body;

        // 1. Validar la Wallet
        const wallet = await Wallet.findOne({ userId, isActive: true });
        if (!wallet) {
            return res.status(404).json({
                success: false,
                message: 'Billetera no encontrada o inactiva para este usuario'
            });
        }

        // 2. Validar saldo suficiente
        if (wallet.saldo < STANDARD_FARE) {
            return res.status(402).json({
                success: false,
                message: 'Saldo insuficiente para planear este tour.',
                data: { currentBalance: wallet.saldo }
            });
        }

        // 3. Alerta preventiva de saldo
        let warning = null;
        if (wallet.saldo === STANDARD_FARE) {
            warning = 'Advertencia: Su saldo será Q0.00 después de este tour. Por favor recargue pronto.';
        }

        // 4. Algoritmo de planificación
        const distanceMeters = calculateDistance(originLat, originLon, destLat, destLon);
        const estimatedTime = estimateTravelTime(distanceMeters);

        // 5. Cobro en la Wallet
        wallet.saldo -= STANDARD_FARE;
        await wallet.save();

        // 6. Registro del Tour
        const newTour = new Tour({
            userId,
            origen: { lat: originLat, lon: originLon },
            destino: { lat: destLat, lon: destLon },
            distanciaMetros: distanceMeters,
            tiempoEstimadoMinutos: estimatedTime,
            tarifaCobrada: STANDARD_FARE,
            status: true,
            isActive: true
        });

        await newTour.save();

        // 7. Respuesta estructurada
        res.status(200).json({
            success: true,
            message: 'Viaje planeado exitosamente',
            data: {
                tourId: newTour._id,
                estimatedDistance: `${(distanceMeters / 1000).toFixed(2)} km`,
                estimatedTime: `${estimatedTime} minutes`,
                chargedFare: `Q${STANDARD_FARE.toFixed(2)}`,
                remainingBalance: `Q${wallet.saldo.toFixed(2)}`
            },
            warning 
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al planear el viaje',
            error: error.message
        });
    }
};