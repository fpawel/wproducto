import {action, observable} from 'mobx'
import * as AppKey from "./AppKey";

type Auth = { type: 'guest' } | { type: 'user', name: string, email: string }
type Modal = 'login' | null;

type RPCMethod = "Auth.Login" | "Auth.Register" | "Auth.Profile";

type Jsonrpc2Response = {
    type: "result",
    result: any,
} | {
    type: "error",
    error: { code: number, message: string },
};


class AppState {
    @observable auth: Auth = {type: 'guest'};
    @observable rpcRequest : RPCMethod | null = null;
    @observable connectionError: string | null = null;
    @observable modal : Modal = null;


    @action
    setAuth(auth: Auth) {
        this.auth = auth;
    }

    @action
    setModal(modal: Modal) {
        this.modal = modal;
    }


    @action
    setPRCRequest(rpcRequest: RPCMethod | null) {
        this.rpcRequest = rpcRequest;
    }

    @action
    setConnectionError(connectionError: string | null) {
        this.connectionError = connectionError;
        this.rpcRequest = null;
    }

    async fetchProfile() {
        let response = await this.jsonrpc2("Auth.Profile", [localStorage.getItem(AppKey.tokenKey)]);
        if (response.type === 'result') {
            appState.setAuth({type: 'user', name: response.result.Name, email: response.result.Email})
        } else {
            appState.setAuth({type: 'guest'})
        }
    }

    async login(params : { name: string, pass: string }){
        let response = await this.jsonrpc2("Auth.Login", params);
        if (response.type === "result") {
            localStorage.setItem(AppKey.tokenKey, response.result);
            await this.fetchProfile()
        }
        return response;
    }


    async register(arg: { name: string, pass: string, email: string }) {

        let response = await this.jsonrpc2("Auth.Register", {
            name: arg.name,
            pass: arg.pass,
            email: arg.email,
            role: "regular_user",
        });
        if (response.type === "result") {
            localStorage.setItem(AppKey.tokenKey, response.result);
        }
        return response;
    }

    async jsonrpc2(method: RPCMethod, params: any) {
        this.setPRCRequest(method);
        try {
            let result = await AppState.jsonrpc2(method, params);
            console.info("RPC:", method, params, "response:", result);
            this.setConnectionError(null);
            return result;
        } catch (exn) {
            this.setConnectionError('нет связи');
            console.error("RPC failed:", method, params);
            throw exn;
        }
    }

    static async jsonrpc2(method: RPCMethod, params: any): Promise<Jsonrpc2Response> {
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
                type: "result",
                result: data.result,
            };
        }
        if (data.error && typeof data.error.code === 'number' && typeof data.error.message === 'string') {
            return {
                type: "error",
                error: data.error,
            };
        }
        throw new Error(`не удалось распарсить ответ от сервера: ${JSON.stringify(data)}`);
    }
}

export const appState = new AppState();