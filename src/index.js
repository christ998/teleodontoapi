require('dotenv').config()
const app = require('./app')
// var store = require('sessionstorage')
require('./_config/mysql')

const main = async () => {
    console.info("[SERVER] Starting...");
    await app.listen(app.get('port'));
    console.info('[SERVER] Running on port ' + app.get('port')); 
    console.info("[MYSQL] Connecting...");
};

main();