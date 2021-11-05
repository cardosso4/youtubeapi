module.exports = class Funcoes{

    loadCreate(dados,Model){
        const objct = Model.create(dados);       
        return objct;
    }
}