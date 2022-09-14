Feature: Sign up

    As a new user on the platform
    I want to sign up
    So I be able to log in eventually

    Background: Visit the home page
        Given I am visit the platform

   
    Scenario: TC-FC-001 - Sign up for student     
        When I complete my personal information
        And I select the permissions for a student
        Then I can login with the user created

    
    Scenario: TC-FC-002 - Sign up for driver training
        When I complete my personal information
        And I select the permissions for a driver training
        Then I can login with the user created
    
    
    Scenario: TC-FC-003 - Sign up with user registered already
        When I complete my personal information
        And I select the permissions for a driver training
        And I intent register a new user with the same email
        Then The form shows an error message: "Revisa el formulario, existen errores"
            * In the email field the message is shown: "Ya existe una cuenta con este email"

    @focus
    Scenario: TC-FC-004 - Sign up without mandatory fields (empty inputs) 
        When I submit registration with empty fields
        Then The form shows an error message: "Revisa el formulario, existen errores"
        And Each required field shows an error message


        
            


        