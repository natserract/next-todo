## Tools Used
This project using various tools
- [TypeScript](https://www.typescriptlang.org/docs/),
- [React](https://reactjs.org/docs/getting-started.html),
- [Redux](https://redux.js.org/),
- [Redux Persist](https://github.com/rt2zz/redux-persist)

## Overview
Whenever you reload your app, the javascript process has nothing in memory. You will have to re-initialize state, and maybe set some basic state based on the url (if you are in a browser). Though usually this is what you want but there are many use cases where you might want to persist your redux state even when you reload your browser window.

This idea of persisting state across refresh in web applications that use redux for global state management can be achieved using the redux-persist npm package.

The complete redux-store or some specific part of it can be persisted in the browser localstorage easily!

A very common use case for implementing redux-persist in 2020 is:
> Offline First. Many users may not have stable internet connection. Persistence is the first step of offline support.

## Getting Started
Create .env file for application environments

**Do not commit `.env` to version control!**

## Running
### Client

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5000](http://localhost:5000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

### Server

Clone this repository and start in your local 
- [Countries GraphQL API](https://github.com/trevorblades/countries),
- [Modern GraphQL API](https://github.com/ian13456/modern-graphql-tutorial)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
