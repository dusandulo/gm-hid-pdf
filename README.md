# PDF Generator Frontend

This Angular application provides a user interface for generating PDF documents.

## Development

Run `npm start` to start a development server at `http://localhost:4200/`.

## GitHub Pages Deployment

The application is configured for deployment to GitHub Pages. To deploy:

1. Create a GitHub repository for your project
2. Push your code to the repository:
   ```
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/pdf-generator.git
   git push -u origin main
   ```

3. Enable GitHub Pages in your repository settings:
   - Go to your repository > Settings > Pages
   - Set the source to GitHub Actions

The GitHub workflow will automatically build and deploy your application to GitHub Pages whenever you push changes to the main branch.

## Production Configuration

Before deploying to production:

1. Update `environment.prod.ts` with your Azure backend URL
2. Update the CORS settings in your backend to allow your GitHub Pages domain
3. Update the repository URL and username in all relevant files

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
