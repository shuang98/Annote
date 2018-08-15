var express = require('express');
var router = express.Router();
var Document = require('../models/document');

var URL = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};

function getAllDocuments(req, res, next) {
    Document.all().then(function (data) {
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'Retrieved all Documents'
        });
    }).catch(function (err) {
        
        return next(err);
    });
}

function getSingleDocument(req, res, next) {
    let document_id = req.params.id;
    Document.get(document_id).then(function (data) {
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'Retrieved 1 Document'
        });
    }).catch(function (err) {
        console.log(err);
        if(err.code == 0) {
            return res.status(404).json({
                status: 'error',
                message: 'not found'
            });
        }
        next(err);
    });
}

function createDocument(req, res, next) {
    if (!req.body.body || !req.body.title) {
        return next({
            message: "Invalid Arguments",
            request_body: req.body 
        })
    }
    let document = {
        url: URL(),
        body: req.body.body,
        prompt: req.body.prompt,
        title: req.body.title
    }
    Document.create(document).then(() => {
        res.status(200).json({
            status: 'success',
            message: 'Inserted one Document',
            document: document
        });
    }).catch((err) => {
        return next(err);
    });
}

function updateDocument(req, res, next) {
    let id = req.params.id;
    Document.update(id, req.body).then(() => {
        res.status(200).json({
            status: 'success',
            message: 'Updated Document'
        });
    }).catch((err) => {
        return next(err);
    });
}

function deleteDocument(req, res, next) {
    let document_id = req.params.id;
    Document.delete(document_id).then(() => {
        res.status(200).json({
            status: 'success',
            message: 'Deleted Document'
        });
    }).catch((err) => {
        return next(err);
    });
}

//REST
// router.get('/', getAllDocuments);
router.get('/:id', getSingleDocument);
router.post('/', createDocument);
router.put('/:id', updateDocument);
router.delete('/:id', deleteDocument);

var notesRouter = require('./notes');
router.use('/:doc_url/notes', notesRouter);

module.exports = router;