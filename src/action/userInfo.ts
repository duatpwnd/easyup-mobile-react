import { createAction } from "typesafe-actions";
interface StateType {
  userInfo: null | { [key: string]: any };
}
export const USER_INFO_SET = "userInfo/Setting";
export const userInfoSet = createAction(USER_INFO_SET)<StateType>();
