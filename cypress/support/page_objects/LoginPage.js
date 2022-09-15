class HomePage {

    //**********************************************************Inputs**********************************************************
        emailInput() {
            return "#e_ini"
        }
        passwordInput() {
            return "#contra"
        }
    //**********************************************************Buttons**********************************************************/
       logInButton() {
            return "#bot_ini"
       }
    //**********************************************************Assertions*******************************************************/
       bodyLogin() {
            return "#ini_ses"
       }
       errorCredentialIncorrect() {
            return ".int:contains('Email o contraseña incorrectos')"
       }
    }
    export default HomePage