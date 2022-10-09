const { Router } = require('express');
const TipoEquipo = require('../models/TipoEquipo');
const {  validarTipoEquipo } = require('../helpers/validar-tipoEquipo');

const router  = Router();

router.post('/', async function(req, res){
    
    try {

        let newTipoEquipo = TipoEquipo({
            nombre: req.body.nombre,
            estado: req.body.estado,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
        })

        newTipoEquipo.save()
        res.status(200).json({
            code: 'tipo equipo creado',
            tipoEquipo: newTipoEquipo
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }

});

router.get('/:tipoEquipoId', async function(req, res){
    
    try {
        
        let tipoEquipos = await TipoEquipo.findOne({_id:req.params.tipoEquipoId});
        if(tipoEquipos){
            res.status(200).json({code: 'tipo de equipo', tipoEquipo:tipoEquipos})
        }
        

    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }

});

router.get('/', async function(req, res){
    
    try {
        
        let tipoEquipos = await TipoEquipo.find();
        res.send(tipoEquipos);

    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }

});

router.patch('/:tipoEquipoId', async function(req, res){
   
    try {

        let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId)
        if(!tipoEquipo){
            return res.status(401).json({code:'Tipo de Equipo no existe'});
        }else{
            await TipoEquipo.findByIdAndUpdate(req.params.tipoEquipoId, {
                nombre: req.body.nombre,
                estado: req.body.estado,
                fechaActualizacion: new Date()
            })

            res.status(200).json({code: 'tipo de equipo actualizado'})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }

});

router.delete('/:tipoEquipoId/delete', async(req, res) => {
    let tipoEquipo = await TipoEquipo.findOne({_id: req.params.tipoEquipoId})
    if(tipoEquipo){
        await TipoEquipo.findByIdAndRemove(req.params.tipoEquipoId)
        res.status(200).json({code: 'Tipo equipo eliminado'})
    }
})

module.exports = router