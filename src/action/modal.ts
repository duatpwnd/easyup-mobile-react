import { createAction } from "typesafe-actions";
interface StateType {
  guideMessage?: string;
  loginModal?: boolean;
  guideMsgModal?: boolean;
  mask?: boolean;
}
export const MODAL_CHANGE = "modal/MODAL_CHANGE";
export const modalAction = createAction(MODAL_CHANGE)<StateType>();
