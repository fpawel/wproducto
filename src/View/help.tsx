import React from "react";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const withTooltip = (text: string, id: string, wrapped: React.ReactNode) => {

    return <OverlayTrigger
        placement='bottom-start'
        delay={{show: 250, hide: 400}}
        overlay={
            <Tooltip id={`tooltip-${id}`}>
                <strong>{text}</strong>.
            </Tooltip>
        }
    >
        {wrapped}
    </OverlayTrigger>;
};

export const btnProd = (productID:number) => ( tooltip:string, tooltipID:string, icon:IconProp, f: () => void) =>
    withTooltip(tooltip,
        `${tooltipID}-${productID}`,
        <Button variant="link" onClick={f}>
            <FontAwesomeIcon icon={icon}/>
        </Button>);