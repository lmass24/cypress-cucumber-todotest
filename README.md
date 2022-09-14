# cypress-cucumber-project

## 💻 Requisitos previos
Antes de usar este proyecto, solo necesita tener Node Js instalado en su computador.
https://nodejs.org/es/download/

## 🚀 Instalar el proyecto
Instale las dependencias del proyecto con: `npm install`

## 🚀 Correr pruebas
Abra la terminal y ejecute: `npm run cy:run`
Al finalizar la prueba se generará un reporte de cucumber en todo el root del proyecto con el nombre de cucumber-report.html, en este puede ver el resultado de las pruebas.

Puede comenzar sus pruebas sin configurar ningun tag o puede poner `@focus` en el escenario (o escenarios) en los que desea enfocarse durante el desarrollo o la corrección de errores. También puede omitir los casos de prueba que no desea ejecutar con `@skip`.

Ejemplo:
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
```
Si se desea ejecutar un determinado tag: npx cypress run --env TAGS="@test"
Si se desea ejecutar todos los test menos los que tengan determinado tag: npx cypress run --env TAGS="not @test"
Si se desea ejecutar combinaciones de tags con condicionales AND/OR: npx cypress run --env TAGS="@positive or @negative and not @omit"
```

## Librerías y herramientas
- Cypress 10.6.0.
- Node js (v16.17.0)
- Cucumber. Plugin para implementar BDD y escribir escenarios de prueba en formato GHERKIN.
- Patrón de diseño de pruebas: Page Object Model (POM).
- Uso de tags para agrupar tests.
- Reporte: reporte generado por cucumber.
- Faker: librería para generar data de prueba (en este caso para crear emails de prueba).

# 💡 Casos de prueba

| Test case ID  | Description                                                                           | Type         |
| ---           | ---                                                                                   | ---          |
| TC-FC-001     | Sign up for student                                                                   | `Positive`   |           
| TC-FC-002     | Sign up for driver training                                                           | `Positive`   |
| TC-FC-003     | Verify if a user cannot sign up with user registered already                          | `Negative`   |
| TC-FC-004     | Verify if a user cannot sign up without mandatory fields (empty inputs)               | `Negative`   |
| TC-FC-005     | Verify if a user cannot sign up with invalid inputs                                   | `Negative`   |
| TC-FC-006     | Verify if a user cannot sign up with differents passwords: Passwords don't match      | `Negative`   |
| TC-FC-007     | Verify if a user cannot log in with invalid password after the creation               | `Negative`   |
| TC-FC-008     | Verify if the data in password field is either visible as asterisk or bullet signs    | `Positive`   |

# Conclusiones

Plugins, herramientas y algunas buenas prácticas: 
- Uso de cucumber: Cypress ya viene con una estructura tipo “Gherkin” (con los describe y los it) por lo que considero que no es necesario el uso de cucumber y le añade una capa más de complejidad. Sin embargo agregué este plugin (cypress-cucumber-preprocessor) por los requerimientos de la prueba, de igual manera el uso de este plugin facilita la exportación de los escenarios de prueba (archivos .feature) a los gestores de casos de prueba y si el equipo de testing está en constante comunicación con la parte de producto y las regresiones son de interés para áreas ajenas a las de QA, esta puede ser una herramienta muy valiosa, de lo contrario no la recomendaría.
- Reporte: Aprovechando el uso del plugin de cucumber (cypress-cucumber-preprocessor) este entrega un reporte con la descripción de los casos en formato “Gherkin” y muestra un pantallazo en caso de errores. Otras alternativas pueden ser herramientas de reporting como Allure o mochawesome.
- Uso de patrón de diseño: Page Object Model. Cypress recomienda otros patrones de diseño muy propios de el, sin embargo, considero que POM sigue siendo la mejor opción por su mantenimiento.
- Agregar múltiples asserts (validaciones) en cada caso de prueba, esto para hacer nuestras pruebas mucho más robustas. Debemos evitar en la medida de lo posible lo que Cypress denomina como los “tiny” tests donde solamente se tiene un solo assert por caso de prueba. No vamos a tener consecuencias en cuanto al performance de nuestro código porque las pruebas se ejecutan realmente rápido.
- Validaciones desacopladas del modelado de la página (en la clase step definitions).
- Casos de prueba 100 % independientes. Para cada uno de los escenarios se decició hacerlos 100% independientes uno de otro. De esta manera se podrán ejecutar de manera paralela o agruparlos en caso de que se quieran orquestar en un pipeline de integración continua.
- Timeouts:
    En esta página la mayoría de los elementos se renderizan por completo lo que hace que las pruebas no sean complejas, sin embargo existían casos especificos en donde los elementos no se renderizaban por completo y cypress no los encuentraba bajo ningun tipo de contexto, por lo que se hizo uso de estrategias no tan bien vistas como los tiempos de espera ramdoms (cy.waits). Por precaución también se instaló la librería cypress-waitfor que lo que hace es esperar a que X elemento exista y sea visible para proceder con los siguientes pasos del tests.
    NOTA: Cypress recomienda es interceptar la ruta de dominio en el que estamos trabajando, ponerle un determinado alias y que espere a que esas rutas o peticiones esten resueltas, esta estrategia funciona muy bien sobre todo al momento de emplear alguna regresión y queremos agregar robustés, sin embargo, no soluciona el problema de la renderización que comenté anteriormente. De igual manera por la facilidad de las pruebas para este caso no fué necesario hacer uso de esta estrategia de espera. 
