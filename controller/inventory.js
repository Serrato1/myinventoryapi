let knex = require('../db/knex.js');
module.exports = {
    getInventory : function(req, res) {
        console.log('receiving inventory');
        knex('inventory')
        .then((data)=> {
            data = data.sort((a, b)=>{
                return a.id - b.id
            });
            res.json(data);
        });
    },
    createInventory: function(req, res) {
        console.log('creating inventory');
        console.log(req.body);
        if(req.body){
            let {item, count} = req.body;
            knex('inventory')
            .insert({item, count})
            .then((result)=>{
                console.log("sucess", result);
                res.send('upload success');
            })
            .catch((error)=>{
                console.log('error',error);
                res.send('upload failed')
            })
        }
    },
    decrease : function(req, res) {
        console.log('decreasing');
        let itemId = req.params.itemId;
        knex('inventory')
        .where({
            id: itemId
        })
        .then((result)=> {
            if(result.length !== 0){
                let count = result[0].count;
                let updatedCount = parseInt(count) - 1;
                if(updatedCount < 0){
                    updatedCount = 0;
                }
                knex('inventory')
                .where({
                    id: itemId
                })
                .update({
                    count: updatedCount
                })
                .then( (response)=>{
                    res.json({
                        updatedCount
                    });
                })
                .catch((error)=>{
                    console.log('error', error);
                    res.send(400);
                })
            }else {
                res.send('could not find item');
            }
         })
        .catch((err)=>{
            console.log("knex inventory error", err);
            res.send(500);
        })
    },
    increase : function(req, res) {
        console.log('increasing');
        let itemId = req.params.itemId;
        knex('inventory')
        .where({
            id: itemId
        })
        .then((result)=> {
            if(result.length !== 0){
                let count = result[0].count;
                let updatedCount = parseInt(count) + 1;
                knex('inventory')
                .where({
                    id: itemId
                })
                .update({
                    count: updatedCount
                })
                .then( (response)=>{
                    res.json({
                        updatedCount
                    });
                })
                .catch((error)=>{
                    console.log('error', error);
                    res.send(400);
                })
            }else {
                res.send('could not find item');
            }
         })
        .catch((err)=>{
            console.log("knex inventory error", err);
            res.send(500);
        })
    }   
}


