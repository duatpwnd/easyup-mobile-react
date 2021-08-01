import { createAction } from "typesafe-actions";
interface StateType {
  message?: string;
  mask?: boolean;
}
export const LOGIN_MODAL = "toggle/LOGIN_MODAL";
export const MASK = "toggle/MASK";
export const GUIDE_MESSAGE_MODAL = "toggle/GUIDE_MESSAGE";
export const maskModal = createAction(MASK)<StateType>();
export const loginModal = createAction(LOGIN_MODAL)();
export const guideMsgModal = createAction(GUIDE_MESSAGE_MODAL)<StateType>();
