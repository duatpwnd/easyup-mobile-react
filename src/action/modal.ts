import { createAction } from "typesafe-actions";
interface StateType {
  message?: string;
  mask?: boolean;
}
export const LOGIN_MODAL = "modal/LOGIN_MODAL";
export const MASK = "modal/MASK";
export const GUIDE_MESSAGE_MODAL = "modal/GUIDE_MESSAGE";
export const maskModal = createAction(MASK)<StateType>();
export const loginModal = createAction(LOGIN_MODAL)();
export const guideMsgModal = createAction(GUIDE_MESSAGE_MODAL)<StateType>();
