var db = require('../database');
// all model functions return a promise

exports.all = function (doc_url) {
    return db.any('select * from notes where doc_url=$1',
        doc_url);
}

exports.get = function (id, doc_url) {
    return db.one('select * from notes where id = $1 ' +
        'and doc_url = $2', [id, doc_url]);
}

exports.create = function (note) {
    return db.none('insert into notes(body, doc_url, author, start_index, end_index) ' +
        'values(${body}, ${doc_url}, ${author}, ${start_index}, ${end_index})',
        note);
}

exports.update = function (id, note_params, doc_url) {
    let query = 'update notes set ';
    note_params.id = id;
    note_params.doc_url = doc_url;
    if (note_params.body) {
        query += 'body=${body} ';
    }
    query += 'where id=${id} and doc_url=${doc_url}';
    return db.none(query, note_params);
}

exports.delete = function (id, doc_url) {
    return db.result('delete from notes where id = $1 ' +
        'and doc_url = $2', [id, doc_url]);
}