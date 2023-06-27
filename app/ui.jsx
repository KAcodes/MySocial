export const hideOutcome = () => {
    loginOutcome.style.display = "none"
}

export const showError = (error) => {
    loginOutcome.style.display = "block";
    loginErrorMessage.innerHTML = `Error: ${error}`
    console.log(error)
    clearEmailAndPassword();
}

export const showSuccess = () => {
    loginOutcome.style.display = "block";
    loginSuccessMessage.innerHTML = "You have successfully signed up, please use these details to sign in to the app"
    clearEmailAndPassword();
}

export const clearEmailAndPassword = () => {
    txtEmail.value = "";
    txtPassword.value = ""
}

