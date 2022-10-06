const { Router } = require('express');
const Marca = require('../models/Marca');
const {  validarMarca } = require('../helpers/validar-marca');

const router  = Router();

router.post('/', async function(req, res){
    try {

        const validar = validarMarca(req);
        
        if (validar.length > 0) {
            return res.status(400).send(validar);
        }

        let marca = new Marca();
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaCreacion = new Date();
        marca.fechaActualizacion = new Date();

        marca = await marca.save();
        res.send(marca);
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }
});

router.get('/', async function(req, res){
    try {
        
        let marcas = await Marca.find();
        res.send(marcas);

    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }
});

router.put('/:marcaId', async function(req, res){
    
    try {
        let marca = await Marca.findById(req.params.marcaId);
        
        if (!marca) {
            return res.status(400).send('La marca no existe');
        }

        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaActualizacion = new Date();

    
        marca = await marca.save(); // lo guarda en la base de datos
    
        res.send(marca);

        
    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }

});

module.exports = router