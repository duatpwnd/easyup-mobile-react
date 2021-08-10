import * as toggle from "src/action/modal";
import { createReducer } from "typesafe-actions";
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
export const modalState = createReducer(initialState, {
  [toggle.MODAL_CHANGE]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
});