- Selectores:
    Se decidió tomar los selectores CSS para localizar los elementos en el DOM y en la mayoría de los casos se optó por construir manualmente los selectores para hacerlos mas robusto ante algun cambio en el front de la página. En este caso no se consideró necesario el uso de XPATHs ya que la construcción de los selectores se hizo de manera sencilla y muchos elementos tenían ids únicos.
- Se diseñaron los escenarios de prueba en formato tipo GHERKIN tratando de que estos fueran lo más genéricos posibles, representando comportamientos y reglas de negocio (como lo sugiere la metodología BDD) y no tanto escenarios con pasos técnicos y detallados como se harían en las metodologías de tradicionales. Sin embargo, en algunos casos se violaron estas "reglas" para demostrar el funcionamiento de algunas funcionalidades puntuales como el uso de las tablas o los valores de entrada leídos desde el .feature desde la clase step definitions. En conclusión, los escenarios pueden ser muchos mas genéricos todavía. 
- Los datos de prueba de mayor relevancia se almacenaron mediante la funcionalidad de los fixtures que tiene cypress que es un archivo json desde donde se consumen dichos datos de prueba. Para los datos mas confidenciales con las credenciales y contraseñas para los nuevos usuarios se almacenaron como variables de entorno en el archivo cypress.config.js. 

## Errores o mejoras en la aplicación:

- La funcionalidad de activación de la cuenta por medio del correo funciona, pero si se deja pasar las 24 horas que se indica en la página para hacer el proceso de activación, todavía funciona dicha activación.
- Si bien se validó el formato de los valores de entrada (alfanuméricos, numéricos, letras, etc), en algunos casos el mensaje que se muestra de error no da mucho contexto de cual es el formato adecuado, aunque por intuición ya se sabe cual es el error o formato correcto para determinado campo (correo, celular, código postal, etc) en escenarios mas complejos si es necesario que el mensaje de un diagnóstico mas detallado, por ejemplo: para el teléfono cuando se tiene un formato incorrecto que se muestre el mensaje `solo se aceptan valores numéricos` en vez del que se muestra actualmente sin mucho contexto: `Teléfono incorrecto`.
- Límite de caracteres o dígitos permitidos. Si bien los campos tienen esta validación ya incluída, se deberían mostrar mensajes que indiquen los límites o caracteres máximos permitidos (como en el caso de la contraseña). NOTA: este mensaje se mostraría solo en caso de error.
- Hay algunas validaciones que en el navegador funcionan pero ingresando desde el celular no, como por ejemplo: el código postal en el navegador solo permite un máximo de 5 caracteres, en el celular no existe esta restricción (aunque al momento de confirmarlo se muestra mensaje indicando el error).
- En la consola del navegador constantemente se están imprimiendo mensajes de advertencia y de error. Estos últimos interfieren en la ejecución de las pruebas. Lo que cypress recomendó fué desactivar los eventos que generan las `uncaught:Exception` las cuales son excepciones no detectadas de la aplicación como tal y no de cypress, y hacen que cuando Cypress las detecte, las pruebas fallen automáticamente. El problema se solucionó (almenos para la ejecución de las pruebas), sin embargo es algo que se debe solucionar desde la raíz del problema con el equipo de desarrollo de la aplicación.


## Tareas por hacer:

- Eventualmente cuando las pruebas sean mas complegas o se prueben otro tipo de funciones, se requerirá generar datos de prueba, las cuales emplearía para su creación, técnicas ajenas a la UI, como por ejemplo: inyectar querys directamente a la base de datos para preparar nuestro ambiente o incluso para borrar colecciones o registros creados en la misma prueba.
- Emplear alguna herramienta de continuos testing para orquestar nuestras automatizaciones como Jenkins, Gitlab-ci, Github actions, Circle, etc. Por la facilidad de su implementación. documentación y el hecho de que es open source empezaría haciendo uso de Jenkins.
- Mejorar el tema de reportes, para este caso no vi necesario agregar alguna librería de reporting sin embargo recomiendo algunas como Allure y mochawesome sobretodo al momento de implmenetar CI/CD.
- Para hacer que los selectores sean mucho mas robustos se puede agregar el atributo data-cy en la etiquetas html los cuales solo serán usados para las pruebas. Esto es una buena práctica para cypress y disminuye la dificultad para llevar desarrollar las pruebas.
    https://docs.cypress.io/guides/references/best-practices 
    


