import {RequestProcessor} from "../form/RequestProcessor";

const LOGIN_API_URL = "user/login"

const submitButton = document.getElementById('submit_button') as HTMLButtonElement;
const username = document.getElementById('username') as HTMLInputElement;
const password = document.getElementById('password') as HTMLInputElement;

submitButton.onclick = submitLogin;

function submitLogin() {
    const formData = new FormData();
    formData.append("username", username.value);
    formData.append("password", password.value);
    RequestProcessor.makeRequest(LOGIN_API_URL, "POST", formData)
        .then(response => {
                if (response.ok) {
                    window.location.replace("index.jsp")
                } else {
                    response.text().then(text => console.error("Failed to login: " + text)
                    )
                }
            }
        );
}