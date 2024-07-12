# React level 2 certification

The goal is to build a small quiz maker application that creates a 5-question quiz based on a trivia API.

I decided to use tailwind for styling.

## SRC project structure

- `api/` the folder where you can find the function that fetches data from the open trivia api
- `components/` the folder that contains every component used in the project
- `data/` the folder that contains static data such as difficulties and routes
- `hooks/` the folder that contains custom hooks
- `pages/` the folder that contains all pages expect the home one which is defined by `App.tsx`
- `types/` all the object types used in the project. Component props types are defined in each component's file
- `utils/` utils functions

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Six tests are written to test the score output. You can run this command and verify these tests don't fail.
