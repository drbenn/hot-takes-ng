# Namecheap deployment
1. If using a subpath for url, in index.html change/update base href to \<base href="/hot-takes-ng">, otherwise, base href can remain  \<base href="/">.
2. If using subpath update angular.json build options baseHref and deployUrl as follows:
      "architect": \{
        "build": \{
          "builder": "@angular-devkit/build-angular:application",
          "options": \{
            "baseHref": "/hot-takes-ng/",
            "deployUrl": "/hot-takes-ng/",
3. Update environment.ts to use production api route
4. ng build
5. compress/archive the contents of dist/hot-takes-ng/server folder. So in root of zip there should be folders server, and also have files 3rdpartylicense and prerenderedroutes.json.
6. In namecheap, create node.js application
  - node.js version: 20.12.2
  - application mode: production
  - application root: hot-takes-ng
  - application url: danbennett.dev(dropdown)   hot-takes-ng (no '/' between dropdown and input for application url)
  - application startup file: main.js
7. Upon creating app, stop the app. Creating the app creates the folder 'hot-takes-ng' in the file manager root directory that includes a basic main.js.
8. Create main.js file, this is found at https://stackoverflow.com/questions/78210415/publishing-an-ssr-app-w-angular-17-on-a-cpanel-is-possible-right and this file points the the server.mjs file that was created with the ng build.
9. In newly created root > 'hot-takes-ng' folder, upload:
  - compressed contents of dist/hot-takes-ng folder excluding browser folder
  - main.js from root of application
  - package.json from root of application
  - ...JUST THOSE 3 FILES!!!
10. Extract the compressed dist contents
11. Compress content of build browser folder and extract in the respective public_html folder
12. Go back to node.js application, may need to go in/out of node.js cPanel area to refresh package.json availability.
13. Run Npm install in node.js web application
14. Start App - Application should now be running at https://danbennett.dev/hot-takes-ng

# Spartan UI
- Add primitive components with 'ng g @spartan-ng/cli:ui'
- Use the folder 'spartan-components'
- space selects components, enter completes command for install

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
