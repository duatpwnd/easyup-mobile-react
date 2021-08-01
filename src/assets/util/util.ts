import { useDispatch } from "react-redux";
import * as toggle from "src/action/toggle";
export const GuideMessage = (message) => {
  console.log(message);
  const dispatch = useDispatch();
  dispatch(toggle.guideMsgModal({ message: message }));
};
