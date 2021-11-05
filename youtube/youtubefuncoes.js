const google = require('googleapis');

const youtube = new google.youtube_v3.Youtube({
    version: 'v3',
    auth: 'AIzaSyDyWeoxbhHZ3QEp6AU15Dj33UQT7Y_8t4Y'
});
 
class Youtubefuncoes{
    async pesquisaYoutube(pesquisa,limite) {
        try{
            var retorno = await youtube.search.list({
                q: pesquisa,
                part: 'snippet',
                fields: 'items(id(videoId),snippet(title,description,thumbnails(high(url))))',
                type: 'video',
                maxResults: limite
            });

            return {
                status: 200,
                mensagem: 'Registro encontrado com sucesso.',
                dados:retorno.data,
            }          
        }catch(error){
            return {
                status: 400,
                mensagem: 'Erro ao realizar a requisição.',
                dados: error
            }
        }
    }
}

module.exports = Youtubefuncoes;