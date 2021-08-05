import { combineReducers } from "redux";
import { modalState } from "./modal";
import { userInfoSet } from "./userInfo";
const rootReducer = combineReducers({
  modalState,
  userInfoSet,
});

export default rootReducer;
