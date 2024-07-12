# CoasterKing

![Preview-Screens](https://github.com/g-rmc/CoasterKing/blob/main/assets/CoasterKing.gif)

## About this Project

The **CoasterKing** is an app for those who love theme parks and want a better way to register their roller-coaster rides than their memories or written in note blocks. It is designed to have an easy interface to register user credits.

## Features

- Login screen:

  - Firebase;

- General:
  
  - Change theme button;
  - Logout when click in profile's picture

- Main screen:

  - Counter with coasters rided;
  - Global ranking of users;

- Coasters screen:

  - List with all coaster registered;
  - Number of riders and avalitons for each coaster;
  - Clickable image to link with [RCdb](https://rcdb.com/) page;

- MyList screen:

  - List of all coasters selected in Coasters screen;
  - Evaluate each coaster with 1 to 5 stars;
  - Favorite button;

## Tecnologies

- JavaScript
- Front-end
  - React.js
  - Styled Components
- Back-end
  - Node.js
  - TypeScript
  - Prisma ORM
  - PostgreSQL
  - Jest
- Docker
- AWS

## Feedbacks?

This project is part of my portfolio, I've worked with several features and some of them was my first time working with. So, any feedback will be greatly appreciated.

E-mail: g.rmc3000@gmail.com
Or contact me in [LinkedIn](https://www.linkedin.com/in/guilherme-rmc/)

## Getting Started

This project works with [Docker Container](https://www.docker.com/resources/what-container/)!

- Cloning the Repository:

```bash
git clone https://github.com/g-rmc/CoasterKing.git
```

- Create ```.env``` _(front-end)_ and ```.env.production``` _(back-end)_ based on ```.env.example```

- The app works with [Google Firebase](https://firebase.google.com/) for user login, create a auth project in firebase and include the keys in ```.env``` _(front-end)_

- Run the docker containers:

```bash
docker-compose up --build
```

- Connect to the application front-end in browser with ```http://localhost:PORT/```
