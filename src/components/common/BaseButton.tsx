import React from 'react';
import "./BaseButton.scss"


const BaseButton = (props: { [key: string]: any }) => {
    console.log(props);
    return (<button type="button" className="base-button" onClick={props.handleClick}>{props.children}</button>)

}
export default BaseButton