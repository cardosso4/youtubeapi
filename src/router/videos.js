'use strict';

const express = require('express');
const router = express.Router();

const Model = require("../../db/models/videos");

router.get("/", async (req, res) => {
    var dados = req.body;
    const users = await Model.findByPk(dados.id);
    return res.json(users);
});

router.post("/", (req, res) => {
    var dados = req.body;
    const users =  Model.create({
        email: dados.email,
        senha: dados.senha,
    });    
    return res.json(users);    
});

router.put("/", async (req, res) => {
    
    var dados = req.body;
    const users = await Model.findByPk(dados.id);

    if(users){
        users.senha = dados.senha;
        await users.save();
        return res.json({
            'status': 200,
            'mensagem': 'Registro atualizado com sucesso.'
        });
    }

    return res.json({
        'status': 400,
        'mensagem': 'Registro não encontrado.'
    });
  
});

router.delete("/",async (req, res) => {
    var dados = req.body;
    const users = await Model.findByPk(dados.id);
    if(users){
        await users.destroy();
        return res.json({
            'status': 200,
            'mensagem': 'Registro deletado com sucesso.'
        });
    }

    return res.json({
        'status': 400,
        'mensagem': 'Registro não encontrado.'
    });

});

module.exports = router;