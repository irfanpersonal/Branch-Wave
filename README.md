# Branch Wave (SERN)

Welcome to Branch Wave, your all-in-one solution for organizing and sharing your important links seamlessly. Whether you're a content creator, entrepreneur, or simply looking to streamline your online presence, Branch Wave has you covered.

## Technologies Used

- [TypeScript](https://www.typescriptlang.org/): A powerful and flexible superset of JavaScript, bringing static typing to your projects.
- [Sequelize](https://sequelize.org/): A powerful and flexible Node.js ORM for SQL databases.
- [Express](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js.
- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [Node.js](https://nodejs.org/): JavaScript runtime built on Chrome's V8 JavaScript engine.
- [MySQL](https://www.mysql.com/): An open-source relational database management system.

## Setup Instructions

1st - Download the project

2nd - Run the following command "npm install" (install dependencies)

3rd - Now create a .env file in the root of your entire project with the following key value pairs: MYSQL_USER, MYSQL_USER_PASSWORD, JWT_SECRET, JWT_LIFETIME, CLOUD_NAME, CLOUD_API_KEY, and CLOUD_API_SECRET.

Note: The cloud values must be from Cloudinary, which is where we host our images.

4th - Open up your MySQL server and create a database called BRANCH_WAVE. So just copy paste this code in and execute it

CREATE DATABASE BRANCH_WAVE;

5th - Type the following command "npm run start" to start application

DONE
