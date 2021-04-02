# Hello Stranger! It is a RESTful API for recipes.back.
*show.recipes.back*

## Intro
- Tools: express.js, sequelize, RESTfull API
- Demo: https://show-recipes-back.herokuapp.com/

## Install
```bash
npm i
```

## Run
- dev
    ```bash
    npm run dev
    ```
- prod
    ```bash
    npm run start
    ```

## API endpoints
- '/' - main page
- '/api/recipes':
    - 'get': *json* get all recipes
    - 'post': *jspn* add new recipe
- '/api/recipes/:id':
    - 'get': *json* get one recipe by id
    - 'put': *jspn* edit new recipe by id
    - 'delete': *jspn* delete recipe by id