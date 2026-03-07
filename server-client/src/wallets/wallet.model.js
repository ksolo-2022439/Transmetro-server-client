import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: [true, 'El ID de usuario es obligatorio'],
            unique: true
        },
        saldo: {
            type: Number,
            default: 0.00,
            min: [0.00, 'El saldo no puede ser negativo']
        },
        historialRecargas: [{
            monto: Number,
            fecha: { type: Date, default: Date.now }
        }],
        status: {
            type: Boolean,
            default: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        isActive: {
            type: Boolean,
            default: true
        },
    }, 
    {
    timestamps: true, 
    versionKey: false 
    }
);

export default mongoose.model('Wallet', walletSchema);