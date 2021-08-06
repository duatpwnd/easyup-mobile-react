
import "./Pagination.scoped.scss"
import { Link } from "react-router-dom";
const Pagination = ({ to, current, total }) => {
    return (<ul className="paging">
        {current > 1 ? <li className="prev">
            <Link to={to + (Number(current) - 1)}>이전페이지</Link>
        </li> : ""}
        {total != current && total > 1 ?
            <li className="next">
                <Link to={to + (Number(current) + 1)}>다음페이지</Link>
            </li>
            : ""}
    </ul>)

}
// ${Number(match.params.paging) + 1}
export default Pagination