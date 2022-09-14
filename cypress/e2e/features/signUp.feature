Feature: Sign up

    As a new user on the platform
    I want to sign up
    So I be able to log in eventually

    Background: Visit the home page
        Given I am visit the platform

    @test @positive @functional
    Scenario: TC-FC-001 - Sign up for student     
        When I complete my personal information
        And I select the permissions for a student
        Then I can login with the user created

    @test @positive @functional
    Scenario: TC-FC-002 - Sign up for driver training
        When I complete my personal information
        And I select the permissions for a driver training
        Then I can login with the user created
    
    @test @negative @functional
    Scenario: TC-FC-003 - Sign up with user registered already
        When I complete my personal information
        And I select the permissions for a driver training
        And I intent register a new user with the same email
        Then The form shows an error message: "Revisa el formulario, existen errores"
            * In the email field the message is shown: "Ya existe una cuenta con este email"

    @test @negative @functional
    Scenario: TC-FC-004 - Sign up without mandatory fields (empty inputs) 
        When I submit registration with empty fields
        Then The form shows an error message: "Revisa el formulario, existen errores"
        And Each required field shows an error message

    @test @negative @functional
    Scenario: TC-FC-005 - Verify if a user cannot sign up with invalid inputs
        When I submit registration with invalid fields
        Then The form shows an error message: "Revisa el formulario, existen errores"
        And Each field with invalid format shows an error message

    @test @negative @functional
    Scenario: TC-FC-006 - Verify if a user cannot sign up with differents passwords: Passwords don't match
        When I complete my personal information
        And I select the permissions for a driver training with diferents passwords: 
            | password1           | password2               |
            | Test_2022#          | Test_2023#              |
        Then The form shows an error message: "Revisa el formulario, existen errores"
            * In the password repeat field the message is shown: "Repetición de contraseña incorrecta"

    @test @negative @functional
    Scenario: TC-FC-007 - Verify if a user cannot log in with invalid password after the creation     
        When I complete my personal information
        And I select the permissions for a student
        And I try to log in with a valid user and an invalid password
        Then I cant login with the user created

    @test @omit @functional
    Scenario: TC-FC-008 - Verify if the data in password field is visible as asterisk    
        When I complete my personal information
        And I write a password valid
        Then I see that the password field is visible as asterisk

        
            


        