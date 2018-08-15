var db = require('../database')
var Note = require('./note');
// all models return promise

exports.all = function () {
    return db.any('select * from documents');
}

// id = user id
exports.get = function(id) {
    return db.one('select * from documents where url = $1', id);
}

// document = {body: 'text', owner_id: 1}
exports.create = function(document) {
    return db.none('insert into documents(body, prompt, title, url)' + 
        'values(${body}, ${prompt}, ${title}, ${url})', document);
}

// id = doc's id, document_params = non empty object with
// columns as keys and new values as values.
exports.update = function(id, document_params) {
    let query = 'update documents set ';
    document_params.id = id;
    if (document_params.body) {
        query += 'body=${body} ';
    }
    if (document_params.prompt) {
        query += 'prompt=${prompt} ';
    }
    if (document_params.title) {
        query += 'title=${title} ';
    }
    query += 'where url=${id}';
    return db.none(query, document_params);
}

//id = document id
exports.delete = function(id) {
    return db.result('delete from documents where url = $1', id);
}
