import React from "react";
import { jsonrpc2 } from "../helpers/Api"
import { Modal, Spinner } from "react-bootstrap";

type RPCResult = {
    kind: "ok",
    value: any,
} | {
    kind: "error",
    error: {code:number, message:string},
} | {
    kind: "exception",
    exn: any,
};

interface State {
    payload: "request" | RPCResult
}
interface rpcResult {
    rpcResult: RPCResult
}

interface Props<P extends rpcResult> {
    method:string,
    params:any,
    component: React.ComponentType<P>,
}



class Wrapper<P extends rpcResult> extends React.Component<Props<P>, State> {
    constructor(props: Props<P>) {
        super(props);
        this.state = {
            payload: "request",
        };
    }

    async componentDidMount() {
        try {
            let response = await jsonrpc2(this.props.method, this.props.params);
            this.setState({
                payload: response,
            });
            return;

        } catch (exn) {
            this.setState({
                payload: {
                    kind: "exception",
                    exn: exn,
                },
            });
        }
    }

    render() {
        if (this.state.payload === "request") {
            return (

                <Modal
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={true}
                    onHide={function () {
                    }}
                >
                    <Modal.Body>
                        <Spinner animation="border" style={{marginRight: "10px"}}/>
                        <span style={{
                            marginLeft: "10px",
                            fontSize: "large",
                        }}>{'Загрузка'}</span>
                    </Modal.Body>
                </Modal>
            );
        }

        return (

            <this.props.component
                {...this.props as P}
                rpcResult={this.state.payload}
            />

        );
    }
}


export const withRPC =
    <P extends rpcResult>
    (method:string,params:any, component: React.ComponentType<P>) =>
        (<Wrapper method={method} params={params} component={component} />);



