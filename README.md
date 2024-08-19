# OxioDashboard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Architectural overview
Two Modules:
Dashboard Module: Consist of the dashboard feature that displays a list of users, the ability to add a user and view a user's utility data
Shared Module: Consist of the building components needed to build functionality for a feature. Table, Modal, Chart, User Data Service

## Implementation Notes
User's List is pulling users from https://jsonplaceholder.typicode.com/users API.
The list of users is modified to include mocked utility usages of Gas, Electricity and Energy for the last 6 months for each user in the list.
When a new user is added, mocked utility usage is added to the user object.
Can view the users usage data by clicking on the name or username of the user from the User's List table. 


## Design Choices
Decided to use NG Prime 
Using NG Prime library to build the Chart component because it provided the following benefits:

Comprehensive and Customizable Charts: NG Prime provides a wide range of chart types (e.g., bar, line, pie, radar) that are highly customizable. This allows developers to easily adapt the visual presentation to fit specific needs, such as custom tooltips, labels, and colors, making it ideal for various data visualization requirements.

Seamless Integration and Easy Implementation: PrimeNG charts are built on top of the popular Chart.js library, which means they are well-integrated into Angular applications. They come with straightforward Angular components, reducing the complexity of integrating charts into your project. This simplifies the process of adding advanced data visualization without needing extensive configuration.

Responsive and Mobile-Friendly Design: PrimeNG charts are designed to be responsive out of the box, ensuring that they adapt well to different screen sizes and devices. This is particularly important for applications that need to provide a consistent user experience across desktop and mobile platforms, without requiring additional work for mobile optimization.
