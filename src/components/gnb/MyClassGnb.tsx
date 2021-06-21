import "./MyClassGnb.scss"
import { useDispatch } from "react-redux";
import * as toggle from "src/action/toggle"

const MyClassGnb = () => {
    const dispatch = useDispatch();
    const mask = () => {
        console.log('클릭');
        dispatch(toggle.maskModal({ mask: true }))
    }
    return (
        <div className="myclass-gnb">
            <button onClick={mask}>press me</button>
        </div>
    )
}
export default MyClassGnb