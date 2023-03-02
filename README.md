# NJCode Webpage

<img src="./docs/njcode-logo.png" style="margin-bottom: 1rem">

This project contains a webpage built using [Angular Universal](https://angular.io/guide/universal), a technology that allows for server-side rendering (SSR) of Angular applications. This ensures that the webpage can be easily indexed by search engines and provides a seamless experience for users, as the initial load of the webpage is faster.

The server-side of this project is built using [NestJS](https://nestjs.com), a framework for building efficient, scalable server-side applications.

The webpage also utilizes the [Contentful Delivery API](https://www.contentful.com/developers/docs/references/content-delivery-api/), a content management platform that allows for easy creation and management of content. This allows for more dynamic and flexible content on the webpage.

## Get started

To get started with this project, you will need to have the following tools installed on your machine:

- Node.js >= 16.16.0 (we recommend using NVM to manage your Node.js versions)
- Angular CLI v14

Once you have these tools installed, you can clone this repository and install the necessary dependencies by running the following commands in the root directory of the project:

```
npm install
```

Before you can run the project, you will need to set up an account with Contentful and obtain an API key. You can then create a .env file in the root directory of the project based on the following template:

```
# Server configuration
PORT=
PREFIX=

# Contentful configuration
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_ENVIRONMENT=

# mail
MAIL_HOST=
MAIL_USER=
MAIL_PASSWORD=
MAIL_FROM=
MAIL_TO=
MAIL_SUBJECT=

# Recaptcha
GOOGLE_RECAPTCHA_SECRET_KEY=
```

Alternatively, you can copy the ```.env``` file to ```.env.dev``` and fill in the necessary values.

With the dependencies installed and the API key set up, you can start the development server by running the following command:

```
npm run dev:ssr
```

This will compile and serve the webpage, which can be accessed at http://localhost:4200/. The development server will also automatically reload the webpage whenever you make changes to the code.

To build a production version of the webpage, you can run the following command:

```
npm run build:ssr
```

This will create a production-ready version of the webpage and server in the dist directory, which can be deployed to a server.
