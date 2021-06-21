import * as toggle from "src/action/toggle";
import { createReducer, ActionType } from "typesafe-actions";
interface StateType {
  loginModal?: boolean;
  mask: boolean;
}
const initialState: StateType = {
  loginModal: false,
  mask: false,
};
export const toggleState = createReducer(initialState, {
  [toggle.LOGIN_MODAL]: (state) => ({
    loginModal: !state.loginModal,
    mask: !state.mask,
  }),
  [toggle.MASK]: (state, action) => {
    return {
      mask: action.payload.mask,
    };
  },
});
