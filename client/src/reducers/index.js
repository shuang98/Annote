import { combineReducers } from "redux";
import page from "./pageReducer";
import doc from "./documentReducer";

export default combineReducers({
    page,
    doc
});
