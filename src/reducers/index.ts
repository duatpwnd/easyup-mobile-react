import { combineReducers } from "redux";
import { toggleState } from "./toggle";
const rootReducer = combineReducers({
  toggleState,
});

export default rootReducer;
