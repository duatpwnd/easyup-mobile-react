
import "./BaseButton.scss"
const BaseButton = (props: { [key: string]: any }) => {
    console.log(props);
    return (<button type="button" className="base-button" onClick={props.handleClick}>{props.name}</button>)

}
export default BaseButton