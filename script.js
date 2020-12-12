let Validator = {
    handleSubmit:(event)=>{
        event.preventDefault();
        let send = true;
        let inputs = form.querySelectorAll('input');
        Validator.clearErrors();
        for(let i=0;i<inputs.length;i++) {
            let input = inputs[i];
            let check = Validator.checkInput(input);
            if(check !== true) {
                send = false;
                Validator.showError(input, check)
            }
        }

        if(send) {
            form.submit();
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');
        if(rules !== null) {
            rules = rules.split('|');
            for(let k in rules) {
                let rDetails = rules[k].split('=');
                let regex = '';
                switch(rDetails[0]) {
                    case 'required':
                        if(input.value == '') {
                            return 'Campo não pode ser vazio';
                        }
                    break;
                    case 'min':
                        if (input.value.length < rDetails[1]) {
                            return 'Campo deve ter pelo menos '+rDetails[1]+' caracteres';
                        }
                    break;
                    case 'email':
                        regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        if(!regex.test(input.value.toLowerCase())) {
                            return 'E-mail digitado não é válido!';
                        }
                    break;
                    case 'pass':
                        regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/;
                        if(!regex.test(input.value.toLowerCase())) {
                            return 'Senha deve conter números e letras!';
                        }
                    break;

                }
            }
        }
        return true;
    },
    showError:(input, error) => {
        input.style.border = '2px solid #FF0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        //objeto,voltar para label,inserir depois de label(div, proximo elemento depois de input)
        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearErrors:() => {
        let inputs = form.querySelectorAll('input');
        for(let i=0;i<inputs.length;i++) {
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for(let i=0;i<errorElements.length;i++) {
            errorElements[i].remove();
        }
    }
};

let form = document.querySelector('.validator');
form.addEventListener('submit', Validator.handleSubmit);