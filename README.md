# Overview

An uptime monitoring RESTful API server that allows authenticated users to monitor URLs, and get detailed uptime reports about their availability, average response time, and total uptime/downtime.

## Objects description
- A `URL Check` is basically an Object consisting of `{Endpoint, Expected response, Expected status, Check interval}`.
  -  For example, if we have `{endpoint: 'www.api.com/posts', status: 200. interval: '10m'}`: That means that every 10 mins our app will send a request to the endpoint and we will create a `Report` and save it.
 
- A `Report` will have data about how the `URL Check` turned out. It includes whether it succeeded or failed, and the total uptime/downtime based on previous reports.

## Features
- Signup with email verification.
- CRUD operations for URL checks (`GET`, `PUT` and `DELETE` can be called only by the user user who created the check).
- Authenticated users can receive a notification whenever one of their URLs goes down or up again:
  - Email.
  - Webhook *(Maybe in future)*.
- Authenticated users can get detailed uptime reports about their URLs availability, average response time, and total uptime/downtime.
- Authenticated users can group their checks by tags and get reports by tag.

## Implementation details
- For `POST /check`: I made a CRON job with the given interval.
- On server starting: I run a function to start CRON jobs for the existing Checks in my MongoDB.
- For Authentication, I used JWT Authentication for simplicity and faster development.
- For sending Emails, I used Nodemailer.


## How to run:
1. Create .env file, and setup the env variables. (Use .env.sample for reference)

1. To run using Docker:
  1. Run `docker-compose up`

1. To run locally:
  1. Run `npm install` to install dependancies
  1. Run `npm run dev` to run application
  1. Run `npm test` to run tests

## Documentation
- GET `http://localhost:3000/docs` or Open `documentation.html`
