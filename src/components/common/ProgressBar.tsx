import "./ProgressBar.scoped.scss"
const ProgressBar = (props: { [key: string]: any }) => {
    console.log(props);
    return (<div className="progress_bar">
        {props.children}
        <progress max={props.max} value={props.value}>
        </progress>
    </div>)
}
export default ProgressBar