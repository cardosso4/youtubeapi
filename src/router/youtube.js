'use strict';

const express = require('express');
const router = express.Router();

const Historico = require("../../db/models/historico");
const Usuarios = require("../../db/models/usuario");

const Funcoes = require('../../utils/dbfunctions');
const Youtubefuncoes = require('../../youtube/youtubefuncoes');

const load    = new Funcoes();
const youtube = new Youtubefuncoes();

router.get("/search/:pesquisa/:limite/:user_id", async (req, res) => {  
    var dados = req.params; 

    var user = await Usuarios.findOne({
        where:{
            user_id:dados.user_id,
        }
    });

    if(user){
        var objct = await Historico.findOne({
            where:{
                usuario_id:user.id,
                pesquisa:dados.pesquisa
            }
        });
    
        if(objct){
            objct.quantidade = parseInt(objct.quantidade)+1;
            objct.save();
        }else{
            load.loadCreate({
                usuario_id:user.id,
                pesquisa:dados.pesquisa,
                quantidade:1,
            },Historico);
        }
    }

    return res.json(dados);
    // return res.json(await youtube.pesquisaYoutube(dados.pesquisa,dados.limite));
});

module.exports = router;






