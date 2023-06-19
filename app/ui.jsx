export const hideError = () => {
    loginError.style.display = "none"
}

export const showError = (error) => {
    loginError.style.display = "block";
    loginErrorMessage.innerHTML = `Error: ${error.message}`
}

export const hideSuccess = () => {
    loginError.style.display = "none"
}

export const showSuccess = () => {
    loginSuccess.style.display = "block";
    loginSuccessMessage.innerHTML = "You have successfully signed up, please use these details to sign in to the app"
    clearEmailAndPassword();
}

export const clearEmailAndPassword = () => {
    txtEmail.value = "";
    txtPassword.value = ""
}

