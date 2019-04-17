import {Modal, Spinner} from "react-bootstrap";
import React from "react";


export default function ModalInfo(message:string, show :boolean) {

    return( <Modal
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={function () {}}
            >
                <Modal.Body>
                    <Spinner animation="border" style={{marginRight:"20px"}} />
                    <span style={{
                        marginLeft:"20px",
                        fontSize:"xx-large",
                    }}>{message}</span>
                </Modal.Body>
        </Modal>
        );
}