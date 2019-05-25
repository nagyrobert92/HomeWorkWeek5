## Setup

1. Create a new local directory for this assignment.
1. `cd` into that directory and create a new git repository.
   **All files for this homework must be tracked in this repository**.
1. Initialize a Node.JS project in the repository directory so you can install and use packages.

## Sections

### 1. Create an Express app with a single end-point.

1. Create a new JS file named `messages-api.js`.
1. Create an Express app in that file.
   The app should listen for requests on port `3000`.
   Make sure you add the required dependency.
1. Add a single endpoint to the app responds to `POST` requests to the `/messages` URI.
1. When a request is sent to the endpoint, it should log the `text` property of the body to the console.
   In order to parse the JSON body of the of th erequest, you will need to add the middleware for it.
   Make sure you add the required dependency.
1. If the body does NOT have a `text` property , send a "Bad Request" HTTP status code to the client.
1. The API should only log the message five times.
   After receiving five messages, sixth request should be sent an "Internal Server Error" as the response.
   Make sure the correct HTTP status code is sent.

### 2. Connect to PostgreSQL with `node-postgres`.

1. Run a local PostgreSql server.
1. Create a new JS file named `sql-statements.js`.
1. Connect to the database using an instance of `Pool` from the `pg` package.
1. The connection string for your local Postgres should point to `localhost` as the default.
   **You must allow the connection string to be configured with an environment variable.**
   If the `process.env.DATABASE_URL` environment variable is set, use that value as the connection string instead of the default `localhost`.
1. In your code, using the `pool`, run the following SQL statement:
   ```sql
   CREATE TABLE IF NOT EXISTS person (id serial, first_name varchar(255), last_name varchar(255), eye_color varchar(255))
   ```
1. Then, after the query completes, insert several rows into the `person` table to represent the following people:

   - James Smith (brown eyes)
   - Frank Jones (brown eyes)
   - Rebecca Andrews (blue eyes)

   Make sure to use a parameterized query.

1. Next, after the previous query completes, run an `UPDATE` statement that will change every row with the `eye_color` value of `brown` to `blue`.
1. Next, after the previous query (or queries) complete, find all the rows with a `name` value of "James."
   **You must use parameterized queries.**
   You can use the following statement to get started, but you will need to fix it first.
   Change it so that it uses parameterized queries instead of string concatenation.
   ```javascript
   const name = "James";
   pool.query('SELECT * FROM "person" WHERE first_name = ' + name);
   ```
1. Next, log the results of the previous query to the console.
1. If at any point one of the chained promises rejects, you should catch the error and log it to the console.

## 3. Use Sequelize to build a REST API.

1. Create a new JavaScript file named `sequelize-rest.js`.
1. Install the dependency `sequelize@5.8.6`
1. In the JavaScript file, initialize the database connection with Sequelize.
1. Using Sequelize, define a model called `Movie` with the following properties (in addition to an ID):
   - `title` (text)
   - `yearOfRelease` (number)
   - `synopsis` (text)
1. Create an express app with routes that support the following RESTful actions on the "movies" resources.
   - _create_ a new movie resource
   - _read_ all movies (the entire collections resource)
   - _read_ a single movie resource
   - _update_ a single movie resource
   - _delete_ a single movie resource

You don't need any special logic.
A standard REST implementation is good.

1. Implement pagination on the "read all" collections resource end-point.
   The user must be able to pass `limit` and `offset` as **query parameters** to correctly control what results they receive.
   Limit and offset must be passed as query parameters, not in the request body or as route parameters.
