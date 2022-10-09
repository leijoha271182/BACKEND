const { Router } = require('express');
const Marca = require('../models/Marca');

const router  = Router();

router.post('/', async function(req, res){
    console.log(req.body)
    try {

        let newMarca = new Marca({
            nombre: req.body.nombre,
            estado: req.body.estado,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
        })

        await newMarca.save();
        res.send(newMarca);
        
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

router.get('/:marcaId', async function(req, res){
    try {
        const getMarca = await Marca.findOne({_id:req.params.marcaId})
        if(getMarca){
            res.status(200).json({code: 'marca encontrada', marca:getMarca})
        }
        else{
            res.status(401).json({code: 'marca no encontrada'})
        }

    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }
});

router.patch('/:marcaId', async function(req, res){
    
    try {
        let marca = await Marca.findById(req.params.marcaId);
        
        if (!marca) {
            return res.status(400).send('La marca no existe');
        }

        await Marca.findByIdAndUpdate(req.params.marcaId,{
            nombre: req.body.nombre,
            estado: req.body.estado,
            fechaActualizacion: new Date()
        })
    
        res.json({code: 'marca actualizada'})

        
    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }

});

router.delete('/:marcaId/delete', async(req, res)=>{
    let getmarca = await Marca.findOne({_id: req.params.marcaId})
    if(getmarca){
        await Marca.findByIdAndRemove(req.params.marcaId)
        res.status(200).json({code: 'marca eliminada'})
    }
})

module.exports = router