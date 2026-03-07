import mongoose from 'mongoose';

const tourSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: [true, 'El ID de usuario es obligatorio']
        },
        origen: {
            lat: { type: Number, required: [true, 'Latitud de origen obligatoria'] },
            lon: { type: Number, required: [true, 'Longitud de origen obligatoria'] }
        },
        destino: {
            lat: { type: Number, required: [true, 'Latitud de destino obligatoria'] },
            lon: { type: Number, required: [true, 'Longitud de destino obligatoria'] }
        },
        distanciaMetros: {
            type: Number,
            required: true
        },
        tiempoEstimadoMinutos: {
            type: Number,
            required: true
        },
        tarifaCobrada: {
            type: Number,
            required: true
        },
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

export default mongoose.model('Tour', tourSchema);