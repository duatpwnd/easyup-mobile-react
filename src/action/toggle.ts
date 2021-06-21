import { createAction } from "typesafe-actions";
interface StateType {
  mask: boolean;
}
export const LOGIN_MODAL = "toggle/LOGIN_MODAL";
export const MASK = "toggle/MASK";
export const maskModal = createAction(MASK)<StateType>();
export const loginModal = createAction(LOGIN_MODAL)();
