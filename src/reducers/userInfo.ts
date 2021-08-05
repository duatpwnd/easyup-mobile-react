import * as user from "src/action/userInfo";
import { createReducer } from "typesafe-actions";
interface StateType {
  userInfo: null | { [key: string]: any };
}
const initialState: StateType = {
  userInfo: null,
};
export const userInfoSet = createReducer(initialState, {
  [user.USER_INFO_SET]: (state, action) => ({
    userInfo: action.payload.userInfo,
  }),
});
