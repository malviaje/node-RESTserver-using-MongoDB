const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');

//listar-read
app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);



    Usuario.find({ estado: true }, 'nombre email role estado google img') //realizar exclusiones 
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo

                });

            });

        });

})

//crear
app.post('/usuario', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        //para no mostrar pass en json
        //usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

//actualizar
app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    //no es recomendable con bd muy grandes
    //delete body.password;
    //delete body.google;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });


})

//borrar-delete
app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;

    //borrar cambiar estado
    //Usuario.findByIdAndDelete(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {

            res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });

        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })

    })

})

module.exports = app;