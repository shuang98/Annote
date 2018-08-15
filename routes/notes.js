var express = require('express');
var router = express.Router({ mergeParams: true });
var Note = require('../models/note');

function getAllNotes(req, res, next) {
    let doc_url = req.params.doc_url;
    Note.all(doc_url).then((data) => {
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'Retrieved all Notes'
        })
    }).catch((err) => {
        return next(err);
    });
}

function getSingleNote(req, res, next) {
    let note_id = parseInt(req.params.id);
    let doc_url = req.params.doc_url;
    Note.get(note_id, doc_url).then((data) => {
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'Retrieved 1 Note'
        });
    }).catch((err) => {
        return next(err);
    });
}

function createNote(req, res, next) {
    if (!(req.body.body && req.body.author)) {
        return next({
            message: "Invalid Arguments",
            request_body: req.body
        });
    }
    let doc_url = req.params.doc_url;
    let note = {
        body: req.body.body,
        author: req.body.author,
        doc_url: doc_url,
        start_index: req.body.start_index,
        end_index: req.body.end_index
    }
    Note.create(note).then((data) => {
        res.status(200).json({
            status: 'success',
            message: 'Inserted 1 note'
        });
    }).catch((err) => {
        return next(err);
    });
}

function updateNote(req, res, next) {
    let doc_url = req.params.doc_url;
    let id = parseInt(req.params.id);
    Note.update(id, req.body, doc_url).then(() => {
        res.status(200).json({
            status: 'success',
            message: 'Updated 1 note'
        })
    }).catch((err) => {
        return next(err);
    });
}

function deleteNote(req, res, next) {
    let doc_url = req.params.doc_url;
    let id = parseInt(req.params.id);
    Note.delete(id, doc_url).then(() => {
        res.status(200).json({
            status: 'success',
            message: 'Deleted Note'
        });
    }).catch((err) => {
        return next(err);
    });
}

router.get('/', getAllNotes);
router.get('/:id', getSingleNote);
router.post('/', createNote);
// router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;