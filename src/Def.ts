const localStorageAppKey = "wproducto.token";


export function getApiKeyValue(){
    return localStorage.getItem(localStorageAppKey);
}

export function setApiKeyValue(value:string){
    return localStorage.setItem(localStorageAppKey, value);
}

export function clearApiKeyValue(){
    return localStorage.removeItem(localStorageAppKey);
}
