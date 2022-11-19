import {RequestProcessor} from "../form/RequestProcessor";
import {ApiPaths} from "../api/ApiPaths";
import {NetworkUtil} from "../util/NetworkUtil";

const loginButton = document.getElementById('login-button') as HTMLButtonElement;
const registerButton = document.getElementById('register-button') as HTMLButtonElement;
const username = document.getElementById('username') as HTMLInputElement;
const password = document.getElementById('password') as HTMLInputElement;
const messageBox = document.getElementById('message-box') as HTMLParagraphElement;

loginButton.onclick = () => authenticate(ApiPaths.LOGIN);
registerButton.onclick = () => authenticate(ApiPaths.REGISTER);

function authenticate(path: ApiPaths) {
    const data = JSON.stringify({"username": username.value, "password": password.value})
    RequestProcessor.makeRequest(path.toString(), "POST", data)
        .then(NetworkUtil.throwIfNotOk)
        .then(response => {
                response.text().then(payload => JSON.parse(payload))
                    .then(jsonPayload => {
                        if (jsonPayload.isError) {
                            fillMessageBox(jsonPayload.message);
                        } else {
                            window.location.replace("index.jsp")
                        }
                    })
            }
        ).catch(() => fillMessageBox("Invalid login or password")
    );
}

function fillMessageBox(message: string) {
    messageBox.innerText = message;
}