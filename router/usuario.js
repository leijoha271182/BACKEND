const e = require('express');
const { Router } = require('express');
const Usuario = require('../models/Usuario');
const { validarCreacionUsuario, validarUsuario } = require('../helpers/validacion-usuario');

const router = Router();

router.post('/create', async function (req, res) {

    try {
        const validar = validarUsuario(req);
        if (validar.length > 0) {
            return res.status(400).json({
                codigo: "letra mínima 0",
                resp: validar
            });
        }
        const existeUsuario = await Usuario.findOne({ email: req.body.email })

        if (existeUsuario) {
            return res.status(400).json({
                codigo: "Email existente",
                resp: "El email del usuario ya existe, por favor registre nuevo email"
            });
        }

        let newUsuario = new Usuario({
            nombre: req.body.nombre,
            email: req.body.email,
            estado: req.body.estado,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date(),
        })

        await newUsuario.save() //Guardando usuario en Base de Datos

        res.status(200).json({
            codigo: "Usuario guardado",
            resp: "El usuario ha sido creado satisfactoriamente",
            usuario: newUsuario
        }); // para mostrarlo como respuesta 

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un Error');
    }


});


router.get('/userlist', async function (req, res) {
    // console.log('get users')
    const usuarios = await Usuario.find()
        .then(users => {
            if(users){
                res.status(200).json({code:'find user', usuarios:users})
            }else{
                res.status(401).json({code:'no find user'});
            }
        })
        .catch(err => {
            console.log(err)
        })
});

router.get('/:usuarioId', async function (req, res) {
    try {

        const usuario = await Usuario.findById(req.params.usuarioId);
        if(usuario){
            return res.status(200).json({
                code: 'Usuario encontrado',
                usuario: usuario
            })
        }
        // res.send(usuarios);

    } catch (error) {
        console.log(error)
        res.status(500).json({code:'Ocurrio un error'});
    }
});



router.patch('/:usuarioId/put', async function (req, res) {
    try {

        let usuario = await Usuario.findById(req.params.usuarioId); // se obtiene el usuario por medio del id

        if (!usuario) {
            return res.status(401).send('El Ususario no existe');
        }else{
            //console.log(req.body)
            await Usuario.findByIdAndUpdate(req.params.usuarioId, {
                nombre: req.body.nombre,
                email: req.body.email,
                estado: req.body.estado,
                fechaActualizacion: new Date()
            })
                .then(
                    res.status(200).json({code: 'usuario actualizado'})
                )
                .catch(err => console.log(err))
        }

        //usuario = await usuario.save(); // lo guarda en la base de datos

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un Error');
    }
});

router.delete('/:usuarioId/delete', async function (req, res) {
    try {
        let usuario = await Usuario.findById(req.params.usuarioId)
        if (usuario) {
            await Usuario.findByIdAndDelete(req.params.usuarioId)
            return res.status(200).json({
                codigo: "Usuario eliminado",
                resp: "El usuario fue eliminado satisfactoriamente"
            })

        }
        else {
            return res.status(200).json({
                codigo: "Usuario no existe",
                resp: "El usuario que intenta eliminar no está registrado"
            })
        }
    }
    catch (error) {
        console.log(error)
    }
})

module.exports = router