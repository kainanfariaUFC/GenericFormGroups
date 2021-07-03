export function checkPassWord() {
    let pass = document.querySelectorAll("input[type='password']")
    if (pass.length === 0) {
        return true
    }
    if (pass && pass[0] && pass[1]) {
        if (pass[0].value !== pass[1].value) {
            injectErrorMessage(pass[0].id, "Inválido")
            injectErrorMessage(pass[1].id, "Inválido")
            return false
        }
        if (pass[0].value.length < 8) {
            injectErrorMessage(pass[0].id, "Inválido")
            injectErrorMessage(pass[1].id, "Inválido")
            return false
        } else {
            removeErrorMessage(pass[0].id)
            removeErrorMessage(pass[1].id)
            return true
        }

    }
    return false
}

export function injectErrorMessage(input, message) {
    let feedback = document.getElementById(input);
    let feedMsg = document.getElementById(`invalid-feedback-${input}`)
    if(feedback){
        feedback.classList.add('is-invalid');
    }
    if(feedMsg){
        feedMsg.classList.add('is-invalid');
        feedMsg.textContent = message;
    } 
}

export function removeErrorMessage(input) {

    let feedback = document.getElementById(input);
    let feedMsg = document.getElementById(`invalid-feedback-${input}`)
    if(feedback){
        feedback.classList.remove('is-invalid');
    }
    if(feedMsg){
        feedMsg.classList.remove('is-invalid');
        feedMsg.textContent = "";
    }
}

export function validateFromClient(event, control=null){

    if(event.value?.length > 0){
        let id = event.id.includes("mirror") ? event.id.split("-")[0] : event.id
        if(control){
            id = control;
        }
        removeErrorMessage(id)
    }
}

export function checkEmail(email, id) {
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
        injectErrorMessage(id, "Email inválido")
    } else {
        removeErrorMessage(id)
    }
}