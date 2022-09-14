# cypress-cucumber-project

- ## 💻 Previous requirements
Before using this project, you just need to have Node Js installed on your computer.
https://nodejs.org/es/download/

## 🚀 Install project dependencie
Install project dependencies with: `npm install`

## 🚀 Run tets
Open the terminal and run: `npm run cy:run`
At the end of the test, a cucumber report will be generated in the root of the project with the name of cucumber-report.html, in this you can see the results of the tests.


You can start your tests without setting any tags. And then put a `@focus` on the scenario (or scenarios) you want to focus on while development or bug fixing. Also you can skip the tests cases that you dont want to run with `@skip`

For example:
```gherkin
Feature: Sign up

    As a new user on the platform
    I want to sign up
    So I be able to log in eventually

    Background: Visit the home page
        Given I am visit the platform

    @skip
    Scenario: TC-FC-001 - Sign up for student     
        When I complete my personal information
        And I select the permissions for a student
        Then I can login with the user created

    @focus
    Scenario: TC-FC-002 - Sign up for driver training
        When I complete my personal information
        And I select the permissions for a driver training
        Then I can login with the user created
    
    @focus
    Scenario: TC-FC-003 - Sign up with user registered already
        When I complete my personal information
        And I select the permissions for a driver training
        And I intent register a new user with the same email
        Then The form shows an error message: "Ya existe una cuenta con este email"
```

# Test Cases

| Test case ID  | Description                                                               | Type         |
| ---           | ---                                                                       | ---          |
| TC-FC-001     | Sign up for student                                                       | `Positive`   |           
| TC-FC-002     | Sign up for driver training                                               | `Positive`   |
| TC-FC-003     | Sign up with user registered already                                      | `Negative`   |
| TC-FC-004     | Verify if a user cannot sign up with invalid inputs                       | `Negative`   |
| TC-FC-005     | Sign up with differents passwords: Passwords don't match                  | `Negative`   |
| TC-FC-006     | Verify if a user cannot log in with invalid password after the creation   | `Negative`   |
| TC-FC-007     | Sign up without mandatory fields (empty inputs)                           | `Negative`   |
| TC-FC-008     | Verify if the data in password field is either visible as asterisk or bullet signs.   | `Negative`   |

# Conclusiones
