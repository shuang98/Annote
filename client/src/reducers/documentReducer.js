const initialState = {}
const reducer = (state = initialState, action) => {
    if (action.type === 'UPDATE_DOCUMENT') {
        let document = action.payload;
        let selected = document.body.split(' ').map(word => false);
        state = {
            document: action.payload,
            selected: selected
        }
    } else if (action.type === 'UPDATE_SELECTED') {
        state = {
            ...state,
            selected: action.payload
        }
    } else if (action.type === 'FETCH_NOTES_FULFILLED') {
        let notes = action.payload.data;
        let intervals = notes.map(note => [note.start_index, note.end_index, [
            note
        ]]);
        let length = state.document.body.split(' ').length
        state = {
            ...state,
            notes: action.payload.data,
            segments: mergeIntervals(intervals, length)
        }
    } else if (action.type === 'SELECT_SEGMENT') {
        state = {
            ...state,
            selectedSegment: action.payload
        }
    } else if (action.type === 'UPDATE_SELECT_RANGE') {
        state = {
            ...state,
            selectRange: action.payload
        }
    } else if (action.type == "INVALID_ARGUMENTS") {
        state = {
            ...state,
            error: action.payload
        }
    }
    return state;
}

function mergeIntervals(intervals, length) {
    if (intervals.length <= 0)
        return [[0, length - 1, []]];
    var stack = [], last;
    intervals.sort(function (a, b) {
        return a[0] - b[0];
    });
    if (intervals[0][0]) {
        stack.push([0, intervals[0][0] - 1, []]);
    }
    stack.push(intervals[0]);
    for (var i = 1, len = intervals.length; i < len; i++) {
        last = stack[stack.length - 1];
        if (last[1] < intervals[i][0]) {
            stack.push([last[1] + 1, intervals[i][0] - 1, []]);
            stack.push(intervals[i]);
        }
        else if (last[1] >= intervals[i][0]) {
            last[1] = Math.max(intervals[i][1], last[1]);
            last[2].push(intervals[i][2][0]);
            stack.pop();
            stack.push(last);
        }
    }
    last = stack[stack.length - 1];
    if (last[1] < length - 1) {
        stack.push([last[1] + 1, length - 1, []])
    }
    return stack;
}


export default reducer;