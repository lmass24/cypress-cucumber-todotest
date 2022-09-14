class ActivatePage {

    //**********************************************************Asserts**********************************************************/
        titleTextAssert() {
            return ".tit"
        }
        bodyAssert() {
            return "#cos > .cont"
        }
        bodyAssert2() {
            return ".regok > :nth-child(2)"
        }
    //**********************************************************Buttons***********************************************************/
        identifyButton() {
            return "#bot_regok"
        }

        
    }
    export default ActivatePage