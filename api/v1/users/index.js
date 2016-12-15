const express = require('express');
let app = module.exports = express();

const User = require(mainDir+'/models/user');

app.get('/', function(req, res) {
    User.list((list) => {
        res.status(200).send(list);
    });
});

app.get('/:id', function(req, res) {
    let id = req.params.id || false;
    if (id) {
        User.get(id, (one) => {
            res.status(200).send(one);
        });
    }
    else {
        res.status(400).send('Bad request');
    }
});

app.put('/create', function(req, res) {
    let name = req.body.name || false;

    if (name) {
        User.create(name, (_id) => {
            res.status(200).send(_id);
        });
    }
    else {
        res.status(400).send('Bad request');
    }
});

app.post('/:id/update', function(req, res) {
    let id = req.params.id || false;
    let name = req.body.name || false;

    if (id) {
        User.update(id, {name: name}, () => {
            res.status(200).send('updated');
        });
    }
    else {
        res.status(400).send('Bad request');
    }
});

app.delete('/:id/delete', function(req, res) {
    let id = req.params.id || false;

    if (id) {
        User.delete(id, (result) => {
            res.status(200).send('Deleted '+result);
        });
    }
    else {
        res.status(400).send('Bad request');
    }
});
