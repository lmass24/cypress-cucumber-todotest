# cypress-cucumber-project

- ## 💻 Requisitos previos
Antes de usar este proyecto, solo necesita tener Node Js instalado en su computador.
https://nodejs.org/es/download/

## 🚀 Instalar el proyecto
Instale las dependencias del proyecto con: npm install

## 🚀 Ejecute la prueba
Abra la terminal y ejecute: npm run cy:run
Al finalizar la prueba se generará un reporte de cucumber en todo el root del proyecto con el nombre de cucumber-report.html, en este puede ver el resultado de las pruebas.

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
