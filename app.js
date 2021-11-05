const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Carrega as rotas
const loginRoutes    = require("./src/router/login");
const usuarioRoutes  = require("./src/router/usuarios");
const youtubeRoutes  = require("./src/router/youtube");

app.use("/login",loginRoutes); 
app.use("/usuario",usuarioRoutes);
app.use("/youtube",youtubeRoutes);

app.listen(3000,() => {
    console.log("Servidor iniciado na porta 3000: http://localhost:3000");
});


