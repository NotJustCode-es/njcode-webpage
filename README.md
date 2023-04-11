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
HOSTNAME=

# Contentful configuration
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_ENVIRONMENT=

# Mail configuration
MAIL_HOST=
MAIL_USER=
MAIL_PASSWORD=
MAIL_FROM=
MAIL_TO=
MAIL_SUBJECT=

# Recaptcha
GOOGLE_RECAPTCHA_SECRET_KEY=

# Client configuration
ASSETS_URL=
GOOGLE_RECAPTCHA_SITE_KEY=
GOOGLE_ANALYTICS_ID=
```

Alternatively, you can copy the ```.env``` file to ```.env.dev``` and fill in the necessary values.

The following table displays a list of environment variables used inside the application along with their corresponding default values:

|Variable Name                   |Description                                                                             |Default Value|
|--------------------------------|----------------------------------------------------------------------------------------|-------------|
|PORT                            |The port number on which the server will listen for incoming requests.                                |4000         |
|PREFIX                          |The prefix that should be used for all the API routes.                                  |/api         |
|HOSTNAME                          |Protocol plus origin of the site.                                    |Empty         |
|CONTENTFUL_SPACE_ID             |The unique identifier of the space in Contentful that contains the content to be served.                    |Empty        |
|CONTENTFUL_ACCESS_TOKEN         |The access token used to authenticate with Contentful API.                              |Empty        |
|CONTENTFUL_ENVIRONMENT          |The environment within the Contentful space to be used.                                 |Empty        |
|MAIL_HOST                       |The hostname of the mail server to be used to send emails.                              |Empty        |
|MAIL_USER                       |The username to authenticate with the mail server.                                      |Empty        |
|MAIL_PASSWORD                   |The password to authenticate with the mail server.                                      |Empty        |
|MAIL_FROM                       |The email address from which the emails will be sent.                                   |Empty        |
|MAIL_TO                         |The email address to which the emails will be sent.                                     |Empty        |
|MAIL_SUBJECT                    |The subject line for the emails that will be sent.                                      |Empty        |
|ASSETS_URL                       |The URL prefix to use when constructing URLs for static assets.                         |Empty        |
|GOOGLE_RECAPTCHA_SECRET_KEY     |The secret key used to authenticate with the Google reCAPTCHA API.                      |Empty        |
|GOOGLE_RECAPTCHA_SITE_KEY       |The site key used to authenticate with the Google reCAPTCHA API.                        |Empty        |
|GOOGLE_ANALYTICS_ID             |The ID used to track the website with Google Analytics.                                 |Empty        |


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
