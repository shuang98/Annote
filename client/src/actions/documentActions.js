export function updateDocument(document) {
    return {
        type: 'UPDATE_DOCUMENT',
        payload: document
    }
}

export function updateSelected(selected) {
    return {
        type: 'UPDATE_SELECTED',
        payload: selected
    }
}

export function fetchNotes(doc_url) {
    return {
        type: 'FETCH_NOTES',
        payload: fetch('/api/' + doc_url + '/notes', {
            headers: { "Content-Type": "application/json" }
        }).then(response => {
            return response.json();
        })
    };
}

export function selectSegment(index) {
    return {
        type: 'SELECT_SEGMENT',
        payload: index
    }
}

export function updateSelectRange(range) {
    return {
        type: 'UPDATE_SELECT_RANGE',
        payload: range
    }
}

export function invalidArguments(msg) {
    return {
        type: 'INVALID_ARGUMENTS',
        payload: msg
    }
}