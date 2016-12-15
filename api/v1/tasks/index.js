const express = require('express');
let app = module.exports = express();

const Task = require(mainDir+'/models/task');

app.get('/', function(req, res) {
    Task.list((list) => {
        res.status(200).send(list);
    });
});

app.get('/:id', function(req, res) {
    let id = req.params.id || false;
    if (id) {
        Task.get(id, (one) => {
            res.status(200).send(one);
        });
    }
    else {
        res.status(400).send('Bad request');
    }
});

app.put('/create', function(req, res) {
    let title = req.body.title || false;
    let description = req.body.description || false;
    let status = req.body.status || 'open';
    let user = req.body.user || '';

    if (title) {
        Task.create(title, description, status, user, (_id) => {
            res.status(200).send(_id);
        });
    }
    else {
        res.status(400).send('Bad request');
    }
});

app.post('/:id/delegate', function(req, res) {
    let id = req.params.id || false;
    let user = req.body.user || false;

    if (id && user) {
        Task.update(id, {user: user}, () => {
            res.status(200).send('updated');
        });
    }
    else {
        res.status(400).send('Bad request');
    }
});

app.post('/:id/update', function(req, res) {
    let id = req.params.id || false;
    let title = req.body.title || false;
    let description = req.body.description || false;

    if (id) {
        Task.update(id, {title: title, description: description}, () => {
            res.status(200).send('updated');
        });
    }
    else {
        res.status(400).send('Bad request');
    }
});

app.post('/:id/toggle', function(req, res) {
    let id = req.params.id || false;

    if (id) {
        Task.get(id, (result) => {
            let status = result.status == 'open' ? 'closed' : 'open';
            Task.update(id, {status: status}, () => {
                res.status(200).send('Status updated');
            });
        });
    }
    else {
        res.status(400).send('Bad request');
    }
});

app.post('/search', function(req, res) {
    let string = req.body.string || false;

    if (string) {
        Task.search(string, (result) => {
            res.status(200).send(result);
        });
    }
    else {
        res.status(400).send('Bad request');
    }
});

app.delete('/:id/delete', function(req, res) {
    let id = req.params.id || false;

    if (id) {
        Task.delete(id, (result) => {
            res.status(200).send('Deleted '+result);
        });
    }
    else {
        res.status(400).send('Bad request');
    }
});
