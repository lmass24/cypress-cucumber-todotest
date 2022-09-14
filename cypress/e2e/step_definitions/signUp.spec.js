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
    email = faker.internet.email();
    cy.visit("/")  
})

Given('I am visit the platform', () => {
    cy.get(homePage.register()).click()
})

When('I complete my personal information', () =>{
    cy.waitFor(cy.get(signUpPage.emailInput()))
    cy.get(signUpPage.emailInput()).type(email)
    cy.get(signUpPage.sendEmailTextAssert()).should("have.text","(Recibirás un email para activar tu cuenta)").and("have.css","color","rgb(234, 95, 1)") //validate the orange color in the message.
    cy.get(signUpPage.postalCodeInput()).type(userInformation.postal_code)
    cy.get(signUpPage.phoneInput()).type(userInformation.phone)
    cy.get(signUpPage.selectCheckItem("En menos de 3 meses")).click()
    cy.get(signUpPage.selectCheckItem("Para desplazamientos de ocio.")).click()
})

And('I select the permissions for a student', () => {
    cy.get(signUpPage.permissionSelect()).select(userInformation.permission_type.student.CAP_Travellers)
    cy.get(signUpPage.selectCheckItem("Estoy matriculado en una autoescuela.")).click()
    cy.get(signUpPage.passwordInput()).type(Cypress.env("password"))
    cy.get(signUpPage.passwordRepeatInput()).type(Cypress.env("password"))
    cy.get(signUpPage.privacyPolicyCheck()).click()
    cy.get(signUpPage.receiveChangeInformationCheck("NO")).click()
    cy.get(signUpPage.confirmRegistrationButton()).click()
})

And('I select the permissions for a driver training', () => {
    cy.get(signUpPage.selectCheckItem("Soy un profesional de la formación vial. (Profesor, director, ...)")).click()
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
    cy.get(signUpPage.emailInput()).clear().type(email)
    cy.get(signUpPage.sendEmailTextAssert()).should("have.text","(Recibirás un email para activar tu cuenta)").and("have.css","color","rgb(234, 95, 1)") //validate the orange color in the message.
    cy.get(signUpPage.postalCodeInput()).type(userInformation.postal_code)
    cy.get(signUpPage.phoneInput()).type(userInformation.phone)
    cy.get(signUpPage.selectCheckItem("En menos de 3 meses")).click()
    cy.get(signUpPage.selectCheckItem("Para desplazamientos de ocio.")).click()
    cy.get(signUpPage.selectCheckItem("Soy un profesional de la formación vial. (Profesor, director, ...)")).click()
    cy.get(signUpPage.passwordInput()).type(Cypress.env("password"))
    cy.get(signUpPage.passwordRepeatInput()).type(Cypress.env("password"))
    cy.get(signUpPage.privacyPolicyCheck()).click()
    cy.get(signUpPage.receiveChangeInformationCheck("NO")).click()
    cy.get(signUpPage.confirmRegistrationButton()).click()
})

Then('I can login with the user created', ()=> {
    cy.waitFor(cy.get(activatePage.titleTextAssert()))
    cy.waitFor(cy.get(activatePage.identifyButton()))
    cy.get(activatePage.titleTextAssert()).should("have.text","Activa tu cuenta ahora")
    cy.get(activatePage.bodyAssert()).should('exist').and('be.visible')
    cy.get(activatePage.bodyAssert2()).should('have.text',"Te hemos enviado un mail para que actives tu cuenta.").and('be.visible')
    cy.get(activatePage.identifyButton()).click()

    cy.waitFor(cy.get(loginPage.bodyLogin()))
    cy.get(loginPage.bodyLogin()).should('exist').and('be.visible')
    cy.get(loginPage.emailInput()).type(email)
    cy.get(loginPage.passwordInput()).type(Cypress.env("password"))
    cy.get(loginPage.logInButton()).click()

    cy.waitFor(cy.get(activatePage.titleTextAssert()))
    cy.waitFor(cy.get(activatePage.identifyButton()))
    cy.get(activatePage.titleTextAssert()).should("have.text","Activa tu cuenta ahora")
})

Then('The form shows an error message: {string}', (message)=> {
    cy.get(signUpPage.errorMessageCheckTheForm()).should("have.text","Revisa el formulario, existen errores").and('be.visible')
    cy.get(signUpPage.errorMessageAccountAlreadyExists(message)).should("have.text","Ya existe una cuenta con este email").and('be.visible')
})