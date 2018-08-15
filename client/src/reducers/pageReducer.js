const initialState = {currentPage: 'Home'}
const reducer = (state = initialState, action) => {
    if (action.type === 'SET_PAGE') {
        state = {
            currentPage: action.payload
        }
    }
    return state;
}

export default reducer;