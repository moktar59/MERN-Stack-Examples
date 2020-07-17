const db = require('./../models');
const Tutorial = db.tutorials;

//Create and Save new tutorial
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({message: "Title Cannot be empty."});

        return;
    }

    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });

    tutorial.save(tutorial).then(data => {
        res.send(data);
    }).catch (err => {
        res.status(500).send({message: "Failed to save data in the database. Error:".err.message});
    })
};

//Retrieve all tutorials from the database
exports.findAll = (req, res) => {
    const title = req.body.title;

    const condition = title ? {title: {$regex: new RegExp(title), $options: "i"}} : {};

    Tutorial.find(condition).then(data => res.send(data)).catch (err => {
        res.status(500).send({message: "Failed to retrieve data. Error: ". err.message});
    });
};

//Find a single tutorial with an ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findById(id).then(data => {
        if (!data) {
            res.status(404).send({message: "No data found with that id"});
            return;
        }

        res.send(data);
    }).catch (err => {
        res.status(500).send({message: "Failed to retrieve data. Error: "});
    });
};

//Update a tutorial with an ID of the request
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({message: "The data to be updated cannot be empty."});

        return;
    }

    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then(data => {
        if (!data) {
            res.status(404).send({message: "Failed to update data. May be the target data not found."});
            return;
        }

        res.send({message: "The Tutorial was updated successfully."});
    }).catch (err => {
        res.status(500).send({message: "Failed to update data. Error: ". err.message});
    });
};

//Delete a tutorial with an ID of the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.findByIdAndRemove(id).then(data => {
        if (!data) {
            res.status(404).send({message: "The target tutorial not found."});
            return;
        }

        res.send({message: "The tutorial has been deleted successfully."});
    }).catch (err => {
        res.status(500).send({message: "Failed to delete tuturial. Error:". err.message});
    });
};

//Delete All Tutorials from the database
exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({}).then(data => {
        res.send({message: `${data.deletedCount} tutorials have been deleted.`});
    }).catch (err => {
        res.status(500).send({message: "Failed to delete. Error: ". err.message});
    })
};

//Find all published tutorials
exports.allPublishedTutorials = (req, res) => {
    const published = req.body.published;

    const condition = published ? {published: published} : {};

    Tutorial.find(condition).then(data => res.send(data)).catch (err => {
        res.status(500).send({message: "Failed to retrieve data. Error: ". err.message});
    });

    // Tutorial.find().then(data => {
    //     res.send(data);
    //     return;
    // }).catch ((err) => {
    //     res.status(500).send({message: "Failed to retrive published tutorials. Error: ". err});
    // })
};