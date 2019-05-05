let knex = require('../db/knex.js');
module.exports = {
    home: function(req, res) {
        console.log('handling home route');
        res.sendStatus(200);
    },
    

}