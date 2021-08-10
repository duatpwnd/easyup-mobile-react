import { store } from "src/index";
import * as toggle from "src/action/modal";
export const loginModal = (obj) => {
  store.dispatch(toggle.modalAction(obj));
};
