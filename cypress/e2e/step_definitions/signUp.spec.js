import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor"
import { faker } from '@faker-js/faker';
import HomePage from "../../support/page_objects/HomePage.js"
import SignUpPage from "../../support/page_objects/SignUpPage.js"
import ActivatePage from "../../support/page_objects/ActivatePage.js"
import LoginPage from "../../support/page_objects/LoginPage.js"

const homePage = new HomePage()
const signUpPage = new SignUpPage()
const activatePage = new ActivatePage()
const loginPage = new LoginPage()
let email = ""

beforeEach(() => {
    cy.fixture('user').then((userInformation) => {
        globalThis.userInformation = userInformation
        })
    email = faker.internet.email()
})

Given('I am visit the platform', () => {
    cy.visit("/") 
    cy.get(homePage.register()).click()
})

When('I complete my personal information', () =>{
    cy.waitFor(cy.get(signUpPage.titleTextAssert()).should("have.text","Regístrate, es gratis")) //Expected condition for title's sign up page
    cy.waitFor(cy.get(signUpPage.emailInput())) //Expected condition for title's sign up page
    cy.get(signUpPage.emailInput()).type(email) // type a valid email
    cy.get(signUpPage.sendEmailTextAssert()).should("have.text","(Recibirás un email para activar tu cuenta)").and("have.css","color","rgb(234, 95, 1)") //validate the orange color in the message.
    cy.get(signUpPage.postalCodeInput()).type(userInformation.postal_code) //type a valid postal code
    cy.get(signUpPage.phoneInput()).type(userInformation.phone) //type a valid phone
    cy.get(signUpPage.selectCheckItem("En menos de 3 meses")).click()
    cy.get(signUpPage.selectCheckItem("Para desplazamientos de ocio.")).click()
})

When('I submit registration with empty fields', () =>{
    cy.waitFor(cy.get(signUpPage.titleTextAssert()).should("have.text","Regístrate, es gratis")) //Expected condition for title's sign up page
    cy.waitFor(cy.get(signUpPage.emailInput())) //Expected condition for title's sign up page
    cy.get(signUpPage.confirmRegistrationButton()).scrollIntoView().should("be.visible").and("not.be.disabled") //The button for cofirm registration is enabled
    cy.get(signUpPage.confirmRegistrationButton()).click()
})

When('I submit registration with invalid fields', () =>{
    cy.get(signUpPage.emailInput()).type("lkd555") //invalid email
    cy.get(signUpPage.postalCodeInput()).type("kb4lb") //invalid status code
    cy.get(signUpPage.phoneInput()).type("kbljbl") //invalid phone
    cy.get(signUpPage.passwordInput()).type("1s2") //invalid password
    cy.get(signUpPage.confirmRegistrationButton()).scrollIntoView().should("be.visible").and("not.be.disabled")
    cy.get(signUpPage.confirmRegistrationButton()).click()
})

And('I select the permissions for a student', () => {
    cy.get(signUpPage.permissionSelect()).select(userInformation.permission_type.student.CAP_Travellers)
    cy.get(signUpPage.selectCheckItem("Estoy matriculado en una autoescuela.")).click()
    cy.get(signUpPage.selectCheckItem("Soy un profesional de la formación vial. (Profesor, director, ...)")).should("not.be.checked") //A Student cant not be a training driver 
    cy.get(signUpPage.passwordInput()).type(Cypress.env("password")) //Read the credentials from cypress.config.js file as a environment variable
    cy.get(signUpPage.passwordRepeatInput()).type(Cypress.env("password")) //Read the credentials from cypress.config.js file as a environment variable
    cy.get(signUpPage.privacyPolicyCheck()).click()
    cy.get(signUpPage.receiveChangeInformationCheck("NO")).click()
    cy.get(signUpPage.confirmRegistrationButton()).click()
})

And('I write a password valid', () => {
    cy.get(signUpPage.passwordInput()).type(Cypress.env("password")) //Read the credentials from cypress.config.js file as a environment variable
    cy.get(signUpPage.passwordRepeatInput()).type(Cypress.env("password")) //Read the credentials from cypress.config.js file as a environment variable
})

