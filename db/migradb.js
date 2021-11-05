(async () => {
    const databse   = require('./db');
    const Login     = require("./migration/login");
    const Usuario   = require("./migration/usuario");
    const Videos    = require("./migration/videos");
    const Historico    = require("./migration/historico");
    await databse.sync();
})();