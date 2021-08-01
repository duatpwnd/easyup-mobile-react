import "./CsCenter.scss"
import { NavLink,Link,Route } from "react-router-dom";
import NoticeList from "src/components/cs-center/NoticeList";
const CsCenter = (path) => {
    console.log(path);
    const arr = [1,2,3,4,5,6,7,8,9,10]
    const activeStyle = {
        color: "black",
        background: "#ffffff",
    }
    return (
        <div>
        <NavLink to="/csCenter/notice" activeStyle={activeStyle} className="tab"><span className="bar"></span>공지사항</NavLink>
        <NavLink to="/csCenter/faq" activeStyle={activeStyle} className="tab"><span className="bar"></span>FAQ</NavLink>
        <NavLink to="/csCenter/inquiry" activeStyle={activeStyle} className="tab"><span className="bar"></span>1:1문의</NavLink>
        <ul>
            {
                arr.map((el,index)=><li key={index}><Link to={`/csCenter/notice/${el}`} >{el}</Link></li>)
            }
        </ul>
        <Route exact  path={path.match.path+'/notice'} render={()=>(<h3>Please select any post</h3>)}></Route>
        <Route path={`${path.match.path}/notice/:id`} component={NoticeList}></Route>
        </div>
    )
}
export default CsCenter