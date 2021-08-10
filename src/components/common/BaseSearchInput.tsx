
import "./BaseSearchInput.scoped.scss"
const BaseSearchInput = (props: { [key: string]: any }) => {
    return <div className="search">
        {props.left}
        <input type="text" className="search-input" onChange={(e) => {
            props.keywordEvent(e.currentTarget.value)
        }} placeholder={props.placeholder} />
        <button
            className="search-button"
            onClick={props.buttonEvent}
        ></button>
    </div>

}
export default BaseSearchInput