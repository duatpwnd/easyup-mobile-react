
import "./BaseSearchInput.scss"
const BaseSearchInput = (props: { [key: string]: any }) => {
    console.log(props);
    return <div className="search">
        {props.left}
        <input type="text" className="search-input" placeholder={props.placeholder} />
        {props.right}
    </div>

}
export default BaseSearchInput