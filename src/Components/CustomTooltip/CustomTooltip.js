import React from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

function CustomTooltip(props) {
    const value = props.value;

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {value}
        </Tooltip>
    );

    return (
        <OverlayTrigger
            placement={props.posicao}
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
        >
            {props.children}
        </OverlayTrigger>
    )
}

export default CustomTooltip;