And('I select the permissions for a driver training', () => {
    cy.get(signUpPage.selectCheckItem("Soy un profesional de la formación vial. (Profesor, director, ...)")).click()
    cy.get(signUpPage.selectCheckItem("Estoy matriculado en una autoescuela.")).should("not.be.checked") //A training driver cant not be a student
    cy.get(signUpPage.selectCheckItem("Voy por libre.")).should("not.be.checked") //A training driver cant not be a student
    cy.get(signUpPage.permissionSelect()).should("not.be.enabled") //A training driver cant not be a student
    cy.get(signUpPage.passwordInput()).type(Cypress.env("password"))
    cy.get(signUpPage.passwordRepeatInput()).type(Cypress.env("password"))
    cy.get(signUpPage.privacyPolicyCheck()).click()
    cy.get(signUpPage.receiveChangeInformationCheck("NO")).click()
    cy.get(signUpPage.confirmRegistrationButton()).click()
})

And('I intent register a new user with the same email', () => {
    cy.wait(2000) //Warning!!!: Waiting for arbitrary time periods using cy.wait() is an anti-pattern for Cypress. Read the conclusion file to understand the reason for using this timeout here.
    cy.get(homePage.register()).click()
    cy.waitFor(cy.get(signUpPage.emailInput()))
    cy.get(signUpPage.emailInput()).type(email) //Its the same email that we created with the previous user
    cy.get(signUpPage.postalCodeInput()).type(userInformation.postal_code) //Its the same information that we created with the previous user
    cy.get(signUpPage.phoneInput()).type(userInformation.phone) //Its the same information that we created with the previous user
    cy.get(signUpPage.selectCheckItem("En menos de 3 meses")).click() //Its the same information that we created with the previous user
    cy.get(signUpPage.selectCheckItem("Para desplazamientos de ocio.")).click() //Its the same information that we created with the previous user
    cy.get(signUpPage.selectCheckItem("Soy un profesional de la formación vial. (Profesor, director, ...)")).click() //Its the same information that we created with the previous user
    cy.get(signUpPage.passwordInput()).type(Cypress.env("password")) //Its the same information that we created with the previous user
    cy.get(signUpPage.passwordRepeatInput()).type(Cypress.env("password")) //Its the same information that we created with the previous user
    cy.get(signUpPage.privacyPolicyCheck()).click()
    cy.get(signUpPage.receiveChangeInformationCheck("SI")).click()
    cy.get(signUpPage.confirmRegistrationButton()).click()
})

And('In the email field the message is shown: {string}', (message) => {
    //validation for existing email
    cy.get(signUpPage.errorMessageAccountAlreadyExists()).should("have.text",message).and('be.visible')
})

And('In the password repeat field the message is shown: {string}', (message) => {
    //validation for passwords that don't match
    cy.get(signUpPage.errorMessagePasswordIncorrectRepeat()).should("have.text",message).and('be.visible')
})

And('I try to log in with a valid user and an invalid password', () => {
    //Activation page (view after registration)
    cy.waitFor(cy.get(activatePage.titleTextAssert()))
    cy.waitFor(cy.get(activatePage.identifyButton()))
    cy.get(activatePage.titleTextAssert()).should("have.text","Activa tu cuenta ahora")
    cy.get(activatePage.bodyAssert()).should('exist').and('be.visible')
    cy.get(activatePage.bodyAssert2()).should('have.text',"Te hemos enviado un mail para que actives tu cuenta.").and('be.visible')
    cy.get(activatePage.identifyButton()).click()
    //Login page
    cy.waitFor(cy.get(loginPage.bodyLogin()))
    cy.get(loginPage.bodyLogin()).should('exist').and('be.visible')
    cy.get(loginPage.emailInput()).clear().type(email) //email correct (created in previous step)
    cy.get(loginPage.passwordInput()).type("Other_pass") //password incorrect
    cy.get(loginPage.logInButton()).click()
})

