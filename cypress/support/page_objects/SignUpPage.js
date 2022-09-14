class SignUpPage {

    //**********************************************************Inputs**********************************************************
        emailInput() {
            return "#email"
        }
        postalCodeInput() {
            return "#cp"
        }
        phoneInput() {
            return "#tel"
        }
        passwordInput() {
            return "#contra"
        }
        passwordRepeatInput() {
            return "#contrarep"
        }
    //**********************************************************Select*********************************************************/
        permissionSelect() {
            return "#perm"
        }   

    //**********************************************************checks**********************************************************/
        selectCheckItem(option) {
            return ".spr:contains('"+option+"')"
        }
        privacyPolicyCheck() {
            return ".spr:contains('acepto las condiciones')"
        }
        receiveChangeInformationCheck(confirmation) {
            if (confirmation=="SI") {
                return "label[for='pubon_si']"
            }
            else {
                return "label[for='pubon_no']"
            }
        }
    //**********************************************************Asserts**********************************************************/
        sendEmailTextAssert() {
            return ".fset_email > span"
        }
        errorMessageCheckTheForm() {
            return ".int:contains('Revisa el formulario, existen errores')"
        }
        errorMessageAccountAlreadyExists(message) {
            return ".int:contains('"+message+"')"
        }
    //**********************************************************Buttons***********************************************************/
        confirmRegistrationButton() {
            return "#bot_reg"
        }

        
    }
    export default SignUpPage