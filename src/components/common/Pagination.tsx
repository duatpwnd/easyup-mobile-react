
import "./Pagination.scoped.scss"
import { Link } from "react-router-dom";
const Pagination = ({ to, total }) => {
    console.log(to);
    return (<ul className="paging">
        {to.pageCurrent > 1 ? <li className="prev">
            <Link to={{ state: { ...to, pageCurrent: Number(to.pageCurrent) - 1 } }}>이전페이지</Link>
        </li> : ""}
        {total != to.pageCurrent && total > 1 ?
            <li className="next">
                <Link to={{ state: { ...to, pageCurrent: Number(to.pageCurrent) + 1 } }}>다음페이지</Link>
            </li>
            : ""}
    </ul>)

}
export default Pagination