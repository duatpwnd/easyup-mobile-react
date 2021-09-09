import "./CsCenter.scoped.scss"
import { NavLink, Route } from "react-router-dom";
import NoticeList from "src/views/cs-center/NoticeList";
const CsCenter = ({ match, location }) => {
    const activeStyle = {
        color: "black",
        background: "#ffffff",
    }
    return (
        <div>
            <NavLink to="/csCenter/notice" activeStyle={activeStyle} className="tab"><span className="bar"></span>공지사항</NavLink>
            <NavLink to="/csCenter/faq" activeStyle={activeStyle} className="tab"><span className="bar"></span>FAQ</NavLink>
            <NavLink to="/csCenter/inquiry" activeStyle={activeStyle} className="tab"><span className="bar"></span>1:1문의</NavLink>
            <Route path={`${match.path}/notice`} component={NoticeList}></Route>
        </div>
    )
}
export default CsCenter