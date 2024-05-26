# Namecheap deployment
1. If using a subpath for url, in index.html change/update base href to \<base href="https://danbennett.dev/angular-ssr-boilerplate">, otherwise, base href can remain  \<base href="/">.
2. ng build
3. compress/archive the contents of dist/angular-ssr-boilerplate folder. So in root of zip there should be folders browser and server, and also have files 3rdpartylicense and prerenderedroutes.json.
4. In namecheap, create node.js application
  - node.js version: 20.12.2
  - application mode: production
  - application root: angular-ssr-boilerplate
  - application url: danbennett.dev(dropdown)   angular-ssr-boilerplate (no '/' between dropdown and input for application url)
  - application startup file: main.js
5. Upon creating app, stop the app. Creating the app creates the folder 'angular-ssr-boilerplate' in the file manager root directory that includes a basic main.js.
6. In newly created root > 'angular-ssr-boilerplate' folder, upload:
  - compressed contents of dist/angular-ssr-boilerplate folder
  - main.js from root of application
  - package.json from root of application
  - ...JUST THOSE 3 FILES!!!
7. Extract the compressed dist contents
8. Go back to node.js application, may need to go in/out of node.js cPanel area to refresh package.json availability.
9. Run Npm install in node.js web application
10. Start App - Application should now be running at https://danbennett.dev/angular-ssr-boilerplate

# Ui

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.1.

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

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
