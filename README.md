# Scaffold.IO
The VueJS + Tailwind.CSS starter kit for SPA projects.

## Project setup
- Run `npm install` to download and install Javascript dependencies
- Run `npm run build:css` to initialize Tailwind's CSS configuration. Run this command everytime you make changes to tailwind.config
- Create a `.env.development.local` from the `.env` file. Point the `VUE_APP_API_URL` variable to your local or remote API server

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
- npm run build


### Lints and fixes files
```
npm run lint
```

### Upload to S3
- Run `npm run build`
- Upload all the files inside the `dist` folder. Do not include the `dist` folder itself
- On S3's static web hosting mode, set the both the Index and Error documents to `index.html`

### Style Guide Ver 0.1
- Favor single quotes over double quotes
- Use `async await` syntax for asynchronous functions and methods
- Don't use semicolons
- Use a 2-space indention style
- Use the ES6 convention for writing functions (arrow functions)
- Use the ES6 convention for declaring variables (`let, const`)
- Use Vuex (`src/store/`) for abstracting functions in components
- Delete unused code blocks -- do not comment them out.
- Use `hypenated lower-case` with an `app` prefix for custom-made components
- Favor `router-links` over anchor tags (`<a href>`). Use route names instead of paths
- Always add an `id` attribute to user intractable HTML elements
- No trailing commas


### Authors
- Felix Regencia
- Jego Carlo Ramos
