
type Response = {
    kind: "ok",
    value: any,
} | {
    kind: "error",
    error: {code:number, message:string},
};

interface error {
    code: number;
    message: string;
}



export async function jsonrpc2(method: string, params: any): Promise<Response> {
    try {
        let result = await doJsonrpc2(method, params);
        console.info("RPC:", method, params, "response:", result);
        return result;
    } catch (exn) {
        console.info("RPC failed:", method, params, exn)
        throw exn;
    }
}

async function doJsonrpc2(method: string, params: any): Promise<Response> {
    const request = JSON.stringify({
        jsonrpc: "2.0",
        method: method,
        params: params,
        id: `method=${method} params=${JSON.stringify(params)}`
    });

    let url = process.env.REACT_APP_API_URL;
    if (!url)
        url = '';
    url += '/rpc';
    let response = await fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: request
    });
    if (!response.ok) {
        throw new Error(`не удалось получить ответ от сервера: ${JSON.stringify(response)}`);
    }
    let data = await response.json();



    if (data.result) {
        return {
            kind: "ok",
            value: data.result,
        };
    }
    if (isRpcError(data.error)) {
        return {
            kind: "error",
            error: data.error,
        };
    }
    throw new Error(`не удалось распарсить ответ от сервера: ${JSON.stringify(data)}`);
}


function isRpcError(item: any): item is error {
    return typeof item.code === 'number' && typeof item.message === 'string';
}