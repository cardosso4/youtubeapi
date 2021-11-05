'use strict';

const express = require('express');
const router = express.Router();

const Model     = require("../../db/models/usuario");
const Login     = require("../../db/models/login");
const Historico = require("../../db/models/historico");
const Funcoes   = require('../../utils/dbfunctions');
const load      = new Funcoes();

router.get("/usurio/:email", async (req, res) => {
    var dados = req.params;
    // const objct = await Model.findByPk(dados.id);
    const objct = await Login.findOne({
        where:{
            'email':dados.email
        }
    });

    if(objct){
        return {
            status: 200,
            mensagem: 'Registro encontrado com sucesso.',
            dados:objct,
        }  
    }

    return {
        status: 400,
        mensagem: 'Erro ao realizar a requisição.',
    }
});

router.get("/serachupdate/:id", async (req, res) => {
    var dados = req.params;
    // const objct = await Model.findByPk(dados.id);
    const objct = await Model.findByPk(dados.id);

    if(objct){
        return res.json({
            status: 200,
            mensagem: 'Registro encontrado com sucesso.',
            dados:objct,
        });
    }

    return res.json({
        status: 400,
        mensagem: 'Erro ao realizar a requisição.',
    });
});

router.get("/historico/:usuario", async (req, res) => {
    var dados = req.params;

    const usuario = await Model.findByPk(dados.usuario);
    const objct = await Historico.findAll({
        where:{
            usuario_id:dados.usuario
        }
    });

    if(objct){
        return res.json({
            status: 200,
            mensagem: 'Registro encontrado com sucesso.',
            dados:{
                usuario:usuario,
                history:objct
            },
        }); 
    }

    return res.json({
        status: 400,
        mensagem: 'Erro ao realizar a requisição.',
    });
});


router.get("/all/", async (req, res) => {
    var dados = req.params;
    // const objct = await Model.findByPk(dados.id);
    const objct = await Model.findAll();
    if(objct){
        return res.json({
            status: 200,
            mensagem: 'Registro encontrado com sucesso.',
            dados:objct,
        });  
    }

    return res.json({
        status: 400 ,
        mensagem: 'Erro ao realizar a requisição.',
    });
});


router.post("/", async (req, res) => {
    var dados = req.body;
    var dadosLogin = dados.Logins;
    var dadosUser  = dados.Usuarios;

    /**
     *  Valida se o e-mail cadastrado já existe
     */
    var objctLogin = await Login.findOne({
        where:{
            'email':dadosLogin.email
        }
    });

    if(!objctLogin){
        var objctLogin = await load.loadCreate(dadosLogin,Login);
    }    
    
    if(objctLogin){
        dadosUser.user_id = objctLogin.id;

        /**
         * Valida se o e-mail cadastra já tem vinculo com o usuario
         */
        var objctUsers = await Model.findOne({
            where:{
                'user_id':objctLogin.id
            }
        });

        if(!objctUsers){
            var objctUsers = await load.loadCreate(dadosUser,Model);
        }       
       
        if(objctUsers){
            return res.json({
                'status': 200,
                'mensagem': 'Registro cadastrado com sucesso.',
                'dados': objctUsers
            });
        }
    }


    return res.json({
        'status': 400,
        'mensagem': 'Não foi possível realizar o cadastro.'
    });    
});

router.put("/", async (req, res) => {
    var dadosUser = req.body.Usuarios;
    const objct = await Model.findByPk(dadosUser.id);
    if(objct){
        objct.nome      = dadosUser.nome;
        objct.sobrenome = dadosUser.sobrenome;
        objct.telefone  = dadosUser.telefone;
        objct.tipo      = dadosUser.tipo;

        if(await objct.save()){
            return res.json({
                'status': 200,
                'mensagem': 'Registro atualizado com sucesso.'
            });
        }
    }

    return res.json({
        'status': 400,
        'mensagem': 'Registro não encontrado.'
    });
  
});

router.delete("/:id",async (req, res) => {
    var dados = req.params;
    const objct = await Model.findByPk(dados.id);
    if(objct){
        var user_id = objct.user_id;
        if(await objct.destroy()){
    
            const login = await Login.findByPk(user_id);
            await login.destroy();
    
            return res.json({
                'status': 200,
                'mensagem': 'Registro deletado com sucesso.'
            });
        }
    }


    return res.json({
        'status': 400,
        'mensagem': 'Registro não encontrado.'
    });

});

module.exports = router;