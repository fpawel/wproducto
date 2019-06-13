import {action, observable} from 'mobx'
import { getApiKeyValue, setApiKeyValue} from "./Def";

type Auth = { type: 'guest' } | { type: 'user', name: string, email: string }
type Modal = 'login' | null;

type ApiResponse = {
    type: "ok",
    result: any,
} | {
    type: "error",
    error: { code: number, message: string },
};


class AppState {
    @observable auth: Auth = {type: 'guest'};
    @observable apiRequestPerforming  = false;
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
    setApiRequestPerforming(f: boolean) {
        this.apiRequestPerforming = f;
    }

    @action
    setConnectionError(connectionError: string | null) {
        this.connectionError = connectionError;
        this.apiRequestPerforming = false;
    }

    async getUser() {
        let r = await this.apiGetResponse("GET", "/user", null);
        if (r.type === "error"){
            appState.setAuth({type: 'guest'});
        } else {
            appState.setAuth({type: 'user', name: r.result.name, email: r.result.email});
        }
        return r;
    }

    async putUser(arg: { name: string, pass: string, email: string }) {

        return await this.apiGetResponse("PUT", "/user",{
            name: arg.name,
            password: arg.pass,
            email: arg.email,
        });
    }

    async login(params : { name: string, password: string }){
        let r = await this.apiGetResponse("POST", "/login", params);
        if (r.type === "error") {
            appState.setAuth({type: 'guest'});
        }
        return r;
    }


    async apiGetResponse(httpMethod: string, apiPath: string,  body: any) {
        this.setApiRequestPerforming(true);

        try {
            let r = await AppState.apiGetResponse(httpMethod, apiPath, body);

            if (r.type === "error"){
                this.setConnectionError(`${r.error.code}: ${r.error.message}`);
                console.error("API request:", httpMethod, apiPath, body, "API response:", r);
            } else {
                this.setConnectionError(null);
                console.info("API request:", httpMethod, apiPath, body, "API response:", r);
            }
            return r;
        } catch (exn) {
            this.setConnectionError('нет связи');
            console.error("API request failed:", httpMethod, apiPath, body);
            throw exn;
        }
    }

    static async apiGetResponse(httpMethod: string, apiPath: string,  body: any) {
        let url = process.env.REACT_APP_API_URL;
        if (!url)
            url = '';
        url += "/api" + apiPath;

        const httpHeaderApiKey = "API-key";

        let headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");
        let apiKey = getApiKeyValue();
        if (apiKey){
            headers.append(httpHeaderApiKey, apiKey);
        }
        let init : RequestInit = {
            method: httpMethod,
            headers: headers,
            body: body ? JSON.stringify(body) : undefined,
        };

        let response = await fetch(url, init);
        let newApiKey = response.headers.get(httpHeaderApiKey);
        if (response.ok && apiKey && newApiKey) {
            setApiKeyValue(newApiKey);
        }

        let result : ApiResponse;
        if ( (httpMethod==="PUT" && response.status === 201) || response.status === 200) {
            result =  {
                type:"ok",
                result: await response.json(),
            };
            if (result.result.apiKey){
                setApiKeyValue(result.result.apiKey);
            }
            return result;
        }
        result = {
            type:"error",
            error: {
                code: response.status,
                message: response.statusText,
            },
        };
        let r = await response.json();
        if(r.message && r.code){
            result.error.code = r.code;
            result.error.message = r.message;
        }
        return result;
    }
}

export const appState = new AppState();