And('Each required field shows an error message', () => {
    //Validation for each error message (empty fields)
    cy.get(signUpPage.emptyMessageEmail()).should("have.text","Indica tu email").and("be.visible")
    cy.get(signUpPage.emptyMessagePostalCode()).should("have.text","Indica el código postal").and("be.visible")
    cy.get(signUpPage.emptyMessagePhone()).should("have.text","Indica el teléfono").and("be.visible")
    cy.get(signUpPage.emptyMessage2Questions()).should("have.text","Debes responder las 2 preguntas").and("be.visible")
    cy.get(signUpPage.emptyMessagePermission()).should("have.text","Indica el permiso").and("be.visible")
    cy.get(signUpPage.emptyMessageGoByFree()).should("have.text","Indica si vas por libre").and("be.visible")
    cy.get(signUpPage.emptyMessagePassword()).should("have.text","Indica tu contraseña").and("be.visible")
    cy.get(signUpPage.emptyMessagePrivacyPolicy()).should("have.text","Debes aceptar nuestra política de privacidad").and("be.visible")
    cy.get(signUpPage.emptyMessageReceiveInformation()).should("have.text","Indica si deseas recibir información").and("be.visible")
})

And('Each field with invalid format shows an error message', () => {
    //Validation for each error message (invalid format)
    cy.get(signUpPage.errorMessageEmail()).should("have.text","El formato del email es incorrecto").and("be.visible")
    cy.get(signUpPage.errorMessagePostalCode()).should("have.text","Este código postal no existe").and("be.visible")
    cy.get(signUpPage.errorMessagePhone()).should("have.text","Teléfono incorrecto").and("be.visible")
    cy.get(signUpPage.errorMessagePassword()).should("have.text","La contraseña debe tener entre 4 y 15 caracteres").and("be.visible")
})

And('I select the permissions for a driver training with diferents passwords:', (table) => {
    //We read from gherkin table in .featrue file
    table.hashes().forEach((row) => {
        globalThis.password1 = row.password1
        globalThis.password2 = row.password2
    })
    cy.get(signUpPage.permissionSelect()).select(userInformation.permission_type.student.CAP_Travellers)
    cy.get(signUpPage.selectCheckItem("Estoy matriculado en una autoescuela.")).click()
    cy.get(signUpPage.passwordInput()).type(password1) //password
    cy.get(signUpPage.passwordRepeatInput()).type(password2) //invalid password repeat (dont match)
    cy.get(signUpPage.privacyPolicyCheck()).click()
    cy.get(signUpPage.receiveChangeInformationCheck("NO")).click()
    cy.get(signUpPage.confirmRegistrationButton()).click()
})

Then('I can login with the user created', ()=> {
    //Activation page (view after registration)
    cy.waitFor(cy.get(activatePage.titleTextAssert()))
    cy.waitFor(cy.get(activatePage.identifyButton()))
    cy.get(activatePage.titleTextAssert()).should("have.text","Activa tu cuenta ahora")
    cy.get(activatePage.bodyAssert()).should('exist').and('be.visible')
    cy.get(activatePage.bodyAssert2()).should('have.text',"Te hemos enviado un mail para que actives tu cuenta.").and('be.visible')
    cy.get(activatePage.identifyButton()).click()
    //Login page
    cy.waitFor(cy.get(loginPage.bodyLogin()))
    cy.get(loginPage.bodyLogin()).should('exist').and('be.visible')
    cy.get(loginPage.emailInput()).type(email)
    cy.get(loginPage.passwordInput()).type(Cypress.env("password"))
    cy.get(loginPage.logInButton()).click()
    //Activation page (view after login)
    cy.waitFor(cy.get(activatePage.titleTextAssert()))
    cy.waitFor(cy.get(activatePage.identifyButton()))
    cy.get(activatePage.titleTextAssert()).should("have.text","Activa tu cuenta ahora")
})

Then('The form shows an error message: {string}', (message)=> {
    //validation for error message in confirmation button
    cy.get(signUpPage.errorMessageCheckTheForm()).should("have.text",message).and('be.visible')
})

Then('I cant login with the user created', ()=> {
    //validation for login with incorrect password 
    cy.get(loginPage.errorCredentialIncorrect()).should("have.text","Email o contraseña incorrectos").and('be.visible')
})

Then('I see that the password field is visible as asterisk', ()=> {
    //validation for password field format
    cy.get(signUpPage.passwordInput())
        .invoke('attr', 'type')
        .should('eq', 'password')
})

