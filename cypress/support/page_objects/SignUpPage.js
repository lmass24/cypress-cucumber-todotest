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
        errorMessageAccountAlreadyExists() {
            return ".int:contains('Ya existe una cuenta con este email')"
        }
        emptyMessageEmail() {
            return ".int:contains('Indica tu email')"
        }
        emptyMessagePostalCode() {
            return ".int:contains('Indica el código postal')"
        }
        emptyMessagePhone() {
            return ".int:contains('Indica el teléfono')"
        }
        emptyMessage2Questions() {
            return ".int:contains('Debes responder las 2 preguntas')"
        }
        emptyMessagePermission() {
            return ".int:contains('Indica el permiso')"
        }
        emptyMessageGoByFree() {
            return ".int:contains('Indica si vas por libre')"
        }
        emptyMessagePassword() {
            return ".int:contains('Indica tu contraseña')"
        }
        emptyMessagePrivacyPolicy() {
            return ".int:contains('Debes aceptar nuestra política de privacidad')"
        }
        emptyMessageReceiveInformation() {
            return ".int:contains('Indica si deseas recibir información')"
        }
    //**********************************************************Buttons***********************************************************/
        confirmRegistrationButton() {
            return "#bot_reg"
        }

        
    }
    export default SignUpPage