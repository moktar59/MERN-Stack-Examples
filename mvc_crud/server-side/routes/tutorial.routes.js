module.exports = app => {
    const tutorials = require('./../controllers/tutorial.controller');
    
    let router = require('express').Router();

    router.post("/", tutorials.create);

    router.get('/published', tutorials.allPublishedTutorials);
    
    router.get('/', tutorials.findAll);

    router.get('/:id', tutorials.findOne);

    router.put('/:id', tutorials.update);

    router.delete('/:id', tutorials.delete);


    router.delete('/', tutorials.deleteAll);


    app.use('/api/tutorials/', router);
};