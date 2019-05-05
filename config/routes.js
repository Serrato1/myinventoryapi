let index = require('../controller/index.js');
let inventory = require('../controller/inventory.js');
var bodyParser = require('body-parser');
let jsonParser = bodyParser.json()

module.exports = function(app) {
    app.get('/', index.home);
    app.get('/inventory', inventory.getInventory );
    
    app.get('/inventory/decrease/:itemId', inventory.decrease );
    app.get('/inventory/increase/:itemId', inventory.increase );

    app.post('/inventory/create', jsonParser, inventory.createInventory);

}