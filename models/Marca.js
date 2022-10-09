const {Schema, model} = require('mongoose');

const marcaSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    
    estado: {
        type: String,
        required: true
    },
    fechaCreacion: {
        type: Date,
        required: true
    },
    fechaActualizacion: {
        type: Date,
        required: true
    }

});

module.exports = model('Marca', marcaSchema);