import React from 'react';
import "./BaseButton.scoped.scss"
const BaseButton = (props: { [key: string]: any }) => {
    console.log(props);
    return (<button type="button" className={`base-button ${props.className}`} onClick={props.handleClick}>{props.name}</button>)
}
export default React.memo(BaseButton, (prevProps, nextProps) => {
    if (prevProps.name != nextProps.name) {
        return false;
    } else {
        return true;
    }
})