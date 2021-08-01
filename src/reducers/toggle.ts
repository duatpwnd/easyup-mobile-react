import * as toggle from "src/action/toggle";
import { createReducer, ActionType } from "typesafe-actions";
interface StateType {
  guideMessage?: string;
  loginModal?: boolean;
  guideMsgModal?: boolean;
  mask: boolean;
}
const initialState: StateType = {
  guideMessage: "",
  guideMsgModal: false,
  loginModal: false,
  mask: false,
};
export const toggleState = createReducer(initialState, {
  [toggle.LOGIN_MODAL]: (state) => ({
    loginModal: !state.loginModal,
    mask: !state.mask,
  }),
  [toggle.GUIDE_MESSAGE_MODAL]: (state, action) => ({
    guideMsgModal: true,
    guideMessage: action.payload.message,
    mask: true,
  }),
  [toggle.MASK]: (state, action) => {
    return {
      mask: action.payload.mask,
    };
  },
